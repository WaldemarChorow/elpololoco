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
    for (let i = -2; i < 5; i++) {
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
    for (let i = -2; i < 5; i++) {
        background.push(new Background('assets/img/5_background/layers/air.png', i * 719));
    }
    return background;
}

const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud('assets/img/5_background/layers/4_clouds/1.png'),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png')
    ],
    createLayers(),
    createBackground()
);
