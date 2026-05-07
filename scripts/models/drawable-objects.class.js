/**
 * Base class for all objects that can be drawn on the canvas.
 * @class
 */
class DrawableObjects {
    /** @type {HTMLImageElement} */
    img;
    /** @type {Object.<string, HTMLImageElement>} */
    imageCache = {};
    /** @type {number} */
    currentImage = 0;
    /** @type {number} */
    x = 10;
    /** @type {number} */
    y = 90;
    /** @type {number} */
    height = 180;
    /** @type {number} */
    width = 80;

    /**
     * Loads a single image from the given path and assigns it to this.img.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images into the image cache.
     * @param {string[]} arr - An array of image file paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of this object onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}
