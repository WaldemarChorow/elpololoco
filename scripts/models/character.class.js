/**
 * Represents the player-controlled character Pepe.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} */
    width = 160;
    /** @type {number} */
    height = 350;
    /** @type {number} */
    y = 80;
    /** @type {number} */
    speed = 2.5;

    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = {
        top: 150,
        left: 20,
        right: 20,
        bottom: 30
    };

    /** @type {string[]} */
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} */
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',

    ];

    /** @type {string[]} */
    IMAGES_HURTS = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    /** @type {string[]} */
    IMAGES_IDLE_SHORT = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /** @type {string[]} */
    IMAGE_IDLE_LONG = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /** @type {number} */
    WALK_SPEED   = 130;
    /** @type {number} */
    HURT_SPEED   = 200;
    /** @type {number} */
    DEAD_SPEED   = 150;
    /** @type {number} */
    IDLE_SPEED   = 400;

    /** @type {World} */
    world;
    /** @type {number} */
    lastMove = new Date().getTime();
    /** @type {number} */
    jumpFrame = 0;
    /** @type {boolean} */
    jumpAnimationDone = false;
    /** @type {boolean} */
    wasAboveGround = false;
    /** @type {number} */
    hurtFrame = 0;
    /** @type {boolean} */
    hurtAnimationDone = false;
    /** @type {boolean} */
    wasHurt = false;
    /** @type {number} */
    deadFrame = 0;
    /** @type {boolean} */
    deadAnimationDone = false;

    /**
     * Creates a new Character instance, loads all animation images and sounds, and starts animation loops.
     */
    constructor() {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadAllSounds();
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }

    /**
     * Loads all character-related sound effects.
     */
    loadAllSounds() {
        this.soundRun    = AudioManager.create('assets/sounds/character/characterRun.mp3',    0.2);
        this.soundJump   = AudioManager.create('assets/sounds/character/characterJump.mp3',   0.1);
        this.soundDamage = AudioManager.create('assets/sounds/character/characterDamage.mp3', 0.5);
        this.soundDead   = AudioManager.create('assets/sounds/character/characterDead.wav',   0.5);
        this.soundSnoring= AudioManager.create('assets/sounds/character/characterSnoring.mp3',0.3);
    }

    /**
     * Loads all character animation image sets into the image cache.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTS);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGE_IDLE_LONG);
    }

    /**
     * Starts all animation and movement interval loops for the character.
     */
    animate() {
        this.leftBoundary = 100;
        this.rightBoundary = 100;
        setInterval(() => this.runMovementLoop(), 1000 / 60);
        setInterval(() => this.runWalkAnimLoop(), this.WALK_SPEED);
        setInterval(() => this.runHurtAnimLoop(), this.HURT_SPEED);
        setInterval(() => this.runDeadAnimLoop(), this.DEAD_SPEED);
        setInterval(() => this.runIdleAnimLoop(), this.IDLE_SPEED);
    }

    /**
     * Handles keyboard-driven movement, jumping, and camera update each frame.
     */
    runMovementLoop() {
        if (this.world && this.world.paused) return;
        if (this.isDead()) { this.soundRun.pause(); this.updateCamera(); return; }
        this.handleHorizontalInput();
        this.handleJumpInput();
        this.updateRunSound();
        this.updateCamera();
    }

    /**
     * Reads LEFT/RIGHT keys and moves the character horizontally.
     */
    handleHorizontalInput() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight(); this.otherDirection = false; this.lastMove = new Date().getTime();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft(); this.otherDirection = true; this.lastMove = new Date().getTime();
        }
    }

    /**
     * Plays or pauses the running sound based on movement keys.
     */
    updateRunSound() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.soundRun.play();
        } else {
            this.soundRun.pause();
        }
    }

    /**
     * Handles jump input and variable jump height.
     */
    handleJumpInput() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumpFrame = 0;
            this.jumpAnimationDone = false;
            this.soundJump.currentTime = 0;
            this.soundJump.play();
            this.lastMove = new Date().getTime();
        } else if (!this.world.keyboard.SPACE && this.isAboveGround() && this.speedY > 5) {
            this.speedY = 5;
        }
    }

    /**
     * Plays the correct walk or jump animation frame.
     */
    runWalkAnimLoop() {
        if (this.world && this.world.paused) return;
        const aboveGround = this.isAboveGround();
        if (!this.isDead() && !this.isHurt() && aboveGround) {
            this.playJumpFrame();
        } else if (!this.isDead() && !this.isHurt() && !aboveGround) {
            this.handleGroundedAnim();
        }
        this.wasAboveGround = aboveGround;
    }

    /**
     * Resets the jump frame after landing and plays walking animation if moving.
     */
    handleGroundedAnim() {
        if (this.wasAboveGround) {
            this.jumpFrame = 0;
            this.jumpAnimationDone = false;
        }
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Advances the jump animation by one frame.
     */
    playJumpFrame() {
        if (this.jumpAnimationDone) return;
        this.img = this.imageCache[this.IMAGES_JUMPING[this.jumpFrame]];
        if (this.jumpFrame < this.IMAGES_JUMPING.length - 1) {
            this.jumpFrame++;
        } else {
            this.jumpAnimationDone = true;
        }
    }

    /**
     * Plays the hurt animation and sound when the character takes damage.
     */
    runHurtAnimLoop() {
        if (this.world && this.world.paused) return;
        const hurt = this.isHurt();
        if (!this.isDead() && hurt) this.advanceHurtAnimation();
        this.wasHurt = hurt;
    }

    /**
     * Advances the hurt animation frame and triggers the damage sound on entry.
     */
    advanceHurtAnimation() {
        if (!this.wasHurt) { this.hurtFrame = 0; this.hurtAnimationDone = false; this.soundDamage.play(); }
        if (this.hurtAnimationDone) return;
        this.img = this.imageCache[this.IMAGES_HURTS[this.hurtFrame]];
        if (this.hurtFrame < this.IMAGES_HURTS.length - 1) {
            this.hurtFrame++;
        } else {
            this.hurtAnimationDone = true;
            this.img = this.imageCache['assets/img/2_character_pepe/1_idle/idle/I-1.png'];
        }
    }

    /**
     * Plays the death animation and sound once when the character dies.
     */
    runDeadAnimLoop() {
        if (this.world && this.world.paused) return;
        if (this.isDead()) {
            this.advanceDeadAnimation();
        } else {
            this.deadFrame = 0;
            this.deadAnimationDone = false;
        }
    }

    /**
     * Advances the dead animation frame by frame and plays the death sound.
     */
    advanceDeadAnimation() {
        if (this.deadAnimationDone) return;
        this.soundDead.play();
        this.img = this.imageCache[this.IMAGES_DEAD[this.deadFrame]];
        if (this.deadFrame < this.IMAGES_DEAD.length - 1) {
            this.deadFrame++;
        } else {
            this.deadAnimationDone = true;
        }
    }

    /**
     * Plays idle or sleep animation when the character is stationary.
     */
    runIdleAnimLoop() {
        if (this.world && this.world.paused) return;
        const isStanding = !this.isDead() && !this.isHurt() && !this.isAboveGround()
            && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
        if (isStanding) {
            this.playIdleAnimation();
        } else {
            this.soundSnoring.pause();
        }
    }

    /**
     * Picks the short or long idle animation based on idle duration.
     */
    playIdleAnimation() {
        if (this.isIdleLong()) {
            this.soundSnoring.play().catch(() => {});
            this.playAnimation(this.IMAGE_IDLE_LONG);
        } else {
            this.soundSnoring.pause();
            this.playAnimation(this.IMAGES_IDLE_SHORT);
        }
    }

    /**
     * Checks whether the character has been idle for a short period (10–20 seconds).
     * @returns {boolean} - True if the character is in short idle state.
     */
    isIdle() {
        let timepassed = (new Date().getTime() - this.lastMove) / 1000;
        return timepassed >= 10 && timepassed < 20;
    }

    /**
     * Checks whether the character has been idle for a long period (20+ seconds).
     * @returns {boolean} - True if the character is in long idle state.
     */
    isIdleLong() {
        let timepassed = (new Date().getTime() - this.lastMove) / 1000;
        return timepassed >= 20;
    }

    /**
     * Updates the world camera position to keep the character within the visible boundaries.
     */
    updateCamera() {
        const screenX = this.x + this.world.camera_x;

        if (screenX > this.rightBoundary) {
            this.world.camera_x = -(this.x - this.rightBoundary);
        } else if (screenX < this.leftBoundary) {
            this.world.camera_x = -(this.x - this.leftBoundary);
        }
    }


}
