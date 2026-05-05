/**
 * Base class for all objects in the game that can move, animate, and take damage.
 * @class
 * @extends DrawableObjects
 */
class MovableObject extends DrawableObjects {
    /** @type {number} */
    speed = 0.15;
    /** @type {boolean} */
    otherDirection = false;
    /** @type {number} */
    speedY = 0;
    /** @type {number} */
    acceleration = 3;
    /** @type {number} */
    energy = 100;
    /** @type {number} */
    lastHit = 0;

    /**
     * Starts a gravity loop that continuously applies vertical acceleration to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is currently above the ground level.
     * @returns {boolean} - True if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
        return this.y < 80;
        }
    }

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
     * Checks whether this object is colliding with another movable object.
     * @param {MovableObject} mo - The other object to check collision against.
     * @returns {boolean} - True if the two objects' collision boxes overlap.
     */
    isColliding(mo) {
        const a = this.collisionBox();
        const b = mo.collisionBox();
        return (
            a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height
        );
    }

    /**
     * Calculates and returns the collision box of the object, accounting for offsets.
     * @returns {{x: number, y: number, width: number, height: number}} - The collision box dimensions and position.
     */
    collisionBox() {
        const o = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
        return {
            x: this.x + o.left,
            y: this.y + o.top,
            width: this.width - o.left - o.right,
            height: this.height - o.top - o.bottom,
        };
    }

    /**
     * Moves the object to the right by its speed value.
     */
    moveRight() {
            this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed value.
     */
    moveLeft() {
            this.x -= this.speed;
    }

    /**
     * Advances the animation to the next frame in the provided image array.
     * @param {string[]} images - The array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by setting a positive vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /** @type {number} */
    HIT_COOLDOWN = 0.2;

    /**
     * Reduces the object's energy by the given damage amount if not currently in the hit cooldown period.
     * @param {number} damage - The amount of energy to subtract.
     */
    hit(damage = 10) {
        if (this.isHurt()) return;
        this.energy = Math.max(0, this.energy - damage);
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks whether the object is currently in the hurt (invincibility) state after being hit.
     * @returns {boolean} - True if the object was hit within the cooldown period.
     */
    isHurt() {
        const timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < this.HIT_COOLDOWN;
    }

    /**
     * Checks whether the object is dead (energy has reached zero).
     * @returns {boolean} - True if the object's energy is zero.
     */
    isDead() {
        return this.energy === 0;
    }


}
