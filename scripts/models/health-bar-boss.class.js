/**
 * Represents the boss health bar displayed in the HUD.
 * @class
 * @extends DrawableObjects
 */
class BossHealthBar extends DrawableObjects {
    /** @type {number} */
    width = 200;
    /** @type {number} */
    height = 60;
    /** @type {number} */
    x = 500;
    /** @type {number} */
    y = 55;
    /** @type {boolean} */
    visible = false;
    /** @type {boolean} */
    otherDirection = true;

    /** @type {string[]} */
    IMAGES_HEALTH = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /**
     * Creates a new BossHealthBar instance and loads all health bar images.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_HEALTH[5]);
        this.loadImages(this.IMAGES_HEALTH);
    }

    /**
     * Updates the displayed health bar image based on the given health value.
     * @param {number} health - The current health value of the boss (0–100).
     */
    setHealth(health) {
        let path = this.IMAGES_HEALTH[this.resolveImageIndex(health)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index that corresponds to the given health percentage.
     * @param {number} health - The current health value (0–100).
     * @returns {number} - The index into IMAGES_HEALTH for the appropriate image.
     */
    resolveImageIndex(health) {
        if (health >= 100) {
            return 5;
        } else if (health >= 80) {
            return 4;
        } else if (health >= 60) {
            return 3;
        } else if (health >= 40) {
            return 2;
        } else if (health >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
