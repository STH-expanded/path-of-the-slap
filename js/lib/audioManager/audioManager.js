class AudioManager {
    constructor() {
        this.volume = {
            music: 1,
            sfx: 1
        }
    }

    play = sound => {
        sound.audio.volume = this.volume[sound.type];
        sound.audio.play();
    }

    stop = sound => {
        sound.audio.pause();
    }
}