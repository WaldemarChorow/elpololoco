class BottleStatusBar extends DrawableObjects {
    x = 5;
    y = 70;
    width = 50;
    height = 60;
    count = 0;

    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/3_icons/icon_salsa_bottle.png');
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '56px Elliott, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`${this.count}/5`, this.x + this.width + 1, this.y + 45);
    }
}
