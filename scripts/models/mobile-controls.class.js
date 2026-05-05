class MobileControls {
    static pendingStart = false;
    static wasPausedByOrientation = false;

    static isTouchDevice() {
        return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    }

    static isPortrait() {
        return window.innerHeight > window.innerWidth;
    }

    static init() {
        window.addEventListener('orientationchange', () => MobileControls.update());
        window.addEventListener('resize', () => MobileControls.update());
        MobileControls.update();
    }

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

    static showRotatePrompt() {
        document.getElementById('rotate-overlay').classList.add('visible');
    }

    static press(key, event) {
        if (event) event.preventDefault();
        if (typeof keyboard !== 'undefined') keyboard[key] = true;
    }

    static release(key, event) {
        if (event) event.preventDefault();
        if (typeof keyboard !== 'undefined') keyboard[key] = false;
    }
}
