let canvas;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    character.src = '../assets/img/2_character_pepe/2_walk/W-21.png';

    setTimeout(() => {
    ctx.drawImage(character, 20, 160, 150, 260);

    }, 1000);
}

