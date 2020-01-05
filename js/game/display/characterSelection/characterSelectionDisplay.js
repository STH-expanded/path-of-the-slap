class CharacterSelectionDisplay extends ActivityDisplay {}
CharacterSelectionDisplay.update = display => {
    var charSelect = display.game.activity;

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

    var cursor1 = charSelect.cursors[0];
    var cursor2 = charSelect.cursors[1];

    var character1 = charSelect.selectCharacter(cursor1.pos);
    var character2 = charSelect.selectCharacter(cursor2.pos);

    // Character Profiles
    if (character1) {
        if (cursor1.ready) {
            display.cx.drawImage(
                display.assets['cp' + character1.id + 'activeShadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame) * display.zoom,
                (8 - cursor1.profileFrame) * display.zoom,
                (194 + cursor1.profileFrame) * display.zoom,
                (278 - cursor1.profileFrame) * display.zoom
            );
            display.cx.drawImage(
                display.assets['cp' + character1.id + 'active'],
                0, 0,
                202, 270,
                (0 - Math.pow(cursor1.profileFrame, 2) / 2) * display.zoom,
                (0 - Math.pow(cursor1.profileFrame, 2) / 2) * display.zoom,
                (202 + Math.pow(cursor1.profileFrame, 2)) * display.zoom,
                (270 + Math.pow(cursor1.profileFrame, 2)) * display.zoom
            );
            if (cursor1.infoFrame) {
                display.cx.globalAlpha = cursor1.infoFrame / charSelect.cursorInfoInitFrame;
                display.cx.fillStyle = "#fff";
                display.cx.fillRect(0, 0, 240 * display.zoom, 270 * display.zoom);
                display.cx.globalAlpha = 1;
            }
        } else {
            display.cx.drawImage(
                display.assets['cp' + character1.id + 'shadow'],
                0, 0,
                202, 270,
                (-8 + cursor1.profileFrame) * display.zoom,
                (8 - cursor1.profileFrame) * display.zoom,
                (194 + cursor1.profileFrame) * display.zoom,
                (278 - cursor1.profileFrame) * display.zoom
            );
            display.cx.drawImage(
                display.assets['cp' + character1.id],
                0, 0,
                202, 270,
                (0 - Math.pow(cursor1.profileFrame, 2) / 2) * display.zoom,
                (0 - Math.pow(cursor1.profileFrame, 2) / 2) * display.zoom,
                (202 + Math.pow(cursor1.profileFrame, 2)) * display.zoom,
                (270 + Math.pow(cursor1.profileFrame, 2)) * display.zoom
            );
        }
    }
    if (character2) {
        if (cursor2.ready) {
            display.cx.drawImage(
                display.assets['cp' + character2.id + 'activeShadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame) * display.zoom,
                (8 - cursor2.profileFrame) * display.zoom,
                (194 + cursor2.profileFrame) * display.zoom,
                (278 - cursor2.profileFrame) * display.zoom
            );
            display.cx.drawImage(
                display.assets['cp' + character2.id + 'active'],
                0, 0,
                202, 270,
                (278 - Math.pow(cursor2.profileFrame, 2) / 2) * display.zoom,
                (0 - Math.pow(cursor2.profileFrame, 2) / 2) * display.zoom,
                (202 + Math.pow(cursor2.profileFrame, 2)) * display.zoom,
                (270 + Math.pow(cursor2.profileFrame, 2)) * display.zoom
            );
            if (cursor2.infoFrame) {
                display.cx.globalAlpha = cursor2.infoFrame / charSelect.cursorInfoInitFrame;
                display.cx.fillStyle = "#fff";
                display.cx.fillRect(240 * display.zoom, 0, 240 * display.zoom, 270 * display.zoom);
                display.cx.globalAlpha = 1;
            }
        } else {
            display.cx.drawImage(
                display.assets['cp' + character2.id + 'shadow'],
                0, 0,
                202, 270,
                (270 + cursor2.profileFrame) * display.zoom,
                (8 - cursor2.profileFrame) * display.zoom,
                (194 + cursor2.profileFrame) * display.zoom,
                (278 - cursor2.profileFrame) * display.zoom
            );
            display.cx.drawImage(
                display.assets['cp' + character2.id],
                0, 0,
                202, 270,
                (278 - Math.pow(cursor2.profileFrame, 2) / 2) * display.zoom,
                (0 - Math.pow(cursor2.profileFrame, 2) / 2) * display.zoom,
                (202 + Math.pow(cursor2.profileFrame, 2)) * display.zoom,
                (270 + Math.pow(cursor2.profileFrame, 2)) * display.zoom
            );
        }
    }

    // Player Input
    var p1Input = cursor1.player.id === 'computer' ? null : display.assets['characterSelect' + (cursor1.player.id === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p1Input) {
        display.cx.drawImage(
            p1Input,
            0, 0,
            16, 16,
            182 * display.zoom,
            0 * display.zoom,
            16 * display.zoom,
            16 * display.zoom
        );
    }
    var p2Input = cursor2.player.id === 'computer' ? null : display.assets['characterSelect' + (cursor2.player.id === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p2Input) {
        display.cx.drawImage(
            p2Input,
            0, 0,
            16, 16,
            462 * display.zoom,
            0 * display.zoom,
            16 * display.zoom,
            16 * display.zoom
        );
    }

    if (charSelect.initAnimFrame) {
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

        // Character Names
        if (character1) {
            display.cx.drawImage(
                display.assets['cn' + character1.id],
                0, 0,
                62, 136,
                (0 + Math.pow(cursor1.profileFrame, 2) * 1) * display.zoom,
                (0 - Math.pow(cursor1.profileFrame, 2) * 4) * display.zoom,
                62 * display.zoom,
                136 * display.zoom
            );
        }
        if (character2) {
            display.cx.drawImage(
                display.assets['cn' + character2.id],
                0, 0,
                62, 136,
                (419 + Math.pow(cursor2.profileFrame, 2) * 1) * display.zoom,
                (134 - Math.pow(cursor2.profileFrame, 2) * 4) * display.zoom,
                62 * display.zoom,
                136 * display.zoom
            );
        }

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

        // Mugshot animation
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                    display.cx.drawImage(
                        display.assets.whiteMugshot,
                        0, 0,
                        52, 52,
                        192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                        10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                        52 * display.zoom,
                        52 * display.zoom
                    );
                    var character = charSelect.selectCharacter(new Vector2D(x, y));
                    if (character) {
                        var mugshotImg = charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? display.assets.whiteMugshot : display.assets['cm' + character.id];
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

        // Character Names
        if (character1) {
            display.cx.drawImage(
                display.assets['cn' + character1.id],
                0, 0,
                62, 136,
                (0 + Math.pow(cursor1.profileFrame, 2) * 1) * display.zoom,
                (0 - Math.pow(cursor1.profileFrame, 2) * 4) * display.zoom,
                62 * display.zoom,
                136 * display.zoom
            );
        }
        if (character2) {
            display.cx.drawImage(
                display.assets['cn' + character2.id],
                0, 0,
                62, 136,
                (419 + Math.pow(cursor2.profileFrame, 2) * 1) * display.zoom,
                (134 - Math.pow(cursor2.profileFrame, 2) * 4) * display.zoom,
                62 * display.zoom,
                136 * display.zoom
            );
        }

        // Informations
        display.cx.drawImage(
            display.assets.characterSelectInfo2,
            0, cursor1.ready ? 24 : 0,
            72, 24,
            (147 + Math.pow(cursor1.infoFrame / 2, 2) * 4) * display.zoom,
            (231 + Math.pow(cursor1.infoFrame / 2, 2) * 1) * display.zoom,
            72 * display.zoom,
            24 * display.zoom
        );
        display.cx.drawImage(
            display.assets.characterSelectInfo2,
            0, cursor2.ready ? 24 : 0,
            72, 24,
            ((cursor2.ready ? 295 : 261) - Math.pow(cursor2.infoFrame / 2, 2) * 4) * display.zoom,
            ((cursor2.ready ? 23 : 15) - Math.pow(cursor2.infoFrame / 2, 2) * 1) * display.zoom,
            72 * display.zoom,
            24 * display.zoom
        );

        display.cx.drawImage(
            display.assets.characterSelectInfo3,
            0, 0,
            58, 26,
            (142 + Math.pow(charSelect.initInfo3Frame / 2, 2) * 4) * display.zoom,
            (244 + Math.pow(charSelect.initInfo3Frame / 2, 2) * 1) * display.zoom,
            58 * display.zoom,
            26 * display.zoom
        );
        var info3multiplier = charSelect.mode === 'Player' ? 1 : 2;
        display.cx.drawImage(
            display.assets.characterSelectInfo3,
            0, 26 * info3multiplier,
            58, 26,
            (280 - Math.pow(charSelect.initInfo3Frame / 2, 2) * 4) * display.zoom,
            (1 - Math.pow(charSelect.initInfo3Frame / 2, 2) * 1) * display.zoom,
            58 * display.zoom,
            26 * display.zoom
        );

        // Mugshots
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                display.cx.drawImage(
                    display.assets.whiteMugshot,
                    0, 0,
                    52, 52,
                    192 * display.zoom + x * 44 * display.zoom - y * 11 * display.zoom,
                    10 * display.zoom + y * 44 * display.zoom + x * 11 * display.zoom,
                    52 * display.zoom,
                    52 * display.zoom
                );
                var character = charSelect.selectCharacter(new Vector2D(x, y));
                if (character) {
                    display.cx.drawImage(
                        display.assets['cm' + character.id],
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

    if (![cursor1, cursor2].find(cursor => !cursor.ready || cursor.infoFrame)) StageSelectionDisplay.update(display);

    // Transition
    if (charSelect.endAnimFrame) display.fadeEffect('#000', charSelect.endAnimFrame, charSelect.endAnimEndFrame);
}