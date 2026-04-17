class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 350;
    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 220 + Math.random() * 520;
    }
}