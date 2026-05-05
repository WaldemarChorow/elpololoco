/**
 * Represents a collectible coin in the game world.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /** @type {number} */
    width = 120;
    /** @type {number} */
    height = 120;

    /** @type {string[]} */
    images =[
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]

    /** @type {boolean} */
    collected = false;

    /** @type {number} */
    ANIMATION_INTERVAL = 400;

    /**
     * Creates a new Coin instance at the specified position.
     * @param {number} x - The horizontal position of the coin.
     * @param {number} y - The vertical position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.images);
        this.img = this.imageCache[this.images[0]];
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts the animation loop that cycles through coin frames while not collected.
     */
    animate() {
        setInterval(() => {
            if (!this.collected) this.playAnimation(this.images);
        }, this.ANIMATION_INTERVAL);
    }
}
