class MovableObject extends DrawableObjects {   
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
        return this.y < 80;
        }
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    isColliding(mo) {
        const a = this.collisionBox();
        const b = mo.collisionBox();
        return (
            a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height
        );
    }

    collisionBox() {
        const o = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
        return {
            x: this.x + o.left,
            y: this.y + o.top,
            width: this.width - o.left - o.right,
            height: this.height - o.top - o.bottom,
        };
    }

    moveRight() {
            this.x += this.speed;
    }

    moveLeft() {
            this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;      
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy === 0;
    }


}