class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 1;
        this.debugMode = true;

        this.game = game;

        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");

        this.update = () => {
            var game = this.game;
            switch(game.gameState){
                case game.gameStateEnum.MAINMENU:
                    this.displayMainMenu();
                case game.gameStateEnum.CHARACTERSELECTION:
                    this.displayCharacterSelection();
                case game.gameStateEnum.FIGHT:
                    this.displayFight();
                case game.gameStateEnum.ENDMENU:
                    this.displayEndMenu();
            }
            this.frame++;
        }

        this.displayMainMenu = () => {
            this.cx.fillStyle = '#080';
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )
        }

        this.displayEndMenu = () => {
            this.cx.fillStyle = '#800';
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )
        }
        
        this.displayCharacterSelection = () => {
            this.cx.fillStyle = '#008';
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )
        }

        this.displayFight = () => {
            this.cx.fillStyle = '#088';
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )
        }

        this.flipHorizontally = around => {
            this.cx.translate(around, 0);
            this.cx.scale(-1, 1);
            this.cx.translate(-around, 0);
        }

        this.resize = () => {
            if (innerWidth >= 1920 && innerHeight >= 1080) {
                this.zoom = 4;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 1920;
                this.canvas.height = 1080;
            } else if (innerWidth >= 1440 && innerHeight >= 810) {
                this.zoom = 3;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 1440;
                this.canvas.height = 810;
            } else if (innerWidth >= 960 && innerHeight >= 540) {
                this.zoom = 2;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 960;
                this.canvas.height = 540;
            } else {
                this.zoom = 1;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 480;
                this.canvas.height = 270;
            }
            this.cx.imageSmoothingEnabled = false;
        }

        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.appendChild(this.canvas);
    }
}