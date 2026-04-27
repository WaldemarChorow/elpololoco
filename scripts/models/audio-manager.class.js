class AudioManager {
    static volume = 0.3;        // Soundeffekte
    static musicVolume = 0.1;  // Hintergrundmusik
    static bossMusicVolume = 0.5; // Boss-Fight-Musik
    static sounds = [];

    static bgMusic = new Audio('assets/sounds/game/gameBackgoundMusic.mp3');
    static bossApproach = new Audio('assets/sounds/endboss/endbossApproach.wav');
    static bossMusic = new Audio('assets/sounds/game/bossFightMusic.mp3');

    static initMusic() {
        AudioManager.bgMusic.loop = true;
        AudioManager.bgMusic.volume = AudioManager.musicVolume;
        AudioManager.bossMusic.loop = true;
        AudioManager.bossMusic.volume = AudioManager.bossMusicVolume;
        AudioManager.bossApproach.volume = AudioManager.bossMusicVolume;
        AudioManager.bgMusic.play();
    }

    static startBossFight() {
        AudioManager.bgMusic.pause();
        AudioManager.bossApproach.play();
        AudioManager.bossApproach.onended = () => {
            AudioManager.bossMusic.play();
        };
    }

    static stopBossMusic() {
        AudioManager.bossMusic.pause();
        AudioManager.bossMusic.currentTime = 0;
    }

    static setMusicVolume(value) {
        AudioManager.musicVolume = value;
        AudioManager.bgMusic.volume = value;
    }

    static setBossMusicVolume(value) {
        AudioManager.bossMusicVolume = value;
        AudioManager.bossMusic.volume = value;
        AudioManager.bossApproach.volume = value;
    }

    static create(src) {
        const audio = new Audio(src);
        audio.volume = AudioManager.volume;
        AudioManager.sounds.push(audio);
        return audio;
    }

    static setVolume(value) {
        AudioManager.volume = value;
        AudioManager.sounds.forEach(s => s.volume = value);
    }

    static mute() {
        AudioManager.setVolume(0);
        AudioManager.setMusicVolume(0);
    }

    static unmute() {
        AudioManager.setVolume(1);
        AudioManager.setMusicVolume(AudioManager.musicVolume);
    }
}
