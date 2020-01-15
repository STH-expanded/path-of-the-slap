class Sound {
    constructor(type, src) {
        this.type = type;
        this.audio = document.createElement("audio");
        this.audio.src = src;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
        this.audio.onended = () =>this.audio.remove();
        document.body.appendChild(this.audio);
    }
}