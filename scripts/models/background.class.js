/**
 * Represents a background tile in the game world.
 * @class
 * @extends MovableObject
 */
class Background extends MovableObject {
    /** @type {number} */
    width = 720;
    /** @type {number} */
    height = 480;
    /** @type {number} */
    x = 0;
    /** @type {number} */
    y = 0;

    /**
     * Creates a new Background instance.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The horizontal position of the background tile.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
