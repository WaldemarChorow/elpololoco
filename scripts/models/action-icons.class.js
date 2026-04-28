class ActionIcons {
    static muted = false;

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
    }

    static restart() {
        location.reload();
    }
}
