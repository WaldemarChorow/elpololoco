class Cloud extends MovableObject {
     y = 10;
     width = 740;
     height = 400;
     speed = 0.15;

    constructor(imagePath) {
        super().loadImage(imagePath);    
        this.x = Math.random() * 720;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    animate() {        
        setInterval(() => {
             this.moveLeft();
        }, 1000 / 60);
    }
}