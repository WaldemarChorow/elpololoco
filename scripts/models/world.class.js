class World{
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
     clouds = [
        new Cloud('assets/img/5_background/layers/4_clouds/1.png'),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png')
    ];
    layers = [
        new Layer('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new Layer('assets/img/5_background/layers/2_second_layer/2.png', -719), 
        new Layer('assets/img/5_background/layers/1_first_layer/2.png', -719),

        new Layer('assets/img/5_background/layers/3_third_layer/1.png', 0), 
        new Layer('assets/img/5_background/layers/2_second_layer/1.png', 0),  
        new Layer('assets/img/5_background/layers/1_first_layer/1.png', 0),

        new Layer('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new Layer('assets/img/5_background/layers/2_second_layer/2.png', 719),  
        new Layer('assets/img/5_background/layers/1_first_layer/2.png', 719),
     
        new Layer('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
        new Layer('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
        new Layer('assets/img/5_background/layers/1_first_layer/1.png', 719*2),

        new Layer('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
        new Layer('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
        new Layer('assets/img/5_background/layers/1_first_layer/2.png', 719*3),

        
    ];
    
    background = [
        new Background('assets/img/5_background/layers/air.png', -719),
        new Background('assets/img/5_background/layers/air.png', 0),
        new Background('assets/img/5_background/layers/air.png', 719),
        new Background('assets/img/5_background/layers/air.png', 719*2),
        new Background('assets/img/5_background/layers/air.png', 719*3),
    ];
    
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObejectsToMap(this.background);
        this.addObejectsToMap(this.layers);
        this.addObejectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObejectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);    

        requestAnimationFrame(() => this.draw());
    }

    addObejectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }
}