class CharacterSelectionDisplay {
    constructor() {
        this.update = display => {

            // Colored Background
            display.cx.drawImage(
                display.assets.characterSelectBackBlue,
                0, 0,
                270, 270,
                0 * display.zoom,
                (-270 + (display.frame / 8) % 270) * display.zoom,
                270 * display.zoom,
                270 * display.zoom
            );
            display.cx.drawImage(
                display.assets.characterSelectBackBlue,
                0, 0,
                270, 270,
                0 * display.zoom,
                ((display.frame / 8) % 270) * display.zoom,
                270 * display.zoom,
                270 * display.zoom
            );

            display.cx.drawImage(
                display.assets.characterSelectBackRed,
                0, 0,
                270, 270,
                240 * display.zoom,
                (270 - (display.frame / 8) % 270) * display.zoom,
                270 * display.zoom,
                270 * display.zoom
            );
            display.cx.drawImage(
                display.assets.characterSelectBackRed,
                0, 0,
                270, 270,
                240 * display.zoom,
                ((-display.frame / 8) % 270) * display.zoom,
                270 * display.zoom,
                270 * display.zoom
            );

            var charSelect = display.game.characterSelection;
            if (charSelect) {
                if (charSelect.initAnimFrame) {
                    // Background animation
                    var width = charSelect.initAnimFrame / 20 > 1 ? 1 : charSelect.initAnimFrame / 20;
                    display.cx.fillStyle = '#000';
                    display.cx.fillRect(
                        0 * display.zoom,
                        0 * display.zoom,
                        width * 240 * display.zoom,
                        270 * display.zoom
                    );
                    display.cx.fillRect(
                        (480 - width * 240) * display.zoom,
                        0 * display.zoom,
                        width * 240 * display.zoom,
                        270 * display.zoom
                    );

                    // Background 2nd Layer
                    display.cx.drawImage(
                        display.assets.characterSelect,
                        0, 0,
                        480, 270,
                        0 * display.zoom,
                        0 * display.zoom,
                        480 * display.zoom,
                        270 * display.zoom
                    );

                    // Mugshot animation
                    for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                        for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                            if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                                var character = charSelect.selectCharacter(new Vector2D(x, y));
                                if (character) {
                                    var mugshotImg = charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? display.assets.whiteMugshot : display.assets[character.mugshotImg];
                                    display.cx.drawImage(
                                        mugshotImg,
                                        0, 0,
                                        52, 52,
                                        192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                                        10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                                        52 * display.zoom,
                                        52 * display.zoom
                                    );
                                }
                                else {
                                    display.cx.drawImage(
                                        display.assets.whiteMugshot,
                                        0, 0,
                                        52, 52,
                                        192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                                        10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                                        52 * display.zoom,
                                        52 * display.zoom
                                    );
                                }
                            }
                        }
                    }
                } else {
                    var player1 = charSelect.player1Pos ? charSelect.player1Pos : charSelect.cursor;
                    var player2 = charSelect.player2Pos ? charSelect.player2Pos : charSelect.player1Pos ? charSelect.cursor : null;

                    // Character Profiles
                    var characterP1 = charSelect.selectCharacter(new Vector2D(player1.x, player1.y));
                    if (characterP1) {
                        display.cx.drawImage(
                            display.assets[characterP1.profileImg],
                            0, 0,
                            202, 270,
                            0 * display.zoom,
                            0 * display.zoom,
                            202 * display.zoom,
                            270 * display.zoom
                        );
                    }
                    var characterP2 = player2 ? charSelect.selectCharacter(new Vector2D(player2.x, player2.y)) : charSelect.selectCharacter(new Vector2D(2, 2));
                    if (characterP2) {
                        display.cx.drawImage(
                            display.assets[characterP2.profileImg],
                            0, 0,
                            202, 270,
                            278 * display.zoom,
                            0 * display.zoom,
                            202 * display.zoom,
                            270 * display.zoom
                        );
                    }

                    // Background 2nd Layer
                    display.cx.drawImage(
                        display.assets.characterSelect,
                        0, 0,
                        480, 270,
                        0 * display.zoom,
                        0 * display.zoom,
                        480 * display.zoom,
                        270 * display.zoom
                    );

                    // Informations
                    if (charSelect.player1Pos) {
                        display.cx.drawImage(
                            display.assets.characterSelectInfo2,
                            0, 24,
                            72, 24,
                            150 * display.zoom,
                            236 * display.zoom,
                            72 * display.zoom,
                            24 * display.zoom
                        );
                    } else {
                        display.cx.drawImage(
                            display.assets.characterSelectInfo2,
                            0, 0,
                            72, 24,
                            150 * display.zoom,
                            236 * display.zoom,
                            72 * display.zoom,
                            24 * display.zoom
                        );
                    }
                    if (charSelect.player2Pos) {
                        display.cx.drawImage(
                            display.assets.characterSelectInfo2,
                            0, 24,
                            72, 24,
                            292 * display.zoom,
                            18 * display.zoom,
                            72 * display.zoom,
                            24 * display.zoom
                        );
                    } else {
                        display.cx.drawImage(
                            display.assets.characterSelectInfo2,
                            0, 0,
                            72, 24,
                            258 * display.zoom,
                            10 * display.zoom,
                            72 * display.zoom,
                            24 * display.zoom
                        );
                    }

                    // Mugshots
                    for (let x = 0; x < charSelect.cursorLimit.x; x++) {
                        for (let y = 0; y < charSelect.cursorLimit.y; y++) {
                            var character = charSelect.selectCharacter(new Vector2D(x, y));
                            if (character) {
                                display.cx.drawImage(
                                    display.assets[character.mugshotImg],
                                    0, 0,
                                    52, 52,
                                    192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                                    10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                                    52 * display.zoom,
                                    52 * display.zoom
                                );
                            }
                            else {
                                display.cx.drawImage(
                                    display.assets.whiteMugshot,
                                    0, 0,
                                    52, 52,
                                    192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                                    10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                                    52 * display.zoom,
                                    52 * display.zoom
                                );
                            }
                        }
                    }

                    // Cursor
                    [player1, player2].forEach((player, index) => {
                        if (player) {
                            var frameMax = 4;
                            var frameSpeed = display.frame / 16;
                            display.cx.drawImage(
                                display.assets['characterSelectP' + (index + 1)],
                                (Math.floor(frameSpeed) % frameMax) * 64, 0,
                                64, 64,
                                186 * display.zoom + player.x * 44 * display.zoom - player.y * 11 * display.zoom,
                                4 * display.zoom + player.y * 44 * display.zoom + player.x * 11 * display.zoom,
                                64 * display.zoom, 64 * display.zoom
                            );
                        }
                    });

                    // Bubble
                    [player1, player2].forEach((player, index) => {
                        if (player) {
                            display.cx.drawImage(
                                display.assets.characterSelectInfo,
                                index * 24, 0,
                                24, 24,
                                (index * 40 + 186) * display.zoom + player.x * 44 * display.zoom - player.y * 11 * display.zoom,
                                (index * 32 + 8) * display.zoom + player.y * 44 * display.zoom + player.x * 11 * display.zoom,
                                24 * display.zoom, 24 * display.zoom
                            );
                        }
                    });
                }

                if (charSelect.endAnimFrame) {

                    // Transition
                    display.cx.fillStyle = '#000';
                    display.cx.globalAlpha = charSelect.endAnimFrame / charSelect.endAnimEndFrame;
                    display.cx.fillRect(
                        0 * display.zoom,
                        0 * display.zoom,
                        480 * display.zoom,
                        270 * display.zoom
                    );
                    display.cx.globalAlpha = 1;
                }
            }
        }
    }
}