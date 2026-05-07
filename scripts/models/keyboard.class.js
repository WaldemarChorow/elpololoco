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
     * Maps a keyboard event key to the corresponding flag name.
     * @param {string} key - The pressed key value.
     * @returns {string|null} - Internal flag name or null if unhandled.
     */
    static mapKey(key) {
        const map = { 'ArrowLeft': 'LEFT', 'ArrowRight': 'RIGHT', 'ArrowUp': 'UP',
            'ArrowDown': 'DOWN', ' ': 'SPACE', 'd': 'D', 'D': 'D' };
        return map[key] ?? null;
    }

    /**
     * Sets the corresponding key state to true when a key is pressed.
     * @param {KeyboardEvent} e - The keydown event.
     */
    KEYDOWN(e) {
        const flag = Keyboard.mapKey(e.key);
        if (flag) this[flag] = true;
    }

    /**
     * Sets the corresponding key state to false when a key is released.
     * @param {KeyboardEvent} e - The keyup event.
     */
    KEYUP(e) {
        const flag = Keyboard.mapKey(e.key);
        if (flag) this[flag] = false;
    }
}
