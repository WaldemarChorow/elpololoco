let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    MobileControls.init();
    document.getElementById('about-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
    document.getElementById('info-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) ActionIcons.toggleInfo();
    });
    if (localStorage.getItem('muted') === 'true') {
        ActionIcons.muted = true;
        document.getElementById('start-icon-sound').src = 'assets/img/10_icons/soundOffIcon.png';
    }
}

function startGame() {
    if (typeof StartScreen !== 'undefined') StartScreen.stopMusic();
    world = new World(canvas, keyboard, level1);
    startAudioOnInteraction();
}

function restartGame() {
    AudioManager.mute();
    AudioManager.musicStarted = false;
    level1 = createLevel1();
    keyboard = new Keyboard();
    document.getElementById('game-over-screen').classList.remove('visible');
    document.getElementById('you-win-screen').classList.remove('visible');
    document.getElementById('game-toolbar').style.display = 'flex';
    world = new World(canvas, keyboard, level1);
    if (ActionIcons.muted) {
        AudioManager.mute();
    } else {
        startAudioOnInteraction();
    }
}

function startAudioOnInteraction() {
    if (AudioManager.musicStarted) return;
    sessionStorage.setItem('audioUnlocked', '1');
    new Audio('assets/sounds/game/gameStart.mp3').play().catch(() => {});
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
