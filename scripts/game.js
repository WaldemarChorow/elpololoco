/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World|null} */
let world;
/** @type {Keyboard} */
let keyboard = new Keyboard();
/** @type {number[]} */
let gameIntervals = [];

const _origSetInterval = window.setInterval;
window.setInterval = function(fn, delay, ...args) {
    const id = _origSetInterval(fn, delay, ...args);
    gameIntervals.push(id);
    return id;
};

/**
 * Clears every tracked interval and resets the interval ID list.
 */
function clearAllIntervals() {
    gameIntervals.forEach(id => clearInterval(id));
    gameIntervals = [];
}

/**
 * Initializes the canvas, mobile controls, modal handlers and audio preferences on page load.
 */
function init() {
    canvas = document.getElementById('canvas');
    MobileControls.init();
    document.getElementById('about-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
    document.getElementById('game-info-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) ActionIcons.toggleInfo();
    });
    loadAudioPreferences();
}

/**
 * Loads the persisted mute and volume preferences from localStorage and applies them to the UI.
 */
function loadAudioPreferences() {
    const muted = localStorage.getItem('muted') === 'true';
    const musicVol = parseFloat(localStorage.getItem('musicVolume') ?? '0.4');
    const sfxVol = parseFloat(localStorage.getItem('sfxVolume') ?? '0.3');
    applyAudioPreferences(muted, musicVol, sfxVol);
    syncSliderUI(muted, musicVol, sfxVol);
    if (muted) applyMutedIcons();
}

/**
 * Applies stored mute/volume values to the AudioManager and ActionIcons state.
 * @param {boolean} muted - Whether audio should be muted.
 * @param {number} musicVol - Music volume level (0.0–1.0).
 * @param {number} sfxVol - SFX volume level (0.0–1.0).
 */
function applyAudioPreferences(muted, musicVol, sfxVol) {
    ActionIcons.savedMusicValue = musicVol;
    ActionIcons.savedSfxValue = sfxVol;
    ActionIcons.muted = muted;
    AudioManager.musicVolume = musicVol;
    AudioManager.bossMusicVolume = musicVol;
    AudioManager.volume = sfxVol;
}

/**
 * Synchronises the slider UI elements with current mute/volume state.
 * @param {boolean} muted - Whether audio is muted.
 * @param {number} musicVol - Music volume level (0.0–1.0).
 * @param {number} sfxVol - SFX volume level (0.0–1.0).
 */
function syncSliderUI(muted, musicVol, sfxVol) {
    const musicSlider = document.getElementById('music-slider');
    const sfxSlider = document.getElementById('sfx-slider');
    if (musicSlider) musicSlider.value = muted ? 0 : musicVol;
    if (sfxSlider) sfxSlider.value = muted ? 0 : sfxVol;
}

/**
 * Switches both sound icons to the muted variant.
 */
function applyMutedIcons() {
    const off = 'assets/img/10_icons/soundOffIcon.png';
    document.getElementById('start-icon-sound').src = off;
    const gameSoundIcon = document.getElementById('icon-sound');
    if (gameSoundIcon) gameSoundIcon.src = off;
}

/**
 * Starts a fresh game session by creating a new World and starting audio.
 */
function startGame() {
    if (typeof StartScreen !== 'undefined') StartScreen.stopMusic();
    world = new World(canvas, keyboard, level1);
    startAudioOnInteraction();
}

/**
 * Returns to the start screen by stopping the current game and resetting the UI.
 */
function goHome() {
    resetGameState();
    world = null;
    document.getElementById('game-toolbar').style.display = 'none';
    document.getElementById('start-screen').style.display = '';
    document.body.classList.remove('game-fullscreen');
    document.getElementById('mobile-controls').classList.remove('visible');
    document.getElementById('rotate-overlay').classList.remove('visible');
    StartScreen.infoVisible = false;
    StartScreen.musicStarted = false;
    document.getElementById('start-icon-sound').src = ActionIcons.muted
        ? 'assets/img/10_icons/soundOffIcon.png'
        : 'assets/img/10_icons/soundOnIcon.png';
    MobileControls.update();
}

/**
 * Restarts the current game from the beginning without reloading the page.
 */
function restartGame() {
    resetGameState();
    document.getElementById('game-toolbar').style.display = 'flex';
    world = new World(canvas, keyboard, level1);
    applyMuteStateToGame();
}

/**
 * Stops all intervals, resets audio and rebuilds level/keyboard for a fresh game state.
 */
function resetGameState() {
    clearAllIntervals();
    resetAudio();
    window.gamePaused = false;
    if (world) world.stopped = true;
    level1 = createLevel1();
    keyboard = new Keyboard();
    hideEndScreens();
    document.getElementById('icon-pause').src = 'assets/img/10_icons/pauseIcon.png';
}

/**
 * Pauses every audio track, resets playback and clears registered SFX sounds.
 */
function resetAudio() {
    AudioManager.bgMusic.pause();
    AudioManager.bgMusic.currentTime = 0;
    AudioManager.bossMusic.pause();
    AudioManager.bossMusic.currentTime = 0;
    AudioManager.bossApproach.pause();
    AudioManager.bossApproach.currentTime = 0;
    AudioManager.musicStarted = false;
    AudioManager.sounds = [];
}

/**
 * Hides all end-game and overlay screens.
 */
function hideEndScreens() {
    document.getElementById('game-over-screen').classList.remove('visible');
    document.getElementById('you-win-screen').classList.remove('visible');
    document.getElementById('game-info-overlay').style.display = 'none';
}

/**
 * Applies the current mute state and corresponding sound icon after restarting the game.
 */
function applyMuteStateToGame() {
    const soundIcon = document.getElementById('icon-sound');
    if (ActionIcons.muted) {
        soundIcon.src = 'assets/img/10_icons/soundOffIcon.png';
        AudioManager.mute();
    } else {
        soundIcon.src = 'assets/img/10_icons/soundOnIcon.png';
        startAudioOnInteraction();
    }
}

/**
 * Unlocks audio playback after the first user interaction and starts background music.
 */
function startAudioOnInteraction() {
    if (AudioManager.musicStarted) return;
    sessionStorage.setItem('audioUnlocked', '1');
    if (!ActionIcons.muted) {
        new Audio('assets/sounds/game/gameStart.mp3').play().catch(() => {});
    }
    AudioManager.initMusic();
}

window.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Backspace') && document.activeElement?.tagName === 'BUTTON') {
        e.preventDefault();
        document.activeElement.blur();
    }
    if (world) {
        keyboard.KEYDOWN(e);
        startAudioOnInteraction();
    }
});

window.addEventListener('click', () => {
    if (!world) {
        StartScreen.initMusic();
    } else {
        startAudioOnInteraction();
    }
});

window.addEventListener('keyup', (e) => {
    keyboard.KEYUP(e);
});
