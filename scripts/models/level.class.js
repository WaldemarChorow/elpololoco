class Level {
    enemies;
    clouds;
    layers;
    background;
    level_end_x = 719 * 9

    constructor(enemies, coins, bottles, clouds, layers, background){
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.layers = layers;
        this.background = background;
    }
}