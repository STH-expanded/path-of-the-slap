class Sound {
    constructor(audio, volume) {
        this.audio = audio;
        this.audio.volume = volume;
    }

    play = () => {
        if (!this.audio.paused) this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
    }

    isPaused = () => this.audio.paused;

    pause = () => {
        if (!this.audio.paused) this.audio.pause();
    }

    reset = () => {
        this.audio.currentTime = 0;
    }
}