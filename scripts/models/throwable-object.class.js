class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;
    speedY = 5;
    gravity = 0.5;
    state = 'flying'; // 'flying' | 'on_ground'

    GROUND_Y = 350; // matches Chicken y

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_ROTATING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_ON_GROUND = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            this.x += 40;
        }, 1000 / 20);
    }

    animate() {
        setInterval(() => {
            if (this.state === 'flying') {
                if (this.y >= this.GROUND_Y) {
                    this.land();
                } else {
                    this.playAnimation(this.IMAGES_ROTATING);
                }
            }
        }, 1000 / 20);
    }

    land() {
        this.state = 'on_ground';
        this.y = this.GROUND_Y;
        this.speedY = 0;
        clearInterval(this.moveInterval);
        this.img = this.imageCache[this.IMAGES_BOTTLE_ON_GROUND[0]];
    }
}
