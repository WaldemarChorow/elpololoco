/**
 * Represents the game world and orchestrates all game logic, rendering, and collision detection.
 * @class
 */
class World{
    /** @type {Character} */
    character = new Character();
    /** @type {Level} */
    level = level1;
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D} */
    ctx;
    /** @type {Keyboard} */
    keyboard;
    /** @type {number} */
    camera_x = 0;
    /** @type {StatusBar} */
    statusBar = new StatusBar();
    /** @type {BossHealthBar} */
    bossHealthBar = new BossHealthBar();
    /** @type {BottleStatusBar} */
    bottleStatusBar = new BottleStatusBar();
    /** @type {CoinScore} */
    coinScore = new CoinScore();
    /** @type {ThrowableObject[]} */
    therowableObjects = [];

    /**
     * Creates a new World instance, initializes all game systems, and starts the game loops.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     * @param {Keyboard} keyboard - The keyboard input tracker.
     * @param {Level} level - The level data containing enemies, coins, bottles, and backgrounds.
     */
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

    /**
     * Assigns the world reference to the character and starts its animation loops.
     */
    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    /** @type {boolean} */
    paused = false;

    /**
     * Starts the main game loop that handles enemy activation, collision checks, and throw object updates.
     */
    run() {
        setInterval(() => {
            if (this.paused) return;
            this.activateEnemiesInRange();
            this.checkCollisions();
            this.checkThrowObjects();
            this.level.enemies = this.level.enemies.filter(e => !e.remove);
        }, 1000 / 60);
    }

    /**
     * Activates enemies that are within range of the character's current position.
     */
    activateEnemiesInRange() {
        const charX = this.character.x;
        this.level.enemies.forEach(e => {
            if (!e.active && e.x - charX < 800) e.active = true;
        });
    }

    /**
     * Handles bottle throwing input, bottle-enemy collision detection, and removes finished throwable objects.
     */
    checkThrowObjects() {
        this.handleThrowInput();
        if (!this.keyboard.D) this.throwKeyUsed = false;
        this.therowableObjects = this.therowableObjects.filter(o => o.state !== 'done');
        this.therowableObjects.forEach(obj => this.checkBottleEnemyCollisions(obj));
    }

    /**
     * Creates a new throwable object when the throw key is pressed and bottles are available.
     */
    handleThrowInput() {
        if (!this.keyboard.D || this.throwKeyUsed || this.bottleStatusBar.count <= 0) return;
        const throwX = this.character.otherDirection ? this.character.x : this.character.x + 90;
        this.therowableObjects.push(new ThrowableObject(throwX, this.character.y + 180, this.character.otherDirection));
        this.bottleStatusBar.count--;
        this.throwKeyUsed = true;
    }

    /**
     * Checks if a flying bottle collides with any enemy and applies damage.
     * @param {ThrowableObject} obj - The thrown bottle to check.
     */
    checkBottleEnemyCollisions(obj) {
        this.level.enemies.forEach((enemy) => {
            if (obj.state !== 'flying' || !obj.isColliding(enemy)) return;
            obj.splash();
            enemy.hit();
            if (enemy instanceof Endboss) {
                this.soundBossHit.currentTime = 0;
                this.soundBossHit.play().catch(() => {});
                enemy.triggerHurt();
                this.bossHealthBar.setHealth(enemy.energy);
            }
            if (enemy.isDead() && enemy.die) enemy.die();
        });
    }

    /**
     * Checks and resolves all collisions between the character, enemies, coins, and bottles.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => this.checkEnemyCollision(enemy));
        this.level.coins.forEach(coin => this.checkCoinCollision(coin));
        this.level.bottles.forEach(bottle => this.checkBottlePickup(bottle));
    }

    /**
     * Handles all collision logic between the character and a single enemy.
     * @param {MovableObject} enemy - The enemy to check against.
     */
    checkEnemyCollision(enemy) {
        if (enemy.isDead()) return;
        if (this.character.isColliding(enemy)) this.resolveCharacterEnemyHit(enemy);
        if (enemy instanceof Endboss && this.character.x > enemy.x - 600 && !this.bossHealthBar.visible) {
            this.bossHealthBar.visible = true;
            enemy.appear();
            AudioManager.startBossFight();
        }
        if (enemy instanceof Endboss && enemy.isDead()) AudioManager.stopBossMusic();
    }

    /**
     * Resolves the hit outcome when the character and an enemy overlap.
     * @param {MovableObject} enemy - The enemy that was hit.
     */
    resolveCharacterEnemyHit(enemy) {
        const charBottom = this.character.y + this.character.height - this.character.offset.bottom;
        const jumpingOnTop = this.character.speedY < 0 && charBottom < enemy.y + enemy.height * 0.5;
        if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && jumpingOnTop) {
            enemy.die();
            this.character.speedY = 15;
        } else if (enemy instanceof Endboss) {
            if (!this.character.isHurt()) { this.soundBossHit.currentTime = 0; this.soundBossHit.play().catch(() => {}); }
            this.character.hit(15);
            this.statusBar.setHealth(this.character.energy);
            enemy.knockback();
        } else {
            this.character.hit(10);
            this.statusBar.setHealth(this.character.energy);
        }
    }

    /**
     * Collects a coin if the character touches it.
     * @param {Coin} coin - The coin to check.
     */
    checkCoinCollision(coin) {
        if (!coin.collected && this.character.isColliding(coin)) {
            coin.collected = true;
            this.soundCoin.play();
            this.coinScore.count++;
        }
    }

    /**
     * Picks up a bottle if the character touches it.
     * @param {Bottle} bottle - The bottle to check.
     */
    checkBottlePickup(bottle) {
        if (!bottle.collected && this.character.isColliding(bottle)) {
            bottle.collected = true;
            this.soundBottleCollect.play();
            this.bottleStatusBar.count++;
        }
    }

    /** @type {boolean} */
    gameOverShown = false;
    /** @type {boolean} */
    gameOverTriggered = false;
    /** @type {number} */
    GAME_OVER_DELAY = 2000; // ms bis Game Over Screen erscheint — hier anpassen

    /**
     * Renders the entire game scene each frame, including background, entities, HUD, and game-over handling.
     */
    draw() {
        if (this.paused) { requestAnimationFrame(() => this.draw()); return; }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        if (!this.gameOverShown) this.drawGameObjects();
        else this.ctx.translate(-this.camera_x, 0);
        this.checkGameOver();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all background layers and clouds.
     */
    drawBackground() {
        this.addObejectsToMap(this.level.background);
        this.addObejectsToMap(this.level.layers);
        this.addObejectsToMap(this.level.clouds);
    }

    /**
     * Draws all active game objects and the HUD.
     */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObejectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss) || e.visible));
        this.addObejectsToMap(this.level.coins.filter(c => !c.collected));
        this.addObejectsToMap(this.level.bottles.filter(b => !b.collected));
        this.addObejectsToMap(this.therowableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawHUD();
    }

    /**
     * Draws the status bars and score counters.
     */
    drawHUD() {
        this.addToMap(this.statusBar);
        if (this.bossHealthBar.visible) this.addToMap(this.bossHealthBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinScore);
    }

    /**
     * Triggers the game over screen when the character dies.
     */
    checkGameOver() {
        if (!this.character.isDead() || this.gameOverTriggered) return;
        this.gameOverTriggered = true;
        AudioManager.mute();
        new Audio('assets/sounds/game/gameOver.mp3').play().catch(() => {});
        setTimeout(() => {
            this.gameOverShown = true;
            document.getElementById('game-toolbar').style.display = 'none';
            document.getElementById('game-over-screen').classList.add('visible');
        }, this.GAME_OVER_DELAY);
    }

    /**
     * Draws an array of objects onto the map by calling addToMap for each.
     * @param {DrawableObjects[]} objects - The array of drawable objects to render.
     */
    addObejectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Draws a single object onto the canvas, flipping it horizontally if facing the other direction.
     * @param {DrawableObjects} mo - The drawable object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Applies a horizontal flip transform to the canvas context for drawing mirrored objects.
     * @param {DrawableObjects} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context and reverts the object's x position after a flip.
     * @param {DrawableObjects} mo - The object whose flip state to restore.
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}
