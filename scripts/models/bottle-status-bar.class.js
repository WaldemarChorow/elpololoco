/**
 * Represents the bottle count display in the HUD.
 * @class
 * @extends DrawableObjects
 */
class BottleStatusBar extends DrawableObjects {
    /** @type {number} */
    x = 5;
    /** @type {number} */
    y = 120;
    /** @type {number} */
    width = 50;
    /** @type {number} */
    height = 60;
    /** @type {number} */
    count = 0;

    /**
     * Creates a new BottleStatusBar instance and loads the bottle icon image.
     */
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/3_icons/icon_salsa_bottle.png');
    }

    /**
     * Draws the bottle icon and current bottle count onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '56px Elliott, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`${this.count}/5`, this.x + this.width + 1, this.y + 45);
    }
}
