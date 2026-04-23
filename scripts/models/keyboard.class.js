class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    
    constructor() {
        window.addEventListener('keydown', (e) => {
            this.KEYDOWN(e);
        });
        window.addEventListener('keyup', (e) => {
            this.KEYUP(e);
        });
    }

    KEYDOWN(e) {
        if (e.key === 'ArrowLeft') {
            this.LEFT = true;
        }
        if (e.key === 'ArrowRight') {
            this.RIGHT = true;
        }
        if (e.key === 'ArrowUp') {
            this.UP = true;
        }
        if (e.key === 'ArrowDown') {
            this.DOWN = true;
        }
        if (e.key === ' ') {
            this.SPACE = true;
        }
        if (e.key === 'd' || e.key === 'D') {
            this.D = true;
        }
    }

    KEYUP(e) {
        if (e.key === 'ArrowLeft') {
            this.LEFT = false;
        }
        if (e.key === 'ArrowRight') {
            this.RIGHT = false;
        }
        if (e.key === 'ArrowUp') {
            this.UP = false;
        }
        if (e.key === 'ArrowDown') {
            this.DOWN = false;
        }
        if (e.key === ' ') {
            this.SPACE = false;
        }
        if (e.key === 'd' || e.key === 'D') {
            this.D = false;
        }
    }
}