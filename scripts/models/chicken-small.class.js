/**
 * Represents a small chicken enemy in the game.
 * @class
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
    /** @type {number} */
    width = 80;
    /** @type {number} */
    height = 80;
    /** @type {number} */
    y = 350;
    /** @type {number} */
    energy = 5;

    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = {
        top: 10,
        left: 25,
        right: 25,
        bottom: 5
    };

    /** @type {string[]} */
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /** @type {boolean} */
    active = false;

    /**
     * Creates a new ChickenSmall instance at the given x position.
     * @param {number} x - The horizontal spawn position of the small chicken.
     */
    constructor(x) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.80 + Math.random() * 0.90;
        this.animate();
    }

    /**
     * Starts the movement and animation interval loops for the small chicken.
     */
    animate() {
        setInterval(() => {
            if (window.gamePaused || !this.active) return;
            if (!this.isDead()) this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            if (window.gamePaused || !this.active) return;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    }

    /**
     * Plays the death sound, sets energy to zero, and schedules removal of the chicken.
     */
    die() {
        AudioManager.create('assets/sounds/chicken/chickenDead2.mp3', 0.8).play();
        this.energy = 0;
        setTimeout(() => this.remove = true, 1000);
    }

}
