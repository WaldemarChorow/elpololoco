class ChickenSmall extends MovableObject {
    width = 80;
    height = 80;
    y = 350;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 5
    };
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    constructor(x) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
         setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
            }, 1000 / 60);
        
        
        setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);
    }

}