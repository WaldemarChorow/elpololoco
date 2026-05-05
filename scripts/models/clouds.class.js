/**
 * Represents a scrolling cloud in the game background.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} */
    y = 1;
    /** @type {number} */
    width = 740;
    /** @type {number} */
    height = 400;

    /**
     * Creates a new Cloud instance at the given x position with a randomized y offset and speed.
     * @param {string} imagePath - The path to the cloud image.
     * @param {number} x - The initial horizontal position of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 1 + Math.random() * 20;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * Starts the animation loop that moves the cloud continuously to the left and wraps it around.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < -719) {
                this.x = 1 * 719;
            }
        }, 1000 / 60);
    }
}
