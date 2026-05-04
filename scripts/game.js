let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    // Spiel startet erst nach Klick auf Play im Startbildschirm
}

function startGame() {
    world = new World(canvas, keyboard, level1);
    startAudioOnInteraction();
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
