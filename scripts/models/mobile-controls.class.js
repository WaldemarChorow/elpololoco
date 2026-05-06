/**
 * Manages mobile touch controls, orientation handling, and responsive layout for the game.
 * @class
 */
class MobileControls {
    /** @type {boolean} */
    static pendingStart = false;
    /** @type {boolean} */
    static wasPausedByOrientation = false;

    /**
     * Checks whether the current device is a touch device.
     * @returns {boolean} - True if the device supports touch input.
     */
    static isTouchDevice() {
        return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    }

    /**
     * Checks whether the current screen orientation is portrait.
     * @returns {boolean} - True if the screen height is greater than its width.
     */
    static isPortrait() {
        return window.innerHeight > window.innerWidth;
    }

    /**
     * Initializes orientation and resize event listeners and triggers an initial layout update.
     */
    static init() {
        window.addEventListener('orientationchange', () => MobileControls.update());
        window.addEventListener('resize', () => MobileControls.update());
        MobileControls.update();
    }

    /**
     * Updates the visibility of the rotate overlay and mobile controls based on orientation and game state.
     */
    static update() {
        const rotateOverlay = document.getElementById('rotate-overlay');
        const mobileControls = document.getElementById('mobile-controls');
        const isMobile = MobileControls.isTouchDevice();
        const isPortrait = MobileControls.isPortrait();
        const gameRunning = typeof world !== 'undefined' && world;
        if (isMobile && isPortrait) {
            if (MobileControls.pendingStart || gameRunning) {
                rotateOverlay.classList.add('visible');
            }
            if (gameRunning && !world.paused) {
                world.paused = true;
                MobileControls.wasPausedByOrientation = true;
            }
            mobileControls.classList.remove('visible');
            document.body.classList.remove('game-fullscreen');
        } else {
            rotateOverlay.classList.remove('visible');
            if (isMobile && gameRunning) {
                mobileControls.classList.add('visible');
                document.body.classList.add('game-fullscreen');
            } else {
                mobileControls.classList.remove('visible');
                document.body.classList.remove('game-fullscreen');
            }
            if (MobileControls.pendingStart) {
                MobileControls.pendingStart = false;
                if (typeof startGame === 'function') startGame();
                MobileControls.update();
            } else if (MobileControls.wasPausedByOrientation && gameRunning) {
                world.paused = false;
                MobileControls.wasPausedByOrientation = false;
            }
        }
    }

    /**
     * Shows the rotate-device prompt overlay.
     */
    static showRotatePrompt() {
        document.getElementById('rotate-overlay').classList.add('visible');
    }

    /**
     * Sets a keyboard key to the pressed state for mobile button input.
     * @param {string} key - The keyboard key name to activate.
     * @param {Event} event - The touch event, used to prevent default browser behavior.
     */
    static press(key, event) {
        if (typeof keyboard !== 'undefined') keyboard[key] = true;
    }

    /**
     * Sets a keyboard key to the released state for mobile button input.
     * @param {string} key - The keyboard key name to deactivate.
     * @param {Event} event - The touch event, used to prevent default browser behavior.
     */
    static release(key, event) {
        if (typeof keyboard !== 'undefined') keyboard[key] = false;
    }
}
