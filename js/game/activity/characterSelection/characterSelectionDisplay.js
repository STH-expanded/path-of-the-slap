class CharacterSelectionDisplay extends ActivityDisplay {}
CharacterSelectionDisplay.update = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const charSelect = display.game.activity;

    // Colored Moving Background
    cx.drawImage(
        images.characterSelectBackBlue,
        0, 0,
        270, 270,
        0,
        (-270 + (display.frame / 8) % 270),
        270,
        270
    );
    cx.drawImage(
        images.characterSelectBackBlue,
        0, 0,
        270, 270,
        0,
        ((display.frame / 8) % 270),
        270,
        270
    );

    cx.drawImage(
        images.characterSelectBackRed,
        0, 0,
        270, 270,
        240,
        (270 - (display.frame / 8) % 270),
        270,
        270
    );
    cx.drawImage(
        images.characterSelectBackRed,
        0, 0,
        270, 270,
        240,
        ((-display.frame / 8) % 270),
        270,
        270
    );

    const cursor1 = charSelect.cursors[0];
    const cursor2 = charSelect.cursors[1];

    let Character1 = charSelect.selectCharacter(cursor1.pos);
    let Character2 = charSelect.selectCharacter(cursor2.pos);

    // if random pick
    if (cursor1.pos.x === 1 && cursor1.pos.y === 2) {
        let randPos;
        do {
            randPos = new Vector2D(
                Math.round(Math.random() * 2),
                Math.round(Math.random() * 4),
            );
        } while (!charSelect.selectCharacter(randPos));
        Character1 = charSelect.selectCharacter(randPos);
    }
    if (cursor2.pos.x === 1 && cursor2.pos.y === 2) {
        let randPos;
        do {
            randPos = new Vector2D(
                Math.round(Math.random() * 2),
                Math.round(Math.random() * 4),
            );
        } while (!charSelect.selectCharacter(randPos));
        Character2 = charSelect.selectCharacter(randPos);
    }

    // Character Profiles
    if (Character1) {
        if (cursor1.ready) {
            cx.drawImage(
                images['cp' + Character1.id + 'activeShadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame),
                (8 - cursor1.profileFrame),
                (194 + cursor1.profileFrame),
                (278 - cursor1.profileFrame)
            );
            cx.drawImage(
                images['cp' + Character1.id + 'active'],
                0, 0,
                202, 270,
                (0 - cursor1.profileFrame ** 2 / 2),
                (0 - cursor1.profileFrame ** 2 / 2),
                (202 + cursor1.profileFrame ** 2),
                (270 + cursor1.profileFrame ** 2)
            );
            if (cursor1.infoFrame) {
                cx.globalAlpha = cursor1.infoFrame / charSelect.cursorInfoInitFrame;
                cx.fillStyle = "#fff";
                cx.fillRect(0, 0, 240, 270);
                cx.globalAlpha = 1;
            }
        } else {
            cx.drawImage(
                images['cp' + Character1.id + 'shadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame),
                (8 - cursor1.profileFrame),
                (194 + cursor1.profileFrame),
                (278 - cursor1.profileFrame)
            );
            cx.drawImage(
                images['cp' + Character1.id],
                0, 0,
                202, 270,
                (0 - cursor1.profileFrame ** 2 / 2),
                (0 - cursor1.profileFrame ** 2 / 2),
                (202 + cursor1.profileFrame ** 2),
                (270 + cursor1.profileFrame ** 2)
            );
        }
    }
    if (Character2) {
        if (cursor2.ready) {
            cx.drawImage(
                images['cp' + Character2.id + 'activeShadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame),
                (8 - cursor2.profileFrame),
                (194 + cursor2.profileFrame),
                (278 - cursor2.profileFrame)
            );
            cx.drawImage(
                images['cp' + Character2.id + 'active'],
                0, 0,
                202, 270,
                (278 - cursor2.profileFrame ** 2 / 2),
                (0 - cursor2.profileFrame ** 2 / 2),
                (202 + cursor2.profileFrame ** 2),
                (270 + cursor2.profileFrame ** 2)
            );
            if (cursor2.infoFrame) {
                cx.globalAlpha = cursor2.infoFrame / charSelect.cursorInfoInitFrame;
                cx.fillStyle = "#fff";
                cx.fillRect(240, 0, 240, 270);
                cx.globalAlpha = 1;
            }
        } else {
            cx.drawImage(
                images['cp' + Character2.id + 'shadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame),
                (8 - cursor2.profileFrame),
                (194 + cursor2.profileFrame),
                (278 - cursor2.profileFrame)
            );
            cx.drawImage(
                images['cp' + Character2.id],
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
    const p1Input = cursor1.player instanceof Computer ? null : images['characterSelect' + (Object.keys(display.game.players)[0] === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p1Input) {
        cx.drawImage(
            p1Input,
            0, 0,
            16, 16,
            182,
            0,
            16,
            16
        );
    }
    const p2Input = cursor2.player instanceof Computer ? null : images['characterSelect' + (Object.keys(display.game.players)[1]  === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p2Input) {
        cx.drawImage(
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
        cx.drawImage(
            images.characterSelect,
            0, 0,
            480, 270,
            0,
            0,
            480,
            270
        );

        // Character Names
        if (Character1) {
            cx.drawImage(
                images['cn' + Character1.id],
                0, 0,
                62, 136,
                (0 + cursor1.profileFrame ** 2 * 1),
                (0 - cursor1.profileFrame ** 2 * 4),
                62,
                136
            );
        }
        if (Character2) {
            cx.drawImage(
                images['cn' + Character2.id],
                0, 0,
                62, 136,
                (419 + cursor2.profileFrame ** 2 * 1),
                (134 - cursor2.profileFrame ** 2 * 4),
                62,
                136
            );
        }

        // Background transition
        const width = charSelect.initAnimFrame / 20 > 1 ? 1 : charSelect.initAnimFrame / 20;
        cx.fillStyle = '#000';
        cx.fillRect(
            0,
            0,
            width * 240,
            270
        );
        cx.fillRect(
            (480 - width * 240),
            0,
            width * 240,
            270
        );

        // Mugshot animation
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                    cx.drawImage(
                        images.whiteMugshot,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11,
                        52,
                        52
                    );
                    const Character = charSelect.selectCharacter(new Vector2D(x, y));
                    if (Character) {
                        const mugshotImg = charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? images.whiteMugshot : images['cm' + Character.id];
                        cx.drawImage(
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
                        cx.drawImage(
                            images.random2Img,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11 + Math.sin(display.frame * 0.05) * 2,
                            52,
                            52
                        );
                        cx.drawImage(
                            images.randomImg,
                            0, 0,
                            52, 52,
                            192 + x * 44 - y * 11,
                            10 + y * 44 + x * 11 - Math.sin(display.frame * 0.05),
                            52,
                            52
                        );
                    }
                    else if (charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame >= 5) {
                        cx.drawImage(
                            images.lockImg,
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
        cx.drawImage(
            images.characterSelect,
            0, 0,
            480, 270,
            0,
            0,
            480,
            270
        );

        // Character Names
        if (Character1) {
            cx.drawImage(
                images['cn' + Character1.id],
                0, 0,
                62, 136,
                (0 + cursor1.profileFrame ** 2 * 1),
                (0 - cursor1.profileFrame ** 2 * 4),
                62,
                136
            );
        }
        if (Character2) {
            cx.drawImage(
                images['cn' + Character2.id],
                0, 0,
                62, 136,
                (419 + cursor2.profileFrame ** 2 * 1),
                (134 - cursor2.profileFrame ** 2 * 4),
                62,
                136
            );
        }

        // Informations
        cx.drawImage(
            images.characterSelectInfo2,
            0, cursor1.ready ? 24 : 0,
            72, 24,
            (147 + (cursor1.infoFrame / 2) ** 2 * 4),
            (231 + (cursor1.infoFrame / 2) ** 2 * 1),
            72,
            24
        );
        cx.drawImage(
            images.characterSelectInfo2,
            0, cursor2.ready ? 24 : 0,
            72, 24,
            ((cursor2.ready ? 295 : 261) - (cursor2.infoFrame / 2) ** 2 * 4),
            ((cursor2.ready ? 23 : 15) - (cursor2.infoFrame / 2) ** 2 * 1),
            72,
            24
        );

        cx.drawImage(
            images.characterSelectInfo3,
            0, 0,
            58, 26,
            (142 + (charSelect.initInfo3Frame / 2) ** 2 * 4),
            (244 + (charSelect.initInfo3Frame / 2) ** 2 * 1),
            58,
            26
        );
        const info3multiplier = charSelect.mode === 'Player' ? 1 : 2;
        cx.drawImage(
            images.characterSelectInfo3,
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
                cx.drawImage(
                    images.whiteMugshot,
                    0, 0,
                    52, 52,
                    192 + x * 44 - y * 11,
                    10 + y * 44 + x * 11,
                    52,
                    52
                );
                const Character = charSelect.selectCharacter(new Vector2D(x, y));
                if (Character) {
                    cx.drawImage(
                        images['cm' + Character.id],
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11,
                        52,
                        52
                    );
                }
                else if (x === 1 && y === 2) {
                    cx.drawImage(
                        images.random2Img,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11 + Math.sin(display.frame * 0.05) * 2,
                        52,
                        52
                    );
                    cx.drawImage(
                        images.randomImg,
                        0, 0,
                        52, 52,
                        192 + x * 44 - y * 11,
                        10 + y * 44 + x * 11 - Math.sin(display.frame * 0.05),
                        52,
                        52
                    );
                }
                else {
                    cx.drawImage(
                        images.lockImg,
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
            if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (!(cursor.player instanceof Computer) || cursor1.ready)))) {
                const frameMax = 4;
                const frameSpeed = display.frame / 16;
                cx.drawImage(
                    images['characterSelectP' + (index + 1)],
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
            if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (!(cursor.player instanceof Computer) || cursor1.ready)))) {
                cx.drawImage(
                    images.characterSelectInfo,
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