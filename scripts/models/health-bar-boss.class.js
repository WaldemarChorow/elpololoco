class BossHealthBar extends DrawableObjects {
    width = 200;
    height = 60;
    x = 500;
    y = 15;
    visible = false;
    otherDirection = true;

    IMAGES_HEALTH = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
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