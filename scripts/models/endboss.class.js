class Endboss extends MovableObject {
    width = 250;
    height = 400;
    y = 80;
    speed = 3.5;   

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    visible = false;

    offset = {
        top: 60,
        left: 50,
        right: 40,
        bottom: 10
    };

    ALERT_DURATION  = 1000;   // ms Alert-Phase
    INTRO_HURT_DURATION = 2000; // ms Hurt nach Alert
    HURT_DURATION   = 1000;   // ms Hurt bei Flaschentreffer & nach Sprung
    ALERT_FPS       = 150;
    WALK_FPS        = 120;
    JUMP_INTERVAL   = 6000;   // ms zwischen Sprüngen
    JUMP_SPEED      = 28;
    KNOCKBACK_DISTANCE = 150; // px Rücksprung bei Kollision (horizontal)
    KNOCKBACK_JUMP_SPEED = 18; // Sprungkraft für den Bogen-Rückwurf
    KNOCKBACK_DURATION = 600; // ms Pause bevor Boss wieder angreift
    KNOCKBACK_COOLDOWN = 800; // ms bis nächster Knockback möglich

    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 6000;
        this.currentState = 'waiting';
    }

    appear() {
        this.visible = true;
        this.currentState = 'alert';
        this.currentImage = 0;
        this.runSequence();
    }

    runSequence() {
        // Phase 1: 3 sec Alert
        this.currentState = 'alert';
        setTimeout(() => {
            // Phase 2: 3 sec Hurt (intro)
            this.currentState = 'hurt';
            setTimeout(() => {
                // Phase 3: Laufen + Sprung-Zyklus
                this.currentState = 'walking';
                this.applyGravity();
                this.startLoops();
            }, this.INTRO_HURT_DURATION);
        }, this.ALERT_DURATION);
    }

    startLoops() {
        // Sprung-Zyklus
        setInterval(() => {
            if (window.gamePaused) return;
            if (this.isDead() || this.currentState === 'hurt') return;
            this.currentState = 'jumping';
            this.speedY = this.JUMP_SPEED;
        }, this.JUMP_INTERVAL);

        // Landungserkennung → 3 sec Hurt
        setInterval(() => {
            if (window.gamePaused) return;
            if (this.currentState === 'jumping' && !this.isAboveGround() && this.speedY <= 0) {
                this.triggerHurt();
            }
        }, 1000 / 60);

        // Bewegung nach links (auf Charakter zu)
        setInterval(() => {
            if (window.gamePaused) return;
            if (this.isDead() || this.currentState === 'hurt' || this.currentState === 'alert') return;
            if (this.isKnockedBack) return;
            this.moveLeft();
        }, 1000 / 60);

        // Animations-Loop
        setInterval(() => {
            if (window.gamePaused) return;
            if (this.isDead()) {
                if (!this.deadAnimationDone) {
                    this.img = this.imageCache[this.IMAGES_DEAD[this.deadFrame]];
                    if (this.deadFrame < this.IMAGES_DEAD.length - 1) {
                        this.deadFrame++;
                    } else {
                        this.deadAnimationDone = true;
                        this.startFalling();
                    }
                }
            } else if (this.currentState === 'hurt') {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.currentState === 'jumping') {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.currentState === 'alert') {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, this.WALK_FPS);
    }

    energy = 50;
    deadFrame = 0;
    deadAnimationDone = false;

    hit() {
        this.energy = Math.max(0, this.energy - 10);
        this.lastHit = new Date().getTime();
    }

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

    onDeathComplete() {
        AudioManager.stopBossMusic();
        new Audio('assets/sounds/game/winMusic.mp3').play().catch(() => {});
        setTimeout(() => {
            window.gamePaused = true;
            if (world) world.paused = true;
            document.getElementById('game-toolbar').style.display = 'none';
            document.getElementById('you-win-screen').classList.add('visible');
        }, 1000);
    }

    triggerHurt() {
        if (this.isDead() || this.currentState === 'hurt') return;
        this.currentState = 'hurt';
        setTimeout(() => {
            if (!this.isDead()) this.currentState = 'walking';
        }, this.HURT_DURATION);
    }

    isKnockedBack = false;
    lastKnockback = 0;

    knockback() {
        if (this.isDead()) return;
        const now = new Date().getTime();
        if (now - this.lastKnockback < this.KNOCKBACK_COOLDOWN) return;
        this.lastKnockback = now;
        this.isKnockedBack = true;
        this.currentState = 'hurt';
        this.speedY = this.KNOCKBACK_JUMP_SPEED;
        const horizontalStep = this.KNOCKBACK_DISTANCE / (this.KNOCKBACK_DURATION / (1000 / 60));
        const knockbackMove = setInterval(() => {
            if (window.gamePaused) return;
            this.x += horizontalStep;
        }, 1000 / 60);
        setTimeout(() => {
            clearInterval(knockbackMove);
            this.isKnockedBack = false;
            if (!this.isDead()) this.currentState = 'walking';
        }, this.KNOCKBACK_DURATION);
    }
}
