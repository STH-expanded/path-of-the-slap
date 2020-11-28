class Display {
    constructor(game, assets) {
        // Temporary or deprecated variables
        this.frame = 0;

        // Game data
        this.game = game;
        this.assets = assets;
        this.audioManager = new AudioManager();

        // Display data
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext('2d');
        
        this.width = 480;
        this.height = 270;

        this.resize();
        window.addEventListener('resize', this.resize);

        document.body.innerHTML = "";
        document.body.appendChild(this.canvas);
    }

    // Display loop
    update = () => {
        this.cx.save();
        this.cx.scale(this.zoom, this.zoom);

        this.game.activity.display.update(this);
        this.frame++;

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

    // Resize canvas
    resize = () => {
        if (innerWidth >= 1920 && innerHeight >= 1080) this.zoom = 4;
        else if (innerWidth >= 1440 && innerHeight >= 810) this.zoom = 3;
        else if (innerWidth >= 960 && innerHeight >= 540) this.zoom = 2;
        else this.zoom = 1;

        this.canvas.width = this.width * this.zoom;
        this.canvas.height = this.height * this.zoom;
        this.cx.imageSmoothingEnabled = false;
    }
}