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
        new Layer('assets/img/5_background/layers/3_third_layer/2.png'),
        new Layer('assets/img/5_background/layers/3_third_layer/1.png'),
        new Layer('assets/img/5_background/layers/2_second_layer/2.png'),
        new Layer('assets/img/5_background/layers/2_second_layer/1.png'),
        new Layer('assets/img/5_background/layers/1_first_layer/2.png'),
        new Layer('assets/img/5_background/layers/1_first_layer/1.png'),      
    ];
    
    background = new Background('assets/img/5_background/layers/air.png');
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        this.addToMap(this.background);
        this.addObejectsToMap(this.layers);
        this.addObejectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObejectsToMap(this.enemies);    

        requestAnimationFrame(() => this.draw());
    }

    addObejectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}