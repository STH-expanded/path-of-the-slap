class CharacterSelectionDisplay extends ActivityDisplay {}
CharacterSelectionDisplay.update = display => {
    var charSelect = display.game.activity;

    // Colored Moving Background
    display.cx.drawImage(
        display.assets.images.characterSelectBackBlue,
        0, 0,
        270, 270,
        0,
        (-270 + (display.frame / 8) % 270),
        270,
        270
    );
    display.cx.drawImage(
        display.assets.images.characterSelectBackBlue,
        0, 0,
        270, 270,
        0,
        ((display.frame / 8) % 270),
        270,
        270
    );

    display.cx.drawImage(
        display.assets.images.characterSelectBackRed,
        0, 0,
        270, 270,
        240,
        (270 - (display.frame / 8) % 270),
        270,
        270
    );
    display.cx.drawImage(
        display.assets.images.characterSelectBackRed,
        0, 0,
        270, 270,
        240,
        ((-display.frame / 8) % 270),
        270,
        270
    );

    var cursor1 = charSelect.cursors[0];
    var cursor2 = charSelect.cursors[1];

    var character1 = charSelect.selectCharacter(cursor1.pos);
    var character2 = charSelect.selectCharacter(cursor2.pos);

    // if random pick
    if (cursor1.pos.x === 1 && cursor1.pos.y === 2) {
        var randPos;
        do {
            randPos = new Vector2D(
                Math.round(Math.random() * 2),
                Math.round(Math.random() * 4),
            );
        } while (!charSelect.selectCharacter(randPos, null));
        character1 = charSelect.selectCharacter(randPos);
    }
    if (cursor2.pos.x === 1 && cursor2.pos.y === 2) {
        var randPos;
        do {
            randPos = new Vector2D(
                Math.round(Math.random() * 2),
                Math.round(Math.random() * 4),
            );
        } while (!charSelect.selectCharacter(randPos, null));
        character2 = charSelect.selectCharacter(randPos);
    }

    // Character Profiles
    if (character1) {
        if (cursor1.ready) {
            display.cx.drawImage(
                display.assets.images['cp' + character1.id + 'activeShadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame),
                (8 - cursor1.profileFrame),
                (194 + cursor1.profileFrame),
                (278 - cursor1.profileFrame)
            );
            display.cx.drawImage(
                display.assets.images['cp' + character1.id + 'active'],
                0, 0,
                202, 270,
                (0 - cursor1.profileFrame ** 2 / 2),
                (0 - cursor1.profileFrame ** 2 / 2),
                (202 + cursor1.profileFrame ** 2),
                (270 + cursor1.profileFrame ** 2)
            );
            if (cursor1.infoFrame) {
                display.cx.globalAlpha = cursor1.infoFrame / charSelect.cursorInfoInitFrame;
                display.cx.fillStyle = "#fff";
                display.cx.fillRect(0, 0, 240, 270);
                display.cx.globalAlpha = 1;
            }
        } else {
            display.cx.drawImage(
                display.assets.images['cp' + character1.id + 'shadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame),
                (8 - cursor1.profileFrame),
                (194 + cursor1.profileFrame),
                (278 - cursor1.profileFrame)
            );
            display.cx.drawImage(
                display.assets.images['cp' + character1.id],
                0, 0,
                202, 270,
                (0 - cursor1.profileFrame ** 2 / 2),
                (0 - cursor1.profileFrame ** 2 / 2),
                (202 + cursor1.profileFrame ** 2),
                (270 + cursor1.profileFrame ** 2)
            );
        }
    }
    if (character2) {
        if (cursor2.ready) {
            display.cx.drawImage(
                display.assets.images['cp' + character2.id + 'activeShadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame),
                (8 - cursor2.profileFrame),
                (194 + cursor2.profileFrame),
                (278 - cursor2.profileFrame)
            );
            display.cx.drawImage(
                display.assets.images['cp' + character2.id + 'active'],
                0, 0,
                202, 270,
                (278 - cursor2.profileFrame ** 2 / 2),
                (0 - cursor2.profileFrame ** 2 / 2),
                (202 + cursor2.profileFrame ** 2),
                (270 + cursor2.profileFrame ** 2)
            );
            if (cursor2.infoFrame) {
                display.cx.globalAlpha = cursor2.infoFrame / charSelect.cursorInfoInitFrame;
                display.cx.fillStyle = "#fff";
                display.cx.fillRect(240, 0, 240, 270);
                display.cx.globalAlpha = 1;
            }
        } else {
            display.cx.drawImage(
                display.assets.images['cp' + character2.id + 'shadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame),
                (8 - cursor2.profileFrame),
                (194 + cursor2.profileFrame),
                (278 - cursor2.profileFrame)
            );
            display.cx.drawImage(
                display.assets.images['cp' + character2.id],
                0, 0,
                202, 270,
                (278 - cursor2.profileFrame ** 2 / 2),
                (0 - cursor2.profileFrame ** 2 / 2),
                (202 + cursor2.profileFrame ** 2),
                (270 + cursor2.profileFrame ** 2)
            );
        }
    }

    // Player Input
    var p1Input = cursor1.player.id === 'computer' ? null : display.assets.images['characterSelect' + (cursor1.player.id === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p1Input) {
        display.cx.drawImage(
            p1Input,
            0, 0,
            16, 16,
            182,
            0,
            16,
            16
        );
    }
    var p2Input = cursor2.player.id === 'computer' ? null : display.assets.images['characterSelect' + (cursor2.player.id === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p2Input) {
        display.cx.drawImage(
            p2Input,
            0, 0,
            16, 16,
            462,
            0,
            16,
            16
        );
    }

    if (charSelect.initAnimFrame) {
        // Background 2nd Layer
        display.cx.drawImage(
            display.assets.images.characterSelect,
            0, 0,
            480, 270,
            0,
            0,
            480,
            270
        );

        // Character Names
        if (character1) {
            display.cx.drawImage(
                display.assets.images['cn' + character1.id],
                0, 0,
                62, 136,
                (0 + cursor1.profileFrame ** 2 * 1),
                (0 - cursor1.profileFrame ** 2 * 4),
                62,
                136
            );
        }
        if (character2) {
            display.cx.drawImage(
                display.assets.images['cn' + character2.id],
                0, 0,
                62, 136,
                (419 + cursor2.profileFrame ** 2 * 1),
                (134 - cursor2.profileFrame ** 2 * 4),
                62,
                136
            );
        }

        // Background transition
        var width = charSelect.initAnimFrame / 20 > 1 ? 1 : charSelect.initAnimFrame / 20;
        display.cx.fillStyle = '#000';
        display.cx.fillRect(
            0,
            0,
            width * 240,
            270
        );
        display.cx.fillRect(
            (480 - width * 240),
            0,
            width * 240,
            270
        );

        // Mugshot animation
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                    display.cx.drawImage(
                        display.assets.images.whiteMugshot,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11,
                        52,
                        52
                    );
                    var character = charSelect.selectCharacter(new Vector2D(x, y));
                    if (character) {
                        var mugshotImg = charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? display.assets.images.whiteMugshot : display.assets.images['cm' + character.id];
                        display.cx.drawImage(
                            mugshotImg,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11,
                            52,
                            52
                        );
                    }
                    else if (x === 1 && y === 2 && charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame >= 5) {
                        display.cx.drawImage(
                            display.assets.images.random2Img,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11 + Math.sin(display.frame * 0.05) * 2,
                            52,
                            52
                        );
                        display.cx.drawImage(
                            display.assets.images.randomImg,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11 - Math.sin(display.frame * 0.05),
                            52,
                            52
                        );
                    }
                    else if (charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame >= 5) {
                        display.cx.drawImage(
                            display.assets.images.lockImg,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11,
                            52,
                            52
                        );
                    }
                }
            }
        }
    } else {

        // Background 2nd Layer
        display.cx.drawImage(
            display.assets.images.characterSelect,
            0, 0,
            480, 270,
            0,
            0,
            480,
            270
        );

        // Character Names
        if (character1) {
            display.cx.drawImage(
                display.assets.images['cn' + character1.id],
                0, 0,
                62, 136,
                (0 + cursor1.profileFrame ** 2 * 1),
                (0 - cursor1.profileFrame ** 2 * 4),
                62,
                136
            );
        }
        if (character2) {
            display.cx.drawImage(
                display.assets.images['cn' + character2.id],
                0, 0,
                62, 136,
                (419 + cursor2.profileFrame ** 2 * 1),
                (134 - cursor2.profileFrame ** 2 * 4),
                62,
                136
            );
        }

        // Informations
        display.cx.drawImage(
            display.assets.images.characterSelectInfo2,
            0, cursor1.ready ? 24 : 0,
            72, 24,
            (147 + (cursor1.infoFrame / 2) ** 2 * 4),
            (231 + (cursor1.infoFrame / 2) ** 2 * 1),
            72,
            24
        );
        display.cx.drawImage(
            display.assets.images.characterSelectInfo2,
            0, cursor2.ready ? 24 : 0,
            72, 24,
            ((cursor2.ready ? 295 : 261) - (cursor2.infoFrame / 2) ** 2 * 4),
            ((cursor2.ready ? 23 : 15) - (cursor2.infoFrame / 2) ** 2 * 1),
            72,
            24
        );

        display.cx.drawImage(
            display.assets.images.characterSelectInfo3,
            0, 0,
            58, 26,
            (142 + (charSelect.initInfo3Frame / 2) ** 2 * 4),
            (244 + (charSelect.initInfo3Frame / 2) ** 2 * 1),
            58,
            26
        );
        var info3multiplier = charSelect.mode === 'Player' ? 1 : 2;
        display.cx.drawImage(
            display.assets.images.characterSelectInfo3,
            0, 26 * info3multiplier,
            58, 26,
            (280 - (charSelect.initInfo3Frame / 2) ** 2 * 4),
            (1 - (charSelect.initInfo3Frame / 2) ** 2 * 1),
            58,
            26
        );

        // Mugshots
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                display.cx.drawImage(
                    display.assets.images.whiteMugshot,
                    0, 0,
                    52, 52,
                    192 + x * 44 - y * 11,
                    10 + y * 44 + x * 11,
                    52,
                    52
                );
                var character = charSelect.selectCharacter(new Vector2D(x, y));
                if (character) {
                    display.cx.drawImage(
                        display.assets.images['cm' + character.id],
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11,
                        52,
                        52
                    );
                }
                else if (x === 1 && y === 2) {
                    display.cx.drawImage(
                        display.assets.images.random2Img,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11 + Math.sin(display.frame * 0.05) * 2,
                        52,
                        52
                    );
                    display.cx.drawImage(
                        display.assets.images.randomImg,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11 - Math.sin(display.frame * 0.05),
                        52,
                        52
                    );
                }
                else {
                    display.cx.drawImage(
                        display.assets.images.lockImg,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11,
                        52,
                        52
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
                    display.assets.images['characterSelectP' + (index + 1)],
                    (Math.floor(frameSpeed) % frameMax) * 64, 0,
                    64, 64,
                    186 + cursor.pos.x * 44 - cursor.pos.y * 11,
                    4 + cursor.pos.y * 44 + cursor.pos.x * 11,
                    64, 64
                );
            }
        });

        // Bubble
        [cursor1, cursor2].forEach((cursor, index) => {
            if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (cursor.player.id !== 'computer' || cursor1.ready)))) {
                display.cx.drawImage(
                    display.assets.images.characterSelectInfo,
                    index * 24, 0,
                    24, 24,
                    (index * 40 + 186) + cursor.pos.x * 44 - cursor.pos.y * 11,
                    (index * 32 + 8) + cursor.pos.y * 44 + cursor.pos.x * 11,
                    24, 24
                );
            }
        });
    }

    if (![cursor1, cursor2].find(cursor => !cursor.ready || cursor.infoFrame) && charSelect.mode !== 'Training') StageSelectionDisplay.update(display);

    // Transition
    if (charSelect.endAnimFrame) display.fadeEffect('#000', charSelect.endAnimFrame, charSelect.endAnimEndFrame);
}