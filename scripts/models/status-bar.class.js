class StatusBar extends DrawableObjects {
    width = 200;
    height = 60;
    x = 10;
    y = 10;

    IMAGES_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_HEALTH[5]);
        this.loadImages(this.IMAGES_HEALTH);
    }

    setHealth(health) {
        let path = this.IMAGES_HEALTH[this.resolveImageIndex(health)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(health) {
        if (health >= 100) {
            return 5;
        } else if (health >= 80) {
            return 4;
        } else if (health >= 60) {
            return 3;
        } else if (health >= 40) {
            return 2;
        } else if (health >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}   