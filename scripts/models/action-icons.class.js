class ActionIcons {
    static muted = false;

    static blur() {
        document.activeElement?.blur();
    }

    static toggleInfo() {
        document.getElementById('info-banner').classList.toggle('open');
        ActionIcons.blur();
    }

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
        ActionIcons.blur();
    }

    static restart() {
        location.reload();
    }
}
