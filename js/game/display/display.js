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
            switch (this.game.gameState) {
                case this.game.gameStateEnum.MAINMENU:
                    this.displayMainMenu();
                    break;
                case this.game.gameStateEnum.CHARACTERSELECTION:
                    this.characterSelectionDisplay.update(this);
                    break;
                case this.game.gameStateEnum.FIGHT:
                    this.displayFight();
                    break;
                case this.game.gameStateEnum.ENDMENU:
                    this.displayEndMenu();
                    break;
                default:
                    break;
            }
            this.frame++;
        };

        this.displayMainMenu = () => {
            this.cx.fillStyle = '#114';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom)

            var vsplayerBtn = this.game.players.length < 2 ? this.assets.btnvsplayerdisabled : this.assets.btnvsplayer;
            this.cx.drawImage(vsplayerBtn, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btnvscomputer, 0, 0, 128, 32, 176 * this.zoom, 116 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btnpractice, 0, 0, 128, 32, 176 * this.zoom, 148 * this.zoom, 128 * this.zoom, 32 * this.zoom);

            for (let i = 0; i < this.game.menuOptionList.length; i++) {
                if (this.game.mainMenuCursor === i) {
                    this.cx.drawImage(this.assets.menucursor, 0, 0, 128, 32, 176 * this.zoom, (84 + i * 32) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
            }
        };

        this.displayEndMenu = () => {
            this.cx.fillStyle = '#114';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.cx.drawImage(this.assets.btnRematch, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btncharacterselection, 0, 0, 128, 32, 176 * this.zoom, 116 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btnreturntomenu, 0, 0, 128, 32, 176 * this.zoom, 148 * this.zoom, 128 * this.zoom, 32 * this.zoom);

            for (let i = 0; i < this.game.endMenuOptionList.length; i++) {
                if (this.game.endMenuCursor === i) {
                    this.cx.drawImage(this.assets.menucursor, 0, 0, 128, 32, 176 * this.zoom, (84 + i * 32) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
            }
        };

        this.displayFight = () => {
            this.cx.drawImage(this.assets.layer0, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer1, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            var player1 = this.game.fight.player1.character;
            var player2 = this.game.fight.player2.character;

            this.cx.fillStyle = 'blue';
            this.cx.fillRect(player1.pos.x * this.zoom, player1.pos.y * this.zoom, player1.size.x * this.zoom, player1.size.y * this.zoom);
            this.cx.fillStyle = 'red';
            this.cx.fillRect(player2.pos.x * this.zoom, player2.pos.y * this.zoom, player2.size.x * this.zoom, player2.size.y * this.zoom);

            this.cx.drawImage(this.assets.layer2, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer3, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            this.GUI.update(this);
        };

        this.flipHorizontally = around => {
            this.cx.translate(around, 0);
            this.cx.scale(-1, 1);
            this.cx.translate(-around, 0);
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