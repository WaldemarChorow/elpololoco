/**
 * Tracks the state of keyboard inputs used for game controls.
 * @class
 */
class Keyboard {
    /** @type {boolean} */
    LEFT = false;
    /** @type {boolean} */
    RIGHT = false;
    /** @type {boolean} */
    UP = false;
    /** @type {boolean} */
    DOWN = false;
    /** @type {boolean} */
    SPACE = false;
    /** @type {boolean} */
    D = false;

    /**
     * Creates a new Keyboard instance and registers keydown/keyup event listeners on the window.
     */
    constructor() {
        window.addEventListener('keydown', (e) => {
            this.KEYDOWN(e);
        });
        window.addEventListener('keyup', (e) => {
            this.KEYUP(e);
        });
    }

    /**
     * Sets the corresponding key state to true when a key is pressed.
     * @param {KeyboardEvent} e - The keydown event.
     */
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

    /**
     * Sets the corresponding key state to false when a key is released.
     * @param {KeyboardEvent} e - The keyup event.
     */
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
