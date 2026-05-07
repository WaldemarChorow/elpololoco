/**
 * Provides static methods for UI action icon interactions (sound, pause, info, restart).
 * @class
 */
class ActionIcons {
    /** @type {boolean} */
    static muted = false;
    /** @type {number} */
    static savedMusicValue = 0.4;
    /** @type {number} */
    static savedSfxValue = 0.3;

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
        const overlay = document.getElementById('game-info-overlay');
        const isOpening = overlay.style.display !== 'block';
        overlay.style.display = isOpening ? 'block' : 'none';
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
        if (ActionIcons.muted) ActionIcons.unmuteAll(icon);
        else ActionIcons.muteAll(icon);
        ActionIcons.savePreferences();
        ActionIcons.blur();
    }

    /**
     * Restores audio playback and slider positions from saved values.
     * @param {HTMLImageElement} icon - The toolbar sound icon.
     */
    static unmuteAll(icon) {
        ActionIcons.muted = false;
        const musicSlider = document.getElementById('music-slider');
        const sfxSlider = document.getElementById('sfx-slider');
        if (musicSlider) musicSlider.value = ActionIcons.savedMusicValue;
        if (sfxSlider) sfxSlider.value = ActionIcons.savedSfxValue;
        ActionIcons.setMusicVolume(ActionIcons.savedMusicValue);
        ActionIcons.setSfxVolume(ActionIcons.savedSfxValue);
        icon.src = 'assets/img/10_icons/soundOnIcon.png';
    }

    /**
     * Mutes all audio, stores current slider values and updates the icon.
     * @param {HTMLImageElement} icon - The toolbar sound icon.
     */
    static muteAll(icon) {
        const musicSlider = document.getElementById('music-slider');
        const sfxSlider = document.getElementById('sfx-slider');
        if (musicSlider) ActionIcons.savedMusicValue = parseFloat(musicSlider.value);
        if (sfxSlider) ActionIcons.savedSfxValue = parseFloat(sfxSlider.value);
        ActionIcons.muted = true;
        if (musicSlider) musicSlider.value = 0;
        if (sfxSlider) sfxSlider.value = 0;
        AudioManager.mute();
        icon.src = 'assets/img/10_icons/soundOffIcon.png';
    }

    /**
     * Saves current mute and volume preferences to localStorage.
     */
    static savePreferences() {
        localStorage.setItem('muted', ActionIcons.muted);
        localStorage.setItem('musicVolume', ActionIcons.savedMusicValue);
        localStorage.setItem('sfxVolume', ActionIcons.savedSfxValue);
    }

    /**
     * Sets the volume for background and boss music only.
     * @param {number} value - Volume level between 0.0 and 1.0.
     */
    static setMusicVolume(value) {
        const v = parseFloat(value);
        AudioManager.musicVolume = v;
        AudioManager.bossMusicVolume = v;
        AudioManager.bgMusic.volume = v;
        AudioManager.bossMusic.volume = v;
        AudioManager.bossApproach.volume = v;
        if (v > 0) ActionIcons.savedMusicValue = v;
        if (v > 0 && ActionIcons.muted) ActionIcons.setMutedState(false);
        ActionIcons.savePreferences();
    }

    /**
     * Sets the volume for all sound effects only.
     * @param {number} value - Volume level between 0.0 and 1.0.
     */
    static setSfxVolume(value) {
        const v = parseFloat(value);
        AudioManager.volume = v;
        AudioManager.sounds.forEach(s => { s._customVolume = v; s.volume = v; });
        if (v > 0) ActionIcons.savedSfxValue = v;
        if (v > 0 && ActionIcons.muted) ActionIcons.setMutedState(false);
        ActionIcons.savePreferences();
    }

    /**
     * Updates the muted flag and sound icon without touching audio levels.
     * @param {boolean} state - New muted state.
     */
    static setMutedState(state) {
        ActionIcons.muted = state;
        const icon = document.getElementById('icon-sound');
        if (icon) icon.src = state
            ? 'assets/img/10_icons/soundOffIcon.png'
            : 'assets/img/10_icons/soundOnIcon.png';
    }

    /**
     * Restarts the game without reloading the page.
     */
    static restart() {
        restartGame();
    }
}
