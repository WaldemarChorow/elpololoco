let canvas;
let world;
let keyboard = new Keyboard();
let gameIntervals = [];

const _origSetInterval = window.setInterval;
window.setInterval = function(fn, delay, ...args) {
    const id = _origSetInterval(fn, delay, ...args);
    gameIntervals.push(id);
    return id;
};

function clearAllIntervals() {
    gameIntervals.forEach(id => clearInterval(id));
    gameIntervals = [];
}

function init() {
    canvas = document.getElementById('canvas');
    MobileControls.init();
    document.getElementById('about-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
    document.getElementById('game-info-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) ActionIcons.toggleInfo();
    });
}

function startGame() {
    if (typeof StartScreen !== 'undefined') StartScreen.stopMusic();
    world = new World(canvas, keyboard, level1);
    startAudioOnInteraction();
}

function goHome() {
    clearAllIntervals();
    AudioManager.bgMusic.pause();
    AudioManager.bgMusic.currentTime = 0;
    AudioManager.bossMusic.pause();
    AudioManager.bossMusic.currentTime = 0;
    AudioManager.bossApproach.pause();
    AudioManager.bossApproach.currentTime = 0;
    AudioManager.musicStarted = false;
    AudioManager.sounds = [];
    window.gamePaused = false;
    if (world) world.stopped = true;
    world = null;
    level1 = createLevel1();
    keyboard = new Keyboard();
    document.getElementById('game-over-screen').classList.remove('visible');
    document.getElementById('you-win-screen').classList.remove('visible');
    document.getElementById('game-info-overlay').style.display = 'none';
    document.getElementById('game-toolbar').style.display = 'none';
    document.getElementById('icon-pause').src = 'assets/img/10_icons/pauseIcon.png';
    document.getElementById('start-screen').style.display = '';
    StartScreen.infoVisible = false;
    StartScreen.musicStarted = false;
    ActionIcons.muted = false;
    document.getElementById('start-icon-sound').src = 'assets/img/10_icons/soundOnIcon.png';
}

function restartGame() {
    clearAllIntervals();
    AudioManager.bgMusic.pause();
    AudioManager.bgMusic.currentTime = 0;
    AudioManager.bossMusic.pause();
    AudioManager.bossMusic.currentTime = 0;
    AudioManager.bossApproach.pause();
    AudioManager.bossApproach.currentTime = 0;
    AudioManager.musicStarted = false;
    AudioManager.sounds = [];
    window.gamePaused = false;
    if (world) world.stopped = true;
    level1 = createLevel1();
    keyboard = new Keyboard();
    document.getElementById('game-over-screen').classList.remove('visible');
    document.getElementById('you-win-screen').classList.remove('visible');
    document.getElementById('game-info-overlay').style.display = 'none';
    document.getElementById('game-toolbar').style.display = 'flex';
    document.getElementById('icon-pause').src = 'assets/img/10_icons/pauseIcon.png';
    world = new World(canvas, keyboard, level1);
    const soundIcon = document.getElementById('icon-sound');
    if (ActionIcons.muted) {
        soundIcon.src = 'assets/img/10_icons/soundOffIcon.png';
        AudioManager.mute();
    } else {
        soundIcon.src = 'assets/img/10_icons/soundOnIcon.png';
        startAudioOnInteraction();
    }
}

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
    keyboard.KEYDOWN(e);
    startAudioOnInteraction();
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
