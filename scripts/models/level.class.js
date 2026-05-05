/**
 * Represents a game level and holds all its objects and layout data.
 * @class
 */
class Level {
    /** @type {MovableObject[]} */
    enemies;
    /** @type {Cloud[]} */
    clouds;
    /** @type {Layer[]} */
    layers;
    /** @type {Background[]} */
    background;
    /** @type {number} */
    level_end_x = 719 * 9

    /**
     * Creates a new Level instance with the provided game objects.
     * @param {MovableObject[]} enemies - The array of enemy objects in the level.
     * @param {Coin[]} coins - The array of collectible coin objects in the level.
     * @param {MovableObject[]} bottles - The array of collectible bottle objects in the level.
     * @param {Cloud[]} clouds - The array of cloud objects in the level.
     * @param {Layer[]} layers - The array of parallax layer objects in the level.
     * @param {Background[]} background - The array of background tile objects in the level.
     */
    constructor(enemies, coins, bottles, clouds, layers, background){
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.layers = layers;
        this.background = background;
    }
}
