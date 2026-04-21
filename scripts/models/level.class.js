class Level {
    enemies;
    clouds;
    layers;
    background;
    level_end_x = 719 * 4

    constructor(enemies, clouds, layers, background){
        this.enemies = enemies;
        this.clouds = clouds;
        this.layers = layers;
        this.background = background;
    }
}