class SoundManager {
    constructor() {
        this.deleteSound = null;
        this.successSound = null;
        this.editSound = null;
        this.audioEnabled = false;
        this.initSounds();
        this.enableAudioOnUserInteraction();
    }

    initSounds() {
        this.deleteSound = new Audio('./assets/audio/file-deleted.mp3');
        this.deleteSound.volume = 0.5;

        this.successSound = new Audio('./assets/audio/success.mp3');
        this.successSound.volume = 0.5;

        this.editSound = new Audio('./assets/audio/update.mp3');
        this.editSound.volume = 0.5;
    }

    enableAudioOnUserInteraction() {
        const enableAudio = () => {
            if (!this.audioEnabled) {
                this.deleteSound.play().then(() => {
                    this.deleteSound.pause();
                    this.deleteSound.currentTime = 0;
                }).catch(e => console.log('Audio unlock attempt:', e));
                
                this.successSound.play().then(() => {
                    this.successSound.pause();
                    this.successSound.currentTime = 0;
                }).catch(e => console.log('Audio unlock attempt:', e));
                
                this.editSound.play().then(() => {
                    this.editSound.pause();
                    this.editSound.currentTime = 0;
                }).catch(e => console.log('Audio unlock attempt:', e));
                
                this.audioEnabled = true;
                console.log('Audio enabled');
                
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('keydown', enableAudio);
            }
        };
        
        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
    }

    playDeleteSound() {
        if (!this.audioEnabled) {
            console.log('Audio not enabled yet. Click anywhere first.');
            return;
        }
        try {
            const sound = this.deleteSound.cloneNode();
            sound.play().catch(error => {
                console.log('Delete sound play failed:', error);
            });
        } catch (error) {
            console.log('Error playing delete sound:', error);
        }
    }

    playSuccessSound() {
        if (!this.audioEnabled) {
            console.log('Audio not enabled yet. Click anywhere first.');
            return;
        }
        try {
            const sound = this.successSound.cloneNode();
            sound.play().catch(error => {
                console.log('Success sound play failed:', error);
            });
        } catch (error) {
            console.log('Error playing success sound:', error);
        }
    }

    playEditSound() {
        if (!this.audioEnabled) {
            console.log('Audio not enabled yet. Click anywhere first.');
            return;
        }
        try {
            const sound = this.editSound.cloneNode();
            sound.play().catch(error => {
                console.log('Edit sound play failed:', error);
            });
        } catch (error) {
            console.log('Error playing edit sound:', error);
        }
    }

    preloadSounds() {
        this.deleteSound.load();
        this.successSound.load();
        this.editSound.load();
    }
}

const soundManager = new SoundManager();

window.addEventListener('load', () => {
    soundManager.preloadSounds();
});