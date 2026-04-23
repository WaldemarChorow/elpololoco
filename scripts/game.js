let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);    
}

window.addEventListener('keydown', (e) => {
    keyboard.KEYDOWN(e);
});

window.addEventListener('keyup', (e) => {
    keyboard.KEYUP(e);
});
