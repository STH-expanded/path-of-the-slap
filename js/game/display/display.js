class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 1;
        this.debugMode = true;

        this.game = game;

        this.characterSelect = document.createElement("img");
        this.characterSelect.src = "img/characterSelect.png";
        this.characterSelectP1 = document.createElement("img");
        this.characterSelectP1.src = "img/charSelectCursorP1.png";
        this.characterSelectP2 = document.createElement("img");
        this.characterSelectP2.src = "img/charSelectCursorP2.png";
        this.characterSelectCPU = document.createElement("img");
        this.characterSelectCPU.src = "img/charSelectCursorCPU.png";

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
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )

            this.cx.fillStyle = 'black';
            this.cx.font = '20px serif';
            this.cx.fillText("Main Menu", 25 * this.zoom, 25 * this.zoom);

            this.game.menuOptionList.forEach((option, index) => {
                if (this.game.menuOptionList[this.game.mainMenuCursor] === option) {
                    this.cx.fillStyle = 'red';
                } else {
                    this.cx.fillStyle = 'black';
                }
                this.cx.font = '16px serif';
                this.cx.fillText(option, (450 * this.zoom) / 2, ((270 * this.zoom) / 2) + 20 * index);
            });
        }

        this.displayEndMenu = () => {
            this.cx.fillStyle = 'yellow';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.cx.fillStyle = 'black';
            this.cx.font = '20px serif';
            this.cx.fillText("End Menu", 25 * this.zoom, 25 * this.zoom);

            this.game.endMenuOptionList.forEach((option, index) => {
                if (this.game.endMenuOptionList[this.game.endMenuCursor] === option) {
                    this.cx.fillStyle = 'red';
                } else {
                    this.cx.fillStyle = 'black';
                }
                this.cx.font = '16px serif';
                this.cx.fillText(option, (450 * this.zoom) / 2, ((270 * this.zoom) / 2) + 20 * index);
            });
        };

        this.displayCharacterSelection = () => {
            var charSelect = this.game.characterSelection;
            this.cx.fillStyle = 'orange';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(
                this.characterSelect,
                0, 0,
                480, 270,
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom
            )

            if (charSelect) {
                for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                    for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                        if (charSelect.cursor.equals(new Vector2D(x, y))) {
                            var characterSelectImg = null;
                            if (charSelect.playerController === 0) {
                                if (charSelect.mode !== 'playerVSplayer' && charSelect.player1) {
                                    characterSelectImg = this.characterSelectCPU;
                                }
                                else {
                                    characterSelectImg = this.characterSelectP1;
                                }
                            }
                            else if (charSelect.playerController === 1) {
                                characterSelectImg = this.characterSelectP2;
                            }

                            this.cx.drawImage(characterSelectImg,
                                0, 0,
                                52, 52,
                                192 * this.zoom + x * 44 * this.zoom - y * 11 * this.zoom,
                                10 * this.zoom + y * 44 * this.zoom + x * 11 * this.zoom,
                                52 * this.zoom,
                                52 * this.zoom
                            );
                        }
                    }
                }
                
                if (charSelect.player1Pos) {
                    this.cx.drawImage(this.characterSelectP1,
                        0, 0,
                        52, 52,
                        192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom,
                        10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom,
                        52 * this.zoom,
                        52 * this.zoom
                    );
                }
                if (charSelect.player2Pos) {
                    var img = charSelect.mode === 'playerVSplayer' ? this.characterSelectP2 : this.characterSelectCPU;
                    this.cx.drawImage(img,
                        0, 0,
                        52, 52,
                        192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom,
                        10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom,
                        52 * this.zoom,
                        52 * this.zoom
                    );
                }
            }
        };

        this.displayFight = () => {
            this.cx.fillStyle = 'red';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.cx.fillStyle = 'black';
            this.cx.font = '20px serif';
            this.cx.fillText("Fight", 25 * this.zoom, 25 * this.zoom);

            var player1 = this.game.fight.player1.character;
            var player2 = this.game.fight.player2.character;

            this.cx.fillStyle = 'blue';
            this.cx.fillRect(
                player1.pos.x * this.zoom,
                player1.pos.y * this.zoom,
                player1.size.x * this.zoom,
                player1.size.y * this.zoom
            );
            this.cx.fillStyle = 'green';
            this.cx.fillRect(
                player2.pos.x * this.zoom,
                player2.pos.y * this.zoom,
                player2.size.x * this.zoom,
                player2.size.y * this.zoom
            );
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