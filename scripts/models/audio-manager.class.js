/**
 * Manages all game audio including background music, boss music, and sound effects.
 * @class
 */
class AudioManager {
    /** @type {number} */
    static volume = 0.3;
    /** @type {number} */
    static musicVolume = 0.4;
    /** @type {number} */
    static bossMusicVolume = 0.5;
    /** @type {HTMLAudioElement[]} */
    static sounds = [];

    /** @type {HTMLAudioElement} */
    static bgMusic = new Audio('assets/sounds/game/gameMusic.mp3');
    /** @type {HTMLAudioElement} */
    static bossApproach = new Audio('assets/sounds/game/bossFightMusic.mp3');
    /** @type {HTMLAudioElement} */
    static bossMusic = new Audio('assets/sounds/game/bossFightMusic.mp3');

    /**
     * Initializes and starts the background music if it has not already been started.
     */
    static initMusic() {
        if (AudioManager.musicStarted) return;
        AudioManager.musicStarted = true;
        const muted = typeof ActionIcons !== 'undefined' && ActionIcons.muted;
        AudioManager.bgMusic.loop = true;
        AudioManager.bgMusic.volume = muted ? 0 : AudioManager.musicVolume;
        AudioManager.bossMusic.loop = true;
        AudioManager.bossMusic.volume = muted ? 0 : AudioManager.bossMusicVolume;
        AudioManager.bossApproach.volume = muted ? 0 : AudioManager.bossMusicVolume;
        AudioManager.bgMusic.play().catch(() => {});
    }

    /**
     * Pauses the background music and starts the boss approach and boss fight music sequence.
     */
    static startBossFight() {
        AudioManager.bgMusic.pause();
        AudioManager.bossApproach.play();
        AudioManager.bossApproach.onended = () => {
            AudioManager.bossMusic.play();
        };
    }

    /**
     * Stops and resets the boss music playback.
     */
    static stopBossMusic() {
        AudioManager.bossMusic.pause();
        AudioManager.bossMusic.currentTime = 0;
    }

    /**
     * Sets the volume for the background music.
     * @param {number} value - The new music volume level (0.0 to 1.0).
     */
    static setMusicVolume(value) {
        AudioManager.musicVolume = value;
        AudioManager.bgMusic.volume = value;
    }

    /**
     * Sets the volume for the boss music and boss approach music.
     * @param {number} value - The new boss music volume level (0.0 to 1.0).
     */
    static setBossMusicVolume(value) {
        AudioManager.bossMusicVolume = value;
        AudioManager.bossMusic.volume = value;
        AudioManager.bossApproach.volume = value;
    }

    /**
     * Creates and registers a new Audio instance with the AudioManager.
     * @param {string} src - The path to the audio file.
     * @param {number|null} volume - The volume for this sound, or null to use the global volume.
     * @returns {HTMLAudioElement} - The created audio element.
     */
    static create(src, volume = null) {
        const audio = new Audio(src);
        audio.volume = volume !== null ? volume : AudioManager.volume;
        audio._customVolume = volume !== null ? volume : null;
        AudioManager.sounds.push(audio);
        return audio;
    }

    /**
     * Sets the global volume for all registered sound effects.
     * @param {number} value - The new volume level (0.0 to 1.0).
     */
    static setVolume(value) {
        AudioManager.volume = value;
        AudioManager.sounds.forEach(s => s.volume = value);
    }

    /**
     * Mutes all sounds and music by setting their volume to zero.
     */
    static mute() {
        AudioManager.sounds.forEach(s => s.volume = 0);
        AudioManager.bgMusic.volume = 0;
        AudioManager.bossMusic.volume = 0;
        AudioManager.bossApproach.volume = 0;
    }

    /**
     * Restores all sounds and music to their previously saved volume levels.
     */
    static unmute() {
        AudioManager.sounds.forEach(s => {
            s.volume = s._customVolume !== null ? s._customVolume : AudioManager.volume;
        });
        AudioManager.bgMusic.volume = AudioManager.musicVolume;
        AudioManager.bossMusic.volume = AudioManager.bossMusicVolume;
        AudioManager.bossApproach.volume = AudioManager.bossMusicVolume;
        if (AudioManager.musicStarted && AudioManager.bgMusic.paused) {
            AudioManager.bgMusic.play().catch(() => {});
        }
    }
}
