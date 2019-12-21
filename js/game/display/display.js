class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 1;
        this.debugMode = true;

        this.game = game;

        this.assets = new Assets();
        this.GUI = new GUI();

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
            this.cx.fillStyle = 'lime';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.game.menuOptionList.forEach((menuOption, index) => {
                if (game.mainMenuCursor === index) {
                    this.cx.drawImage(this.assets.menucursor, 0, 0, 128, 32, 176 * this.zoom, (84 + index * 32) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
                if (this.game.players.length < 2) {
                    this.cx.drawImage(this.assets.btnvsplayerdisabled, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                } else {
                    this.cx.drawImage(this.assets.btnvsplayer, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
                this.cx.drawImage(this.assets.btnvscomputer, 0, 0, 128, 32, 176 * this.zoom, 116 * this.zoom, 128 * this.zoom, 32 * this.zoom);
                this.cx.drawImage(this.assets.btnpractice, 0, 0, 128, 32, 176 * this.zoom, 148 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            });
        };

        this.displayEndMenu = () => {
            this.cx.fillStyle = 'yellow';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            this.cx.drawImage(this.assets.btnRematch, 0, 0, 128, 32, 176 * this.zoom, 84 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btncharacterselection, 0, 0, 128, 32, 176 * this.zoom, 116 * this.zoom, 128 * this.zoom, 32 * this.zoom);
            this.cx.drawImage(this.assets.btnreturntomenu, 0, 0, 128, 32, 176 * this.zoom, 148 * this.zoom, 128 * this.zoom, 32 * this.zoom);

            this.game.endMenuOptionList.forEach((option, index) => {
                if (this.game.endMenuOptionList[this.game.endMenuCursor] === option) {
                    this.cx.drawImage(this.assets.menucursor, 0, 0, 128, 32, 176 * this.zoom, (84 + index * 32) * this.zoom, 128 * this.zoom, 32 * this.zoom);
                }
            });
        };

        this.displayCharacterSelection = () => {
            this.cx.fillStyle = 'red';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

            var charSelect = this.game.characterSelection;
            if (charSelect) {
                
                if (charSelect.player1Pos) {
                    this.cx.drawImage(
                        this.assets['cp' + charSelect.player1Pos.y + '' + charSelect.player1Pos.x],
                        0, 0,
                        202, 270,
                        0 * this.zoom,
                        0 * this.zoom,
                        202 * this.zoom,
                        270 * this.zoom
                    );
                }
                if (charSelect.player2Pos) {
                    this.cx.drawImage(
                        this.assets['cp' + charSelect.player2Pos.y + '' + charSelect.player2Pos.x],
                        0, 0,
                        202, 270,
                        278 * this.zoom,
                        0 * this.zoom,
                        202 * this.zoom,
                        270 * this.zoom
                    );
                }

                for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                    for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                        if (charSelect.cursor.equals(new Vector2D(x, y))) {
                            if (charSelect.playerController === 0) {
                                if (charSelect.mode !== 'playerVSplayer' && charSelect.player1) {
                                    this.cx.drawImage(
                                        this.assets['cp' + y + '' + x],
                                        0, 0,
                                        202, 270,
                                        278 * this.zoom,
                                        0 * this.zoom,
                                        202 * this.zoom,
                                        270 * this.zoom
                                    );
                                } else {
                                    this.cx.drawImage(
                                        this.assets['cp' + y + '' + x],
                                        0, 0,
                                        202, 270,
                                        0 * this.zoom,
                                        0 * this.zoom,
                                        202 * this.zoom,
                                        270 * this.zoom
                                    );
                                }
                            } else if (charSelect.playerController === 1) {
                                this.cx.drawImage(
                                    this.assets['cp' + y + '' + x],
                                    0, 0,
                                    202, 270,
                                    278 * this.zoom,
                                    0 * this.zoom,
                                    202 * this.zoom,
                                    270 * this.zoom
                                );
                            }
                        }
                    }
                }
                for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                    for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                        
                        this.cx.drawImage(
                            this.assets['cm' + y + '' + x],
                            0, 0,
                            52, 52,
                            192 * this.zoom + x * 44 * this.zoom - y * 11 * this.zoom,
                            10 * this.zoom + y * 44 * this.zoom + x * 11 * this.zoom,
                            52 * this.zoom,
                            52 * this.zoom
                        );

                        if (charSelect.cursor.equals(new Vector2D(x, y))) {
                            var characterSelectImg = null;
                            if (charSelect.playerController === 0) {
                                if (charSelect.mode !== 'playerVSplayer' && charSelect.player1) {
                                    characterSelectImg = this.assets.characterSelectCPU;
                                } else {
                                    characterSelectImg = this.assets.characterSelectP1;
                                }
                            } else if (charSelect.playerController === 1) {
                                characterSelectImg = this.assets.characterSelectP2;
                            }

                            this.cx.drawImage(
                                characterSelectImg,
                                0, 0,
                                52, 52,
                                192 * this.zoom + x * 44 * this.zoom - y * 11 * this.zoom,
                                10 * this.zoom + y * 44 * this.zoom + x * 11 * this.zoom,
                                52 * this.zoom, 52 * this.zoom
                            );
                        }
                    }
                }

                if (charSelect.player1Pos) {
                    this.cx.drawImage(
                        this.assets.characterSelectP1,
                        0, 0,
                        52, 52,
                        192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom,
                        10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom,
                        52 * this.zoom, 52 * this.zoom
                    );
                }
                if (charSelect.player2Pos) {
                    var img = charSelect.mode === 'playerVSplayer' ? this.assets.characterSelectP2 : this.assets.characterSelectCPU;
                    this.cx.drawImage(
                        img,
                        0, 0,
                        52, 52,
                        192 * this.zoom + charSelect.player1Pos.x * 44 * this.zoom - charSelect.player1Pos.y * 11 * this.zoom,
                        10 * this.zoom + charSelect.player1Pos.y * 44 * this.zoom + charSelect.player1Pos.x * 11 * this.zoom,
                        52 * this.zoom, 52 * this.zoom
                    );
                }
            }
            this.cx.drawImage(this.assets.characterSelect, 0, 0, 480, 270, 0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);
        };

        this.displayFight = () => {
            this.cx.drawImage(this.assets.layer0, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer1, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            var player1 = this.game.fight.player1.character;
            var player2 = this.game.fight.player2.character;

            this.cx.fillStyle = 'blue';
            this.cx.fillRect(player1.pos.x * this.zoom, player1.pos.y * this.zoom, player1.size.x * this.zoom, player1.size.y * this.zoom);
            this.cx.fillStyle = 'green';
            this.cx.fillRect(player2.pos.x * this.zoom, player2.pos.y * this.zoom, player2.size.x * this.zoom, player2.size.y * this.zoom);

            this.cx.drawImage(this.assets.layer2, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);
            this.cx.drawImage(this.assets.layer3, 0, 0, 480, 270, 0, 0, 480 * this.zoom, 270 * this.zoom);

            this.GUI.update(this.game.fight, this);
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
