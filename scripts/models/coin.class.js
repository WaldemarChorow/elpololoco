class Coin extends MovableObject {
    width = 120;
    height = 120;

    images =[
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]
    collected = false;

    ANIMATION_INTERVAL = 400;

    constructor(x, y) {
        super();
        this.loadImages(this.images);
        this.img = this.imageCache[this.images[0]];
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.collected) this.playAnimation(this.images);
        }, this.ANIMATION_INTERVAL);
    }
}