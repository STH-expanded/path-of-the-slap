class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 1;
        this.debugMode = true;

        this.game = game;

        this.GUI = new GUI();

        this.characterSelect = document.createElement('img');
        this.characterSelect.src = 'img/characterSelect.png';
        this.characterSelectP1 = document.createElement('img');
        this.characterSelectP1.src = 'img/charSelectCursorP1.png';
        this.characterSelectP2 = document.createElement('img');
        this.characterSelectP2.src = 'img/charSelectCursorP2.png';
        this.characterSelectCPU = document.createElement('img');
        this.characterSelectCPU.src = 'img/charSelectCursorCPU.png';
        this.btnRematch = document.createElement('img');
        this.btnRematch.src = 'img/btnrematch.png';
        this.btnvsplayer = document.createElement('img');
        this.btnvsplayer.src = 'img/btnvsplayer.png';
        this.btnvsplayerdisabled = document.createElement('img');
        this.btnvsplayerdisabled.src = 'img/btnvsplayerdisabled.png';
        this.btnvscomputer = document.createElement('img');
        this.btnvscomputer.src = 'img/btnvscomputer.png';
        this.btnpractice = document.createElement('img');
        this.btnpractice.src = 'img/btnpractice.png';
        this.btnreturntomenu = document.createElement('img');
        this.btnreturntomenu.src = 'img/btnreturntomenu.png';
        this.btncharacterselection = document.createElement('img');
        this.btncharacterselection.src = 'img/btncharacterselection.png';
        this.menucursor = document.createElement('img');
        this.menucursor.src = 'img/menucursor.png';
        this.layer0 = document.createElement("img");
        this.layer0.src = "img/layer0.png";
        this.layer1 = document.createElement("img");
        this.layer1.src = "img/layer1.png";
        this.layer2 = document.createElement("img");
        this.layer2.src = "img/layer2.png";
        this.layer3 = document.createElement("img");
        this.layer3.src = "img/layer3.png";

        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext('2d');

        this.update = () => {
            switch (this.game.gameState) {
                case this.game.gameStateEnum.MAINMENU:
                    this.displayMainMenu();
                    break;
                case this.game.gameStateEnum.CHARACTERSELECTION:
                    this.displayCharacterSelection();
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
            this.cx.fillStyle = 'green';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.game.menuOptionList.forEach(() => {
                switch (this.game.menuOptionList[this.game.mainMenuCursor]) {
                    case 'playerVSplayer':
                        this.cx.drawImage(this.menucursor, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                        break;
                    case 'playerVScomputer':
                        this.cx.drawImage(this.menucursor, 0, 0, 128, 32, 176 * this.zoom, 118 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                        break;
                    case 'training':
                        this.cx.drawImage(this.menucursor, 0, 0, 128, 32, 176 * this.zoom, 152 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                        break;
                }
                if (this.game.players.length < 2) {
                    this.cx.drawImage(this.btnvsplayerdisabled, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                } else {
                    this.cx.drawImage(this.btnvsplayer, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
                this.cx.drawImage(this.btnvscomputer, 0, 0, 128, 32, 176 * this.zoom, 118 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                this.cx.drawImage(this.btnpractice, 0, 0, 128, 32, 176 * this.zoom, 152 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            });
        };

        this.displayEndMenu = () => {
            this.cx.fillStyle = 'yellow';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.cx.drawImage(this.btnRematch, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.btncharacterselection, 0, 0, 128, 32, 176 * this.zoom, 118 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.btnreturntomenu, 0, 0, 128, 32, 176 * this.zoom, 152 * this.zoom, 128 * this.zoom, 32 * this.zoom);

            this.game.endMenuOptionList.forEach((option, index) => {
                if (this.game.endMenuOptionList[this.game.endMenuCursor] === option) {
                    this.cx.fillStyle = 'red';
                } else {
                    this.cx.fillStyle = 'black';
                }
            });
        };

        this.displayCharacterSelection = () => {
            var charSelect = this.game.characterSelection;
            this.cx.fillStyle = 'orange';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.characterSelect, 0, 0, 480, 270, 0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            if (charSelect) {
                for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                    for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                        if (charSelect.cursor.equals(new Vector2D(x, y))) {
                            var characterSelectImg = null;
                            if (charSelect.playerController === 0) {
                                if (charSelect.mode !== 'playerVSplayer' && charSelect.player1) {
                                    characterSelectImg = this.characterSelectCPU;
                                } else {
                                    characterSelectImg = this.characterSelectP1;
                                }
                            } else if (charSelect.playerController === 1) {
                                characterSelectImg = this.characterSelectP2;
                            }

                            this.cx.drawImage(characterSelectImg, 0, 0, 52, 52, 192 * this.zoom + x * 44 * this.zoom - y * 11 * this.zoom, 10 * this.zoom + y * 44 * this.zoom + x * 11 * this.zoom, 52 * this.zoom, 52 * this.zoom);
                        }
                    }
                }

                if (charSelect.player1Pos) {
                    this.cx.drawImage(this.characterSelectP1, 0, 0, 52, 52, 192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom, 10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom, 52 * this.zoom, 52 * this.zoom);
                }
                if (charSelect.player2Pos) {
                    var img = charSelect.mode === 'playerVSplayer' ? this.characterSelectP2 : this.characterSelectCPU;
                    this.cx.drawImage(img, 0, 0, 52, 52, 192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom, 10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom, 52 * this.zoom, 52 * this.zoom);
                }
            }
        };

        this.displayFight = () => {
            this.cx.drawImage(this.layer0,
                0, 0,
                480, 270,
                0, 0,
                480 * this.zoom,
                270 * this.zoom
            );
            this.cx.drawImage(this.layer1,
                0, 0,
                480, 270,
                0, 0,
                480 * this.zoom,
                270 * this.zoom
            );

            var player1 = this.game.fight.player1.character;
            var player2 = this.game.fight.player2.character;

            this.cx.fillStyle = 'blue';
            this.cx.fillRect(player1.pos.x * this.zoom, player1.pos.y * this.zoom, player1.size.x * this.zoom, player1.size.y * this.zoom);
            this.cx.fillStyle = 'green';
<<<<<<< HEAD
            this.cx.fillRect(player2.pos.x * this.zoom, player2.pos.y * this.zoom, player2.size.x * this.zoom, player2.size.y * this.zoom);
=======
            this.cx.fillRect(
                player2.pos.x * this.zoom,
                player2.pos.y * this.zoom,
                player2.size.x * this.zoom,
                player2.size.y * this.zoom
            );

            this.cx.drawImage(this.layer2,
                0, 0,
                480, 270,
                0, 0,
                480 * this.zoom,
                270 * this.zoom
            );
            this.cx.drawImage(this.layer3,
                0, 0,
                480, 270,
                0, 0,
                480 * this.zoom,
                270 * this.zoom
            );

>>>>>>> 05a80d859f8d32d52654f1439319e55f03570fdc
            this.GUI.update(this.game.fight, this.cx, this.zoom);
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
