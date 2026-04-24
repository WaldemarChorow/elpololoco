class Cloud extends MovableObject {
    y = 1;
    width = 740;
    height = 400;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 1 + Math.random() * 20;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < -719) {
                this.x = 1 * 719;
            }
        }, 1000 / 60);
    }
}