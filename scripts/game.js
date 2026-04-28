let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    new Audio('assets/sounds/game/gameStart.mp3').play();
    AudioManager.initMusic();
}

window.addEventListener('keydown', (e) => {
    keyboard.KEYDOWN(e);
    AudioManager.initMusic();
});

window.addEventListener('click', () => {
    AudioManager.initMusic();
});

window.addEventListener('keyup', (e) => {
    keyboard.KEYUP(e);
});
