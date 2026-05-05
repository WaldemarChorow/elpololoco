class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bossHealthBar = new BossHealthBar();
    bottleStatusBar = new BottleStatusBar();
    coinScore = new CoinScore();
    therowableObjects = [];

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.soundCoin = AudioManager.create('assets/sounds/collectibles/collectSound.wav');
        this.soundBottleCollect = AudioManager.create('assets/sounds/collectibles/bottleCollectSound.wav');
        this.soundBossHit = AudioManager.create('assets/sounds/chicken/chickenDead2.mp3');
        this.enemies = level.enemies;
        this.clouds = level.clouds;
        this.layers = level.layers;
        this.background = level.background;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    paused = false;

    run() {
        setInterval(() => {
            if (this.paused) return;
            this.activateEnemiesInRange();
            this.checkCollisions();
            this.checkThrowObjects();
            this.level.enemies = this.level.enemies.filter(e => !e.remove);
        }, 1000 / 60);
    }

    activateEnemiesInRange() {
        const charX = this.character.x;
        this.level.enemies.forEach(e => {
            if (!e.active && e.x - charX < 800) e.active = true;
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.throwKeyUsed && this.bottleStatusBar.count > 0) {
            const throwX = this.character.otherDirection ? this.character.x : this.character.x + 90;
            let throwableObject = new ThrowableObject(throwX, this.character.y + 180, this.character.otherDirection);
            this.therowableObjects.push(throwableObject);
            this.bottleStatusBar.count--;
            this.throwKeyUsed = true;
        }
        if (!this.keyboard.D) this.throwKeyUsed = false;
        this.therowableObjects = this.therowableObjects.filter(o => o.state !== 'done');
        this.therowableObjects.forEach((obj) => {
            this.level.enemies.forEach((enemy) => {
                if (obj.state === 'flying' && obj.isColliding(enemy)) {
                    obj.splash();
                    enemy.hit();
                    if (enemy instanceof Endboss) {
                        this.soundBossHit.currentTime = 0;
                        this.soundBossHit.play().catch(() => {});
                        enemy.triggerHurt();
                        this.bossHealthBar.setHealth(enemy.energy);
                    }
                    if (enemy.isDead() && enemy.die) enemy.die();
                }
            });
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) return;
            if (this.character.isColliding(enemy)) {
                const charBottom = this.character.y + this.character.height - this.character.offset.bottom;
                const jumpingOnTop = this.character.speedY < 0 && charBottom < enemy.y + enemy.height * 0.5;
                if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && jumpingOnTop) {
                    enemy.die();
                    this.character.speedY = 15;
                } else if (enemy instanceof Endboss) {
                    if (!this.character.isHurt()) {
                        this.soundBossHit.currentTime = 0;
                        this.soundBossHit.play().catch(() => {});
                    }
                    this.character.hit(15);
                    this.statusBar.setHealth(this.character.energy);
                    enemy.knockback();
                } else {
                    this.character.hit(10);
                    this.statusBar.setHealth(this.character.energy);
                }
            }
            if (enemy instanceof Endboss && this.character.x > enemy.x - 600 && !this.bossHealthBar.visible) {
                this.bossHealthBar.visible = true;
                enemy.appear();
                AudioManager.startBossFight();
            }
            if (enemy instanceof Endboss && enemy.isDead()) {
                AudioManager.stopBossMusic();
            }
        });
        this.level.coins.forEach((coin) => {
            if (!coin.collected && this.character.isColliding(coin)) {
                coin.collected = true;
                this.soundCoin.play();
                this.coinScore.count++;
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (!bottle.collected && this.character.isColliding(bottle)) {
                bottle.collected = true;
                this.soundBottleCollect.play();
                this.bottleStatusBar.count++;
            }
        });
    }   

    gameOverShown = false;
    gameOverTriggered = false;
    GAME_OVER_DELAY = 2000; // ms bis Game Over Screen erscheint — hier anpassen

    draw() {
        if (this.paused) {
            requestAnimationFrame(() => this.draw());
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObejectsToMap(this.level.background);
        this.addObejectsToMap(this.level.layers);
        this.addObejectsToMap(this.level.clouds);

        if (!this.gameOverShown) {
            this.addToMap(this.character);
            this.addObejectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss) || e.visible));
            this.addObejectsToMap(this.level.coins.filter(c => !c.collected));
            this.addObejectsToMap(this.level.bottles.filter(b => !b.collected));
            this.addObejectsToMap(this.therowableObjects);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            if (this.bossHealthBar.visible) this.addToMap(this.bossHealthBar);
            this.addToMap(this.bottleStatusBar);
            this.addToMap(this.coinScore);
        } else {
            this.ctx.translate(-this.camera_x, 0);
        }

        if (this.character.isDead() && !this.gameOverTriggered) {
            this.gameOverTriggered = true;
            AudioManager.mute();
            new Audio('assets/sounds/game/gameOver.mp3').play().catch(() => {});
            setTimeout(() => {
                this.gameOverShown = true;
                document.getElementById('game-toolbar').style.display = 'none';
                document.getElementById('game-over-screen').classList.add('visible');
            }, this.GAME_OVER_DELAY);
        }

        requestAnimationFrame(() => this.draw());
    }

    addObejectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}