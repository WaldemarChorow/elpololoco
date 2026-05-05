/**
 * Represents a parallax foreground or midground layer tile in the game world.
 * @class
 * @extends MovableObject
 */
class Layer extends MovableObject {
    /** @type {number} */
    width = 720;
    /** @type {number} */
    height = 480;
    /** @type {number} */
    x = 0;
    /** @type {number} */
    y = 0;

    /**
     * Creates a new Layer instance at the given x position.
     * @param {string} imagePath - The path to the layer image.
     * @param {number} x - The horizontal position of the layer tile.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
