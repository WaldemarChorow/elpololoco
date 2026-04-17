class World{
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        requestAnimationFrame(() => this.draw());
        this.ctx.drawImage(this.enemies[0].img, this.enemies[0].x=260, this.enemies[0].y, this.enemies[0].width, this.enemies[0].height);
        this.ctx.drawImage(this.enemies[1].img, this.enemies[1].x=360, this.enemies[1].y, this.enemies[1].width, this.enemies[1].height);
        this.ctx.drawImage(this.enemies[2].img, this.enemies[2].x=460, this.enemies[2].y, this.enemies[2].width, this.enemies[2].height);
    }
}