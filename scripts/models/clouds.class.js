class Cloud extends MovableObject {
     y = 10;
     width = 740;
     height = 400;
    constructor(imagePath) {
        super().loadImage(imagePath);
    
        this.x = Math.random() * 200;
    }
}