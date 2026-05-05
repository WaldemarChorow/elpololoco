class StartScreen {
    static infoVisible = false;
    static musicStarted = false;
    static music = new Audio('assets/sounds/game/introMusic.mp3');

    static initMusic() {
        if (StartScreen.musicStarted) return;
        StartScreen.musicStarted = true;
        StartScreen.music.loop = true;
        StartScreen.music.volume = ActionIcons.muted ? 0 : 0.4;
        StartScreen.music.play().catch(() => {});
    }

    static stopMusic() {
        StartScreen.music.pause();
        StartScreen.music.currentTime = 0;
    }

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

    static toggleInfo() {
        StartScreen.initMusic();
        const overlay = document.getElementById('start-info-overlay');
        StartScreen.infoVisible = !StartScreen.infoVisible;
        overlay.style.display = StartScreen.infoVisible ? 'block' : 'none';
    }

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
