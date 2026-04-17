class MovableObject {
    x = 120;
    y = 260;
    img;
    height = 180;
    width = 80;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving-right');
    }

    moveLeft() {
    }
}