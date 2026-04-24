class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 90;
    height = 180;
    width = 80;

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

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            console.log('img undefined for', this.constructor.name, this);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            const o = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + o.left,
                this.y + o.top,
                this.width - o.left - o.right,
                this.height - o.top - o.bottom
            );
            ctx.stroke();
        }
    }
}