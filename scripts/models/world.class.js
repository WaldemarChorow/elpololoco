class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.enemies = level.enemies;
        this.clouds = level.clouds;
        this.layers = level.layers;
        this.background = level.background;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObejectsToMap(this.level.background);
        this.addObejectsToMap(this.level.layers);
        this.addObejectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObejectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);    

        requestAnimationFrame(() => this.draw());
    }

    addObejectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }
}