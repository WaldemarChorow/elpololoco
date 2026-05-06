/**
 * Manages the start screen UI, intro music, and game launch logic.
 * @class
 */
class StartScreen {
    /** @type {boolean} */
    static infoVisible = false;
    /** @type {boolean} */
    static musicStarted = false;
    /** @type {HTMLAudioElement} */
    static music = new Audio('assets/sounds/game/introMusic.mp3');

    /**
     * Initializes and starts the intro music if it has not already been started.
     */
    static initMusic() {
        if (StartScreen.musicStarted) return;
        StartScreen.musicStarted = true;
        StartScreen.music.loop = true;
        StartScreen.music.volume = ActionIcons.muted ? 0 : 0.4;
        StartScreen.music.play().catch(() => {});
    }

    /**
     * Stops and resets the intro music playback.
     */
    static stopMusic() {
        StartScreen.music.pause();
        StartScreen.music.currentTime = 0;
    }

    /**
     * Stops the intro music, hides the start screen, shows the game toolbar, and starts the game.
     */
    static play() {
        StartScreen.stopMusic();
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-toolbar').style.display = 'flex';
        if (ActionIcons.muted) {
            document.getElementById('icon-sound').src = 'assets/img/10_icons/soundOffIcon.png';
        }
        if (MobileControls.isTouchDevice() && MobileControls.isPortrait()) {
            MobileControls.pendingStart = true;
            MobileControls.showRotatePrompt();
            return;
        }
        startGame();
        MobileControls.update();
    }

    /**
     * Initializes music and toggles the visibility of the start screen info overlay.
     */
    static toggleInfo() {
        StartScreen.initMusic();
        const overlay = document.getElementById('start-info-overlay');
        StartScreen.infoVisible = !StartScreen.infoVisible;
        overlay.style.display = StartScreen.infoVisible ? 'block' : 'none';
    }

    /**
     * Toggles the mute state on the start screen and updates the sound icon accordingly.
     * @param {Event} event - The click event, used to stop propagation.
     */
    static toggleSound(event) {
        event.stopPropagation();
        StartScreen.initMusic();
        const icon = document.getElementById('start-icon-sound');
        if (ActionIcons.muted) {
            ActionIcons.muted = false;
            icon.src = 'assets/img/10_icons/soundOnIcon.png';
            StartScreen.music.volume = 0.4;
        } else {
            ActionIcons.muted = true;
            icon.src = 'assets/img/10_icons/soundOffIcon.png';
            StartScreen.music.volume = 0;
        }
    }
}
