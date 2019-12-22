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
            this.cx.fillStyle = '#0080FF';
            this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 240 * this.zoom, 270 * this.zoom);
            this.cx.fillStyle = '#F38B11';
            this.cx.fillRect(240 * this.zoom, 0 * this.zoom, 240 * this.zoom, 270 * this.zoom);

            var charSelect = this.game.characterSelection;
            if (charSelect) {
                if (charSelect.initAnimFrame) {
                    // Background animation
                    var width = charSelect.initAnimFrame / 20 > 1 ? 1 : charSelect.initAnimFrame / 20;
                    this.cx.fillStyle = '#000';
                    this.cx.fillRect(
                        0 * this.zoom,
                        0 * this.zoom,
                        width * 240 * this.zoom,
                        270 * this.zoom
                    );
                    this.cx.fillRect(
                        (480 - width * 240) * this.zoom,
                        0 * this.zoom,
                        width * 240 * this.zoom,
                        270 * this.zoom
                    );
                    
                    // Background 2nd Layer
                    this.cx.drawImage(
                        this.assets.characterSelect,
                        0, 0,
                        480, 270,
                        0 * this.zoom,
                        0 * this.zoom,
                        480 * this.zoom,
                        270 * this.zoom
                    );

                    // Mugshot animation
                    for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                        for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                            if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                                var character = charSelect.selectCharacter(new Vector2D(x, y));
                                if (character) {
                                    var mugshotImg = charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? this.assets.whiteMugshot : this.assets[character.mugshotImg];
                                    this.cx.drawImage(
                                        mugshotImg,
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
                    }
                } else {
                    var player1 = charSelect.player1Pos ? charSelect.player1Pos : charSelect.cursor;
                    var player2 = charSelect.player2Pos ? charSelect.player2Pos : charSelect.player1Pos ? charSelect.cursor : null;

                    // Character Profiles
                    if (player1) {
                        var characterP1 = charSelect.selectCharacter(new Vector2D(player1.x, player1.y));
                        if (characterP1) {
                            this.cx.drawImage(
                                this.assets[characterP1.profileImg],
                                0, 0,
                                202, 270,
                                0 * this.zoom,
                                0 * this.zoom,
                                202 * this.zoom,
                                270 * this.zoom
                            );
                        }
                    }
                    if (player2) {
                        var characterP2 = charSelect.selectCharacter(new Vector2D(player2.x, player2.y));
                        if (characterP2) {
                            this.cx.drawImage(
                                this.assets[characterP2.profileImg],
                                0, 0,
                                202, 270,
                                278 * this.zoom,
                                0 * this.zoom,
                                202 * this.zoom,
                                270 * this.zoom
                            );
                        }
                    }

                    // Background 2nd Layer
                    this.cx.drawImage(
                        this.assets.characterSelect,
                        0, 0,
                        480, 270,
                        0 * this.zoom,
                        0 * this.zoom,
                        480 * this.zoom,
                        270 * this.zoom
                    );

                    // Mugshots
                    for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                        for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                            var character = charSelect.selectCharacter(new Vector2D(x, y));
                            if (character) {
                                this.cx.drawImage(
                                    this.assets[character.mugshotImg],
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

                    // Cursor
                    [player1, player2].forEach((player, index) => {
                        if (player) {
                            var frameMax = 4;
                            var frameSpeed = this.frame / 16;
                            this.cx.drawImage(
                                this.assets['characterSelectP' + (index + 1)],
                                (Math.floor(frameSpeed) % frameMax) * 64, 0,
                                64, 64,
                                186 * this.zoom + player.x * 44 * this.zoom - player.y * 11 * this.zoom,
                                4 * this.zoom + player.y * 44 * this.zoom + player.x * 11 * this.zoom,
                                64 * this.zoom, 64 * this.zoom
                            );
                        }
                    });

                    // Bubble
                    [player1, player2].forEach((player, index) => {
                        if (player) {
                            this.cx.drawImage(
                                this.assets.characterSelectInfo,
                                index * 24, 0,
                                24, 24,
                                (index * 40 + 186) * this.zoom + player.x * 44 * this.zoom - player.y * 11 * this.zoom,
                                (index * 32 + 8) * this.zoom + player.y * 44 * this.zoom + player.x * 11 * this.zoom,
                                24 * this.zoom, 24 * this.zoom
                            );
                        }
                    });
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