class AudioManager {
    volume = {
        music: 1,
        sfx: 1
    }

    play = sound => {
        sound.audio.volume = this.volume[sound.type];
        sound.audio.play();
    }

    stop = sound => {
        sound.audio.pause();
    }
}

class Sound {
    audio = document.createElement("audio");
    
    constructor(type, src) {
        this.type = type;
        this.audio.src = src;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
        this.audio.onended = () => this.audio.remove();
        document.body.appendChild(this.audio);
    }
}