class AudioManager {
    static volume = 0.1;
    static sounds = [];

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
    }

    static unmute() {
        AudioManager.setVolume(1);
    }
}
