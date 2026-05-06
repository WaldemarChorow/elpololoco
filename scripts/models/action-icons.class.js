/**
 * Provides static methods for UI action icon interactions (sound, pause, info, restart).
 * @class
 */
class ActionIcons {
    /** @type {boolean} */
    static muted = false;

    /**
     * Removes focus from the currently active element.
     */
    static blur() {
        document.activeElement?.blur();
    }

    /**
     * Toggles the info overlay and pauses/resumes the game accordingly.
     */
    static toggleInfo() {
        const modal = document.getElementById('info-modal');
        const isOpening = !modal.classList.contains('open');
        modal.classList.toggle('open');
        if (world) {
            world.paused = isOpening;
            window.gamePaused = isOpening;
            if (isOpening) AudioManager.mute();
            else if (!ActionIcons.muted) AudioManager.unmute();
        }
        ActionIcons.blur();
    }

    /**
     * Toggles the game pause state and updates the pause icon accordingly.
     */
    static togglePause() {
        if (!world) return;
        const icon = document.getElementById('icon-pause');
        world.paused = !world.paused;
        window.gamePaused = world.paused;
        if (world.paused) {
            AudioManager.mute();
            icon.src = 'assets/img/10_icons/playIcon.png';
        } else {
            if (!ActionIcons.muted) AudioManager.unmute();
            icon.src = 'assets/img/10_icons/pauseIcon.png';
        }
        ActionIcons.blur();
    }

    /**
     * Toggles the game audio mute state and updates the sound icon accordingly.
     */
    static toggleSound() {
        const icon = document.getElementById('icon-sound');
        if (ActionIcons.muted) {
            AudioManager.unmute();
            icon.src = 'assets/img/10_icons/soundOnIcon.png';
            ActionIcons.muted = false;
        } else {
            AudioManager.mute();
            icon.src = 'assets/img/10_icons/soundOffIcon.png';
            ActionIcons.muted = true;
        }
        localStorage.setItem('muted', ActionIcons.muted);
        ActionIcons.blur();
    }

    /**
     * Restarts the game without reloading the page.
     */
    static restart() {
        restartGame();
    }
}
