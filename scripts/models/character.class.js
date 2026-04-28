class Character extends MovableObject {
    width = 160;
    height = 350;
    y = 80;
    speed = 2.5;

    offset = {
        top: 150,
        left: 50,
        right: 50,
        bottom: 30
    };

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ]; 

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

    IMAGES_HURTS = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

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

    WALK_SPEED   = 130;
    HURT_SPEED   = 200;
    DEAD_SPEED   = 150;
    IDLE_SPEED   = 400;

    world;
    lastMove = new Date().getTime();
    jumpFrame = 0;
    jumpAnimationDone = false;
    wasAboveGround = false;
    hurtFrame = 0;
    hurtAnimationDone = false;
    wasHurt = false;
    deadFrame = 0;
    deadAnimationDone = false;

    constructor() {
            super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
            this.soundRun    = AudioManager.create('assets/sounds/character/characterRun.mp3',    0.1);
            this.soundJump   = AudioManager.create('assets/sounds/character/characterJump.wav',   0.4);
            this.soundDamage = AudioManager.create('assets/sounds/character/characterDamage.mp3', 0.5);
            this.soundDead   = AudioManager.create('assets/sounds/character/characterDead.wav',   0.5);
            this.soundSnoring= AudioManager.create('assets/sounds/character/characterSnoring.mp3',0.3);
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_JUMPING);
            this.loadImages(this.IMAGES_HURTS);
            this.loadImages(this.IMAGES_DEAD);
            this.loadImages(this.IMAGES_IDLE_SHORT);
            this.loadImages(this.IMAGE_IDLE_LONG);
            this.applyGravity();
            this.animate();
    }
    
    animate() {
        this.leftBoundary = 100;
        this.rightBoundary = 100;

        setInterval(() => {
            if (this.isDead()) {
                this.soundRun.pause();
                this.updateCamera();
                return;
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastMove = new Date().getTime();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.lastMove = new Date().getTime();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumpFrame = 0;
                this.jumpAnimationDone = false;
                this.soundJump.play();
                this.lastMove = new Date().getTime();
            } else if (!this.world.keyboard.SPACE && this.isAboveGround() && this.speedY > 5) {
                this.speedY = 5;
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.soundRun.play();
            } else {
                this.soundRun.pause();
            }
            this.updateCamera();
        }, 1000 / 60);

        setInterval(() => {
            const aboveGround = this.isAboveGround();

            if (this.isDead()) {
                // dead animation runs in its own interval
            } else if (this.isHurt()) {
                // hurt animation runs in its own interval
            } else if (aboveGround) {
                if (!this.jumpAnimationDone) {
                    let path = this.IMAGES_JUMPING[this.jumpFrame];
                    this.img = this.imageCache[path];
                    if (this.jumpFrame < this.IMAGES_JUMPING.length - 1) {
                        this.jumpFrame++;
                    } else {
                        this.jumpAnimationDone = true;
                    }
                }
            } else {
                if (this.wasAboveGround) {
                    this.img = this.imageCache['assets/img/2_character_pepe/1_idle/idle/I-1.png'];
                    this.jumpFrame = 0;
                    this.jumpAnimationDone = false;
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }

            this.wasAboveGround = aboveGround;
        },this.WALK_SPEED);

        setInterval(() => {
            const hurt = this.isHurt();
            if (!this.isDead() && hurt) {
                if (!this.wasHurt) {
                    this.hurtFrame = 0;
                    this.hurtAnimationDone = false;
                    this.soundDamage.play();
                }
                if (!this.hurtAnimationDone) {
                    let path = this.IMAGES_HURTS[this.hurtFrame];
                    this.img = this.imageCache[path];
                    if (this.hurtFrame < this.IMAGES_HURTS.length - 1) {
                        this.hurtFrame++;
                    } else {
                        this.hurtAnimationDone = true;
                        this.img = this.imageCache['assets/img/2_character_pepe/1_idle/idle/I-1.png'];
                    }
                }
            }
            this.wasHurt = hurt;
        }, this.HURT_SPEED);

        setInterval(() => {
            if (this.isDead()) {
                if (!this.deadAnimationDone) {
                    this.soundDead.play();
                    let path = this.IMAGES_DEAD[this.deadFrame];
                    this.img = this.imageCache[path];
                    if (this.deadFrame < this.IMAGES_DEAD.length - 1) {
                        this.deadFrame++;
                    } else {
                        this.deadAnimationDone = true;
                    }
                }
            } else {
                this.deadFrame = 0;
                this.deadAnimationDone = false;
            }
        }, this.DEAD_SPEED);

        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.isAboveGround() &&
                !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                if (this.isIdleLong()) {
                    this.soundSnoring.play();
                    this.playAnimation(this.IMAGE_IDLE_LONG);
                } else {
                    this.soundSnoring.pause();
                    if (this.isIdle()) this.playAnimation(this.IMAGES_IDLE_SHORT);
                }
            } else {
                this.soundSnoring.pause();
            }
        },this.IDLE_SPEED);
    }

    isIdle() {
        let timepassed = (new Date().getTime() - this.lastMove) / 1000;
        return timepassed >= 3 && timepassed < 6;
    }

    isIdleLong() {
        let timepassed = (new Date().getTime() - this.lastMove) / 1000;
        return timepassed >= 6;
    }

    updateCamera() {
        const screenX = this.x + this.world.camera_x;

        if (screenX > this.rightBoundary) {
            this.world.camera_x = -(this.x - this.rightBoundary);
        } else if (screenX < this.leftBoundary) {
            this.world.camera_x = -(this.x - this.leftBoundary);
        }
    }

    
}