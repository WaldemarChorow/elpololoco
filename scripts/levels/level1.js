function createLayers() {
    const layerGroups = [
        ['assets/img/5_background/layers/3_third_layer/1.png',
         'assets/img/5_background/layers/3_third_layer/2.png'],
        ['assets/img/5_background/layers/2_second_layer/1.png',
         'assets/img/5_background/layers/2_second_layer/2.png'],
        ['assets/img/5_background/layers/1_first_layer/1.png',
         'assets/img/5_background/layers/1_first_layer/2.png'],
    ];
    const layers = [];
    for (let i = -2; i < 10; i++) {
        const x = i * 719;
        const index = (i % 2 + 2) % 2;
        layerGroups.forEach(group => {
            layers.push(new Layer(group[index], x));
        });
    }
    return layers;
}

function createBackground() {
    const background = [];
    for (let i = -2; i < 10; i++) {
        background.push(new Background('assets/img/5_background/layers/air.png', i * 719));
    }
    return background;
}

function createClouds() {
    const images = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png',
    ];
    const clouds = [];
    const count = 10;
    const levelWidth = 10 * 719;
    const spacing = levelWidth / count;
    for (let i = 0; i < count; i++) {
        const x = i * spacing + Math.random() * (spacing * 0.5);
        const img = images[i % images.length];
        clouds.push(new Cloud(img, x));
    }
    return clouds;
}

function createEnemies() {
    const minDistance = 300;
    const spread = 400;
    let x = 1500;
    const enemies = [];
    [Chicken, Chicken, ChickenSmall, Chicken, ChickenSmall, Chicken, ChickenSmall, ChickenSmall].forEach(Type => {
        enemies.push(new Type(x));
        x += minDistance + Math.random() * spread;
    });
    enemies.push(new Endboss());
    return enemies;
}

const level1 = new Level(
    createEnemies(),
    createClouds(),
    createLayers(),
    createBackground()
);
