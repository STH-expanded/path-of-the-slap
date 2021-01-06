class Display {
    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');
    width = 480;
    height = 270;

    constructor(game, assets) {
        this.game = game;
        this.assets = assets;
        // Init HTML
        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.innerHTML = "";
        document.body.appendChild(this.canvas);
    }

    // Display loop
    update = () => {
        this.cx.save();
        this.cx.scale(this.zoom, this.zoom);
        this.game.activity.constructor.display(this);
        this.cx.restore();
    }

    // Flip effect
    flipHorizontally = around => {
        this.cx.translate(around, 0);
        this.cx.scale(-1, 1);
        this.cx.translate(-around, 0);
    }

    // Fade effect
    fadeEffect = (color, frame, MaxFrame) => {
        this.cx.fillStyle = color;
        this.cx.globalAlpha = Math.round(frame / MaxFrame * 3) / 3;
        this.cx.fillRect(0, 0, this.width, this.height);
        this.cx.globalAlpha = 1;
    }

    // Shake effect
    shakeEffect = (xAmplitude, yAmplitude) => {
        this.cx.translate(Math.floor(Math.random() * xAmplitude), Math.floor(Math.random() * yAmplitude));
    }

    // Resize canvas
    resize = () => {
        this.zoom = Math.max(1, Math.min(Math.floor(innerWidth / this.width), Math.floor(innerHeight / this.height)));
        this.canvas.width = this.width * this.zoom;
        this.canvas.height = this.height * this.zoom;
        this.cx.imageSmoothingEnabled = false;
    }
}