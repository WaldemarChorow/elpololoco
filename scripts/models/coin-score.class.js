/**
 * Represents the coin counter display in the HUD.
 * @class
 * @extends DrawableObjects
 */
class CoinScore extends DrawableObjects {
    /** @type {number} */
    x = 300;
    /** @type {number} */
    y = 10;
    /** @type {number} */
    width = 60;
    /** @type {number} */
    height = 60;
    /** @type {number} */
    count = 0;

    /**
     * Creates a new CoinScore instance and loads the coin icon image.
     */
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/3_icons/icon_coin.png');
    }

    /**
     * Draws the coin icon and the current coin count onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (!this.img || !this.img.complete) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '56px Elliott, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`${this.count}`, this.x + this.width + 1, this.y + 50);
    }
}
