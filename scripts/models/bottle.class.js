class Bottle extends MovableObject {
    width = 80;
    height = 80;

    images =[
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    collected = false;

    constructor(x, y, index) {
        super();
        this.loadImages(this.images);
        this.img = this.imageCache[this.images[index % 2]];
        this.x = x;
        this.y = y;
    }
}