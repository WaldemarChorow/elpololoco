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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.level.enemies = this.level.enemies.filter(e => !e.remove);
        }, 1000 / 60);
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
                } else {
                    this.character.hit();
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObejectsToMap(this.level.background);
        this.addObejectsToMap(this.level.layers);
        this.addObejectsToMap(this.level.clouds);
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
        mo.drawFrame(this.ctx);

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