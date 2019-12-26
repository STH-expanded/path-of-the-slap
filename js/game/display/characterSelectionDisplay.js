class CharacterSelectionDisplay {
    constructor() {
        this.update = display => {

            // Colored Moving Background
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

            var charSelect = display.game.activity;
            var cursor1 = charSelect.cursors[0];
            var cursor2 = charSelect.cursors[1];

            // Character Profiles
            var character1 = charSelect.selectCharacter(cursor1.pos);
            if (character1) {
                display.cx.drawImage(
                    display.assets[character1.profileImg],
                    0, 0,
                    202, 270,
                    0 * display.zoom,
                    0 * display.zoom,
                    202 * display.zoom,
                    270 * display.zoom
                );
            }
            var character2 = charSelect.selectCharacter(cursor2.pos);
            if (character2) {
                display.cx.drawImage(
                    display.assets[character2.profileImg],
                    0, 0,
                    202, 270,
                    278 * display.zoom,
                    0 * display.zoom,
                    202 * display.zoom,
                    270 * display.zoom
                );
            }

            if (charSelect.initAnimFrame) {
                // Background transition
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
                for (let x = 0; x < charSelect.size.x; x++) {
                    for (let y = 0; y < charSelect.size.y; y++) {
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
                            } else {
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
                if (cursor1.ready) {
                    display.cx.drawImage(
                        display.assets.characterSelectInfo2,
                        0, 24,
                        72, 24,
                        147 * display.zoom,
                        231 * display.zoom,
                        72 * display.zoom,
                        24 * display.zoom
                    );
                } else {
                    display.cx.drawImage(
                        display.assets.characterSelectInfo2,
                        0, 0,
                        72, 24,
                        147 * display.zoom,
                        231 * display.zoom,
                        72 * display.zoom,
                        24 * display.zoom
                    );
                }
                if (cursor2.ready) {
                    display.cx.drawImage(
                        display.assets.characterSelectInfo2,
                        0, 24,
                        72, 24,
                        295 * display.zoom,
                        23 * display.zoom,
                        72 * display.zoom,
                        24 * display.zoom
                    );
                } else {
                    display.cx.drawImage(
                        display.assets.characterSelectInfo2,
                        0, 0,
                        72, 24,
                        261 * display.zoom,
                        15 * display.zoom,
                        72 * display.zoom,
                        24 * display.zoom
                    );
                }

                display.cx.drawImage(
                    display.assets.characterSelectInfo3,
                    0, 0,
                    58, 26,
                    142 * display.zoom,
                    244 * display.zoom,
                    58 * display.zoom,
                    26 * display.zoom
                );
                var info3multiplier = charSelect.mode === 'Player' ? 1 : 2;
                display.cx.drawImage(
                    display.assets.characterSelectInfo3,
                    0, 26 * info3multiplier,
                    58, 26,
                    280 * display.zoom,
                    1 * display.zoom,
                    58 * display.zoom,
                    26 * display.zoom
                );

                // Mugshots
                for (let x = 0; x < charSelect.size.x; x++) {
                    for (let y = 0; y < charSelect.size.y; y++) {
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
                        } else {
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
                [cursor1, cursor2].forEach((cursor, index) => {
                    if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (cursor.player.id !== 'computer' || cursor1.ready)))) {
                        var frameMax = 4;
                        var frameSpeed = display.frame / 16;
                        display.cx.drawImage(
                            display.assets['characterSelectP' + (index + 1)],
                            (Math.floor(frameSpeed) % frameMax) * 64, 0,
                            64, 64,
                            186 * display.zoom + cursor.pos.x * 44 * display.zoom - cursor.pos.y * 11 * display.zoom,
                            4 * display.zoom + cursor.pos.y * 44 * display.zoom + cursor.pos.x * 11 * display.zoom,
                            64 * display.zoom, 64 * display.zoom
                        );
                    }
                });

                // Bubble
                [cursor1, cursor2].forEach((cursor, index) => {
                    if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (cursor.player.id !== 'computer' || cursor1.ready)))) {
                        display.cx.drawImage(
                            display.assets.characterSelectInfo,
                            index * 24, 0,
                            24, 24,
                            (index * 40 + 186) * display.zoom + cursor.pos.x * 44 * display.zoom - cursor.pos.y * 11 * display.zoom,
                            (index * 32 + 8) * display.zoom + cursor.pos.y * 44 * display.zoom + cursor.pos.x * 11 * display.zoom,
                            24 * display.zoom, 24 * display.zoom
                        );
                    }
                });
            }

            // Transition
            if (charSelect.endAnimFrame) display.fadeEffect('#000', charSelect.endAnimFrame, charSelect.endAnimEndFrame);
        }
    }
}