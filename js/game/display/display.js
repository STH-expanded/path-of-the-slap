class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 1;
        this.debugMode = true;

        this.game = game;

        this.assets = new Assets();
        this.GUI = new GUI();
        this.characterSelectionDisplay = new CharacterSelectionDisplay();

        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext('2d');

        this.update = () => {
            switch (this.game.activity.constructor) {
                case Menu:
                    this.displayMenu(this.game.activity);
                    break;
                case CharacterSelection:
                    this.characterSelectionDisplay.update(this);
                    break;
                case Fight:
                    this.displayFight();
                    break;
                default:
                    break;
            }
            this.frame++;
        };

        this.displayMenu = menu => {
            this.cx.fillStyle = '#114';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom)

            
            menu.options.forEach((option, index) => {
                option += option === 'Player' && this.game.players.length < 2 ? 'Disabled' : '';
                this.cx.drawImage(this.assets['btn' + option], 0, 0, 128, 32, 176 * this.zoom, (84 + 32 * index) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                if (this.game.activity.cursor === index) {
                    this.cx.drawImage(this.assets.menucursor, 0, 0, 128, 32, 176 * this.zoom, (84 + 32 * index) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
            });
            
            // Transitions
            if (menu.initAnimFrame) this.fadeEffect('#000', menu.initAnimFrame, menu.initAnimInitFrame);
            if (menu.endAnimFrame) this.fadeEffect('#000', menu.endAnimFrame, menu.endAnimEndFrame);
        };

        this.displayFight = () => {

            // Background
            this.cx.drawImage(this.assets.layer0, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer1, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            // Players
            var player1 = this.game.activity.player1.character;
            var player2 = this.game.activity.player2.character;

            if (this.debugMode) {
                this.cx.fillStyle = '#00f';
                this.cx.globalAlpha = 0.5;
                this.cx.fillRect(player1.pos.x * this.zoom, player1.pos.y * this.zoom, player1.size.x * this.zoom, player1.size.y * this.zoom);
                this.cx.fillRect(player2.pos.x * this.zoom, player2.pos.y * this.zoom, player2.size.x * this.zoom, player2.size.y * this.zoom);
                this.cx.globalAlpha = 1;
            }

            // Foreground
            this.cx.drawImage(this.assets.layer2, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer3, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            // GUI
            this.GUI.update(this);
        };

        this.flipHorizontally = around => {
            this.cx.translate(around, 0);
            this.cx.scale(-1, 1);
            this.cx.translate(-around, 0);
        };

        this.fadeEffect = (color, frame, MaxFrame) => {
            this.cx.fillStyle = color;
            this.cx.globalAlpha = frame / MaxFrame;
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom
            );
            this.cx.globalAlpha = 1;
        };

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
        };

        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.appendChild(this.canvas);
    }
}