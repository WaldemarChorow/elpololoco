/**
 * Represents a throwable salsa bottle that the character can throw at enemies.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /** @type {number} */
    width = 70;
    /** @type {number} */
    height = 70;
    /** @type {number} */
    speedY = 5;
    /** @type {number} */
    gravity = 0.5;
    /** @type {string} */
    state = 'flying'; // 'flying' | 'on_ground'

    /** @type {number} */
    GROUND_Y = 350; // matches Chicken y

    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** @type {string[]} */
    IMAGES_ROTATING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /** @type {string[]} */
    IMAGES_BOTTLE_ON_GROUND = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /** @type {string[]} */
    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates a new ThrowableObject instance, loads all images, and initiates the throw and animation.
     * @param {number} x - The starting horizontal position of the bottle.
     * @param {number} y - The starting vertical position of the bottle.
     * @param {boolean} otherDirection - True if the bottle should be thrown to the left.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
        this.animate();
    }

    /**
     * Initiates the bottle throw by applying gravity and starting horizontal movement.
     */
    throw() {
        this.speedY = 5;
        this.applyGravity();
        const direction = this.otherDirection ? -40 : 40;
        this.moveInterval = setInterval(() => {
            this.x += direction;
        }, 1000 / 20);
    }

    /**
     * Starts the animation loop that handles the flying rotation and splash animation states.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            if (this.state === 'flying') {
                if (this.y >= this.GROUND_Y) {
                    this.splash();
                } else {
                    this.playAnimation(this.IMAGES_ROTATING);
                }
            } else if (this.state === 'splashing') {
                if (this.currentImage >= this.splashStartFrame + this.IMAGES_SPLASH.length) {
                    this.state = 'done';
                    clearInterval(this.animateInterval);
                } else {
                    this.playAnimation(this.IMAGES_SPLASH);
                }
            }
        }, 1000 / 12);
    }

    /**
     * Triggers the splash effect: plays the break sound, stops movement, and transitions to the splash animation.
     */
    splash() {
        AudioManager.create('assets/sounds/throwable/bottleBreak.mp3').play();
        this.state = 'splashing';
        this.splashStartFrame = this.currentImage;
        clearInterval(this.moveInterval);
        this.speedY = 0;
    }
}
