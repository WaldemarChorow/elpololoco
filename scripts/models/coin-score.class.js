class CoinScore extends DrawableObjects {
    x = 300;
    y = 10;
    width = 50;
    height = 60;
    count = 0;

    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/3_icons/icon_coin.png');
    }

    draw(ctx) {
        if (!this.img || !this.img.complete) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '56px Elliott, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`${this.count}`, this.x + this.width + 1, this.y + 50);
    }
}