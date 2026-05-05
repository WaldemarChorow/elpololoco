/**
 * Represents a collectible salsa bottle on the ground.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /** @type {number} */
    width = 80;
    /** @type {number} */
    height = 80;

    /** @type {string[]} */
    images = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /** @type {boolean} */
    collected = false;

    /**
     * Creates a new Bottle instance.
     * @param {number} x - The x-position of the bottle.
     * @param {number} y - The y-position of the bottle.
     * @param {number} index - The image index used to alternate bottle sprites.
     */
    constructor(x, y, index) {
        super();
        this.loadImages(this.images);
        this.img = this.imageCache[this.images[index % 2]];
        this.x = x;
        this.y = y;
    }
}