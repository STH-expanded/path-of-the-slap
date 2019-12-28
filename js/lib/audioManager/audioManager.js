class AudioManager {
    constructor() {
        this.volume = {
            music: 1,
            sfx: 1
        };

        this.play = sound => {
            sound.audio.volume = this.volume[sound.type];
            sound.audio.play();
        };

        this.stop = sound => {
            sound.audio.pause();
        };
    }
}