let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    new Audio('assets/sounds/game/gameStart.mp3').play();
}

window.addEventListener('keydown', (e) => {
    keyboard.KEYDOWN(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.KEYUP(e);
});
