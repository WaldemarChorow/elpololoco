/**
 * Represents the end boss enemy of the game.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} */
    width = 250;
    /** @type {number} */
    height = 400;
    /** @type {number} */
    y = 80;
    /** @type {number} */
    speed = 3.5;

    /** @type {string[]} */
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} */
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /** @type {string[]} */
    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} */
    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /** @type {boolean} */
    visible = false;

    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = {
        top: 60,
        left: 50,
        right: 40,
        bottom: 10
    };

    /** @type {number} */
    ALERT_DURATION      = 500;
    /** @type {number} */
    INTRO_HURT_DURATION = 0;
    /** @type {number} */
    HURT_DURATION       = 1000;
    /** @type {number} */
    ALERT_FPS           = 150;
    /** @type {number} */
    WALK_FPS            = 120;
    /** @type {number} */
    JUMP_INTERVAL_P1    = 6000;
    /** @type {number} */
    JUMP_INTERVAL_P2    = 3000;
    /** @type {number} */
    JUMP_SPEED          = 28;
    /** @type {number} */
    KNOCKBACK_DISTANCE  = 150;
    /** @type {number} */
    KNOCKBACK_JUMP_SPEED = 18;
    /** @type {number} */
    KNOCKBACK_DURATION  = 600;
    /** @type {number} */
    KNOCKBACK_COOLDOWN  = 800;
    /** @type {number} */
    PHASE2_THRESHOLD    = 30;
    /** @type {number} */
    SPEED_PHASE1        = 3.5;
    /** @type {number} */
    SPEED_PHASE2        = 7;
    /** @type {number} */
    DASH_INTERVAL       = 8000;
    /** @type {number} */
    DASH_DURATION       = 500;
    /** @type {number} */
    DASH_SPEED          = 14;

    /**
     * Creates a new Endboss instance, loads all animation images, and sets the initial state.
     */
    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 6000;
        this.currentState = 'waiting';
        this.isIntro = false;
    }

    /**
     * Makes the boss visible and starts the intro alert sequence.
     */
    appear() {
        this.visible = true;
        this.isIntro = true;
        this.currentState = 'alert';
        this.currentImage = 0;
        this.runSequence();
    }

    /**
     * Runs the intro sequence: short alert phase, then transitions to walking, starts loops, and triggers an immediate charge.
     */
    runSequence() {
        this.currentState = 'alert';
        setTimeout(() => {
            this.currentState = 'walking';
            this.isIntro = false;
            this.applyGravity();
            this.startLoops();
            this.triggerDash();
        }, this.ALERT_DURATION);
    }

    /**
     * Starts all recurring game loops for the boss (jumping, landing, movement, and animation).
     */
    startLoops() {
        setInterval(() => this.jumpLoopP1(), this.JUMP_INTERVAL_P1);
        setInterval(() => this.jumpLoopP2(), this.JUMP_INTERVAL_P2);
        setInterval(() => this.landingLoop(), 1000 / 60);
        setInterval(() => this.movementLoop(), 1000 / 60);
        setInterval(() => this.animationLoop(), this.WALK_FPS);
        setInterval(() => this.triggerDash(), this.DASH_INTERVAL);
    }

    /**
     * Returns the current phase (1 or 2) based on remaining energy.
     */
    getPhase() {
        return this.energy <= this.PHASE2_THRESHOLD ? 2 : 1;
    }

    /**
     * Triggers a jump in phase 1 only.
     */
    jumpLoopP1() {
        if (window.gamePaused || this.getPhase() !== 1) return;
        if (this.isDead() || this.currentState === 'hurt') return;
        this.currentState = 'jumping';
        this.speedY = this.JUMP_SPEED;
    }

    /**
     * Triggers a jump in phase 2 only (faster interval).
     */
    jumpLoopP2() {
        if (window.gamePaused || this.getPhase() !== 2) return;
        if (this.isDead() || this.currentState === 'hurt') return;
        this.currentState = 'jumping';
        this.speedY = this.JUMP_SPEED;
    }

    /**
     * Detects when the boss lands and triggers the hurt state.
     */
    landingLoop() {
        if (window.gamePaused) return;
        if (this.currentState === 'jumping' && !this.isAboveGround() && this.speedY <= 0) {
            this.triggerHurt();
        }
    }

    /**
     * Moves the boss left each frame, speed depends on current phase.
     */
    movementLoop() {
        if (window.gamePaused) return;
        if (this.isDead() || this.currentState === 'hurt' || this.currentState === 'alert') return;
        if (this.isKnockedBack) return;
        if (this.currentState === 'dashing') {
            this.x -= this.DASH_SPEED;
        } else {
            this.speed = this.getPhase() === 2 ? this.SPEED_PHASE2 : this.SPEED_PHASE1;
            this.moveLeft();
        }
    }

    /**
     * Plays the correct animation frame for the boss's current state.
     */
    animationLoop() {
        if (window.gamePaused) return;
        if (this.isDead()) { this.playDeadAnimation(); return; }
        if (this.currentState === 'hurt') this.playAnimation(this.IMAGES_HURT);
        else if (this.currentState === 'jumping' || this.currentState === 'dashing') this.playAnimation(this.IMAGES_ATTACK);
        else if (this.currentState === 'alert') this.playAnimation(this.IMAGES_ALERT);
        else this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Triggers a short dash attack toward the character.
     */
    triggerDash() {
        if (window.gamePaused) return;
        if (this.isDead() || this.currentState === 'hurt' || this.isKnockedBack) return;
        this.currentState = 'dashing';
        setTimeout(() => {
            if (!this.isDead()) this.currentState = 'walking';
        }, this.DASH_DURATION);
    }

    /**
     * Advances the death animation frame by frame, then starts falling.
     */
    playDeadAnimation() {
        if (this.deadAnimationDone) return;
        this.img = this.imageCache[this.IMAGES_DEAD[this.deadFrame]];
        if (this.deadFrame < this.IMAGES_DEAD.length - 1) {
            this.deadFrame++;
        } else {
            this.deadAnimationDone = true;
            this.startFalling();
        }
    }

    /** @type {number} */
    energy = 50;
    /** @type {number} */
    deadFrame = 0;
    /** @type {boolean} */
    deadAnimationDone = false;

    /**
     * Reduces boss energy by 10 and records the time of the hit.
     */
    hit() {
        if (this.isIntro || this.currentState === 'waiting') return;
        if (this.currentState === 'dashing' || this.currentState === 'jumping') return;
        if (this.currentState === 'hurt' || this.isKnockedBack) return;
        this.energy = Math.max(0, this.energy - 10);
        this.lastHit = new Date().getTime();
    }

    /**
     * Starts the falling animation after the boss death sequence completes.
     */
    startFalling() {
        const fall = setInterval(() => {
            if (window.gamePaused) return;
            this.y += 8;
            if (this.y > 600) {
                clearInterval(fall);
                this.visible = false;
                this.onDeathComplete();
            }
        }, 1000 / 60);
    }

    /**
     * Handles the game win state after the boss has fully fallen off screen.
     */
    onDeathComplete() {
        AudioManager.stopBossMusic();
        if (!ActionIcons.muted) {
            new Audio('assets/sounds/game/winMusic.mp3').play().catch(() => {});
        }
        setTimeout(() => {
            window.gamePaused = true;
            if (world) world.paused = true;
            document.getElementById('game-toolbar').style.display = 'none';
            document.getElementById('you-win-screen').classList.add('visible');
        }, 1000);
    }

    /**
     * Transitions the boss into the hurt state for a fixed duration, then back to walking.
     */
    triggerHurt() {
        if (this.isDead() || this.currentState === 'hurt') return;
        this.currentState = 'hurt';
        setTimeout(() => {
            if (!this.isDead()) this.currentState = 'walking';
        }, this.HURT_DURATION);
    }

    /** @type {boolean} */
    isKnockedBack = false;
    /** @type {number} */
    lastKnockback = 0;

    /**
     * Triggers a knockback effect on the boss, pushing it horizontally and entering the hurt state.
     */
    knockback() {
        if (this.isDead()) return;
        const now = new Date().getTime();
        if (now - this.lastKnockback < this.KNOCKBACK_COOLDOWN) return;
        this.lastKnockback = now;
        this.isKnockedBack = true;
        this.currentState = 'hurt';
        this.speedY = this.KNOCKBACK_JUMP_SPEED;
        this.startKnockbackMovement();
    }

    /**
     * Moves the boss horizontally during knockback, then resets its state.
     */
    startKnockbackMovement() {
        const step = this.KNOCKBACK_DISTANCE / (this.KNOCKBACK_DURATION / (1000 / 60));
        const move = setInterval(() => {
            if (!window.gamePaused) this.x += step;
        }, 1000 / 60);
        setTimeout(() => {
            clearInterval(move);
            this.isKnockedBack = false;
            if (!this.isDead()) this.currentState = 'walking';
        }, this.KNOCKBACK_DURATION);
    }
}
