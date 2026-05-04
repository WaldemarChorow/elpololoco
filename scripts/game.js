let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    if (sessionStorage.getItem('audioUnlocked')) {
        AudioManager.initMusic();
    }
}

function startAudioOnInteraction() {
    if (AudioManager.musicStarted) return;
    sessionStorage.setItem('audioUnlocked', '1');
    new Audio('assets/sounds/game/gameStart.mp3').play().catch(() => {});
    AudioManager.initMusic();
}

window.addEventListener('keydown', (e) => {
    keyboard.KEYDOWN(e);
    startAudioOnInteraction();
});

window.addEventListener('click', () => {
    startAudioOnInteraction();
});

window.addEventListener('keyup', (e) => {
    keyboard.KEYUP(e);
});
