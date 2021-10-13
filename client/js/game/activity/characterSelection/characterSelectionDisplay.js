CharacterSelection.display = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const charSelect = display.game.activity;

    // Colored Moving Background
    cx.drawImage(images.characterSelectBackBlue, 0, 0, 270, 270, 0, -270 + (charSelect.animationFrame / 8) % 270, 270, 270);
    cx.drawImage(images.characterSelectBackBlue, 0, 0, 270, 270, 0, (charSelect.animationFrame / 8) % 270, 270, 270);
    cx.drawImage(images.characterSelectBackRed, 0, 0, 270, 270, 240, 270 - (charSelect.animationFrame / 8) % 270, 270, 270);
    cx.drawImage(images.characterSelectBackRed, 0, 0, 270, 270, 240, (-charSelect.animationFrame / 8) % 270, 270, 270);

    const cursor1 = charSelect.cursors[0];
    const cursor2 = charSelect.cursors[1];
    let char1 = charSelect.selectCharacter(cursor1.pos);
    let char2 = charSelect.selectCharacter(cursor2.pos);

    // if random pick
    if (cursor1.pos.x === 1 && cursor1.pos.y === 2) {
        let randPos;
        do randPos = new Vector2D(Math.round(Math.random() * 2), Math.round(Math.random() * 4));
        while (!charSelect.selectCharacter(randPos));
        char1 = charSelect.selectCharacter(randPos);
    }
    if (cursor2.pos.x === 1 && cursor2.pos.y === 2) {
        let randPos;
        do randPos = new Vector2D(Math.round(Math.random() * 2), Math.round(Math.random() * 4));
        while (!charSelect.selectCharacter(randPos));
        char2 = charSelect.selectCharacter(randPos);
    }

    // Character Profiles
    if (char1) {
        if (cursor1.ready) {
            cx.drawImage(images['CHARACTER_' + char1.id + '_ACTIVE_PROFILE_SHADOW'], 0, 0, 202, 270, (-8 + cursor1.profileFrame), (8 - cursor1.profileFrame), (194 + cursor1.profileFrame), (278 - cursor1.profileFrame));
            cx.drawImage(images['CHARACTER_' + char1.id + '_ACTIVE_PROFILE'], 0, 0, 202, 270, (0 - cursor1.profileFrame ** 2 / 2), (0 - cursor1.profileFrame ** 2 / 2), (202 + cursor1.profileFrame ** 2), (270 + cursor1.profileFrame ** 2));
            if (cursor1.infoFrame) {
                cx.globalAlpha = cursor1.infoFrame / charSelect.cursorInfoInitFrame;
                cx.fillStyle = "#fff";
                cx.fillRect(0, 0, 240, 270);
                cx.globalAlpha = 1;
            }
        } else {
            cx.drawImage(images['CHARACTER_' + char1.id + '_PROFILE_SHADOW'], 0, 0, 202, 270, (-8 + cursor1.profileFrame), (8 - cursor1.profileFrame), (194 + cursor1.profileFrame), (278 - cursor1.profileFrame));
            cx.drawImage(images['CHARACTER_' + char1.id + '_PROFILE'], 0, 0, 202, 270, (0 - cursor1.profileFrame ** 2 / 2), (0 - cursor1.profileFrame ** 2 / 2), (202 + cursor1.profileFrame ** 2), (270 + cursor1.profileFrame ** 2));
        }
    }
    if (char2) {
        if (cursor2.ready) {
            cx.drawImage(images['CHARACTER_' + char2.id + '_ACTIVE_PROFILE_SHADOW'], 0, 0, 202, 270, (270 + cursor2.profileFrame), (8 - cursor2.profileFrame), (194 + cursor2.profileFrame), (278 - cursor2.profileFrame));
            cx.drawImage(images['CHARACTER_' + char2.id + '_ACTIVE_PROFILE'], 0, 0, 202, 270, (278 - cursor2.profileFrame ** 2 / 2), (0 - cursor2.profileFrame ** 2 / 2), (202 + cursor2.profileFrame ** 2), (270 + cursor2.profileFrame ** 2));
            if (cursor2.infoFrame) {
                cx.globalAlpha = cursor2.infoFrame / charSelect.cursorInfoInitFrame;
                cx.fillStyle = "#fff";
                cx.fillRect(240, 0, 240, 270);
                cx.globalAlpha = 1;
            }
        } else {
            cx.drawImage(images['CHARACTER_' + char2.id + '_PROFILE_SHADOW'], 0, 0, 202, 270, (270 + cursor2.profileFrame), (8 - cursor2.profileFrame), (194 + cursor2.profileFrame), (278 - cursor2.profileFrame));
            cx.drawImage(images['CHARACTER_' + char2.id + '_PROFILE'], 0, 0, 202, 270, (278 - cursor2.profileFrame ** 2 / 2), (0 - cursor2.profileFrame ** 2 / 2), (202 + cursor2.profileFrame ** 2), (270 + cursor2.profileFrame ** 2));
        }
    }

    // Player Input
    const p1Input = cursor1.player instanceof Computer ? null : images['characterSelect' + (Object.keys(display.game.players)[0] === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p1Input) cx.drawImage(p1Input, 0, 0, 16, 16, 182, 0, 16, 16);
    const p2Input = cursor2.player instanceof Computer ? null : images['characterSelect' + (Object.keys(display.game.players)[1] === 'keyboard' ? 'Keyboard' : 'Gamepad')];
    if (p2Input) cx.drawImage(p2Input, 0, 0, 16, 16, 462, 0, 16, 16);

    if (charSelect.initAnimFrame) {
        // Background 2nd Layer
        cx.drawImage(images.characterSelect, 0, 0, 480, 270, 0, 0, 480, 270);

        // Character Names
        if (char1) cx.drawImage(images['CHARACTER_' + char1.id + "_SKEWED_NAME"], 0, 0, 62, 136, (0 + cursor1.profileFrame ** 2 * 1), (0 - cursor1.profileFrame ** 2 * 4), 62, 136);
        if (char2) cx.drawImage(images['CHARACTER_' + char2.id + "_SKEWED_NAME"], 0, 0, 62, 136, (419 + cursor2.profileFrame ** 2 * 1), (134 - cursor2.profileFrame ** 2 * 4), 62, 136);

        // Background transition
        const width = charSelect.initAnimFrame / 20 > 1 ? 1 : charSelect.initAnimFrame / 20;
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, width * 240, 270);
        cx.fillRect(480 - width * 240, 0, width * 240, 270);

        // Mugshot animation
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                if (charSelect.mugshotOrder[x][y] >= charSelect.initAnimFrame) {
                    cx.drawImage(images.whiteMugshot, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
                    const char = charSelect.selectCharacter(new Vector2D(x, y));
                    if (char) cx.drawImage(charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame < 5 ? images.whiteMugshot : images['CHARACTER_' + char.id + "_MUGSHOT"], 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
                    else if (x === 1 && y === 2 && charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame >= 5) {
                        cx.drawImage(images.random2Img, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11 + Math.sin(charSelect.animationFrame * 0.05) * 2, 52, 52);
                        cx.drawImage(images.randomImg, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11 - Math.sin(charSelect.animationFrame * 0.05), 52, 52);
                    }
                    else if (charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame >= 5) cx.drawImage(images.lockImg, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
                    if (charSelect.mugshotOrder[x][y] - charSelect.initAnimFrame === 0) {
                        let se1Sound = new Sound(display.assets.sounds.se1, 1);
                        se1Sound.play();
                    }
                }
            }
        }
    } else {
        // Background 2nd Layer
        cx.drawImage(images.characterSelect, 0, 0, 480, 270, 0, 0, 480, 270);

        // Character Names
        if (char1) cx.drawImage(images['CHARACTER_' + char1.id + "_SKEWED_NAME"], 0, 0, 62, 136, (0 + cursor1.profileFrame ** 2 * 1), (0 - cursor1.profileFrame ** 2 * 4), 62, 136);
        if (char2) cx.drawImage(images['CHARACTER_' + char2.id + "_SKEWED_NAME"], 0, 0, 62, 136, (419 + cursor2.profileFrame ** 2 * 1), (134 - cursor2.profileFrame ** 2 * 4), 62, 136);

        // Informations
        cx.drawImage(images.characterSelectInfo2, 0, cursor1.ready ? 24 : 0, 72, 24, (147 + (cursor1.infoFrame / 2) ** 2 * 4), (231 + (cursor1.infoFrame / 2) ** 2 * 1), 72, 24);
        cx.drawImage(images.characterSelectInfo2, 0, cursor2.ready ? 24 : 0, 72, 24, ((cursor2.ready ? 295 : 261) - (cursor2.infoFrame / 2) ** 2 * 4), ((cursor2.ready ? 23 : 15) - (cursor2.infoFrame / 2) ** 2 * 1), 72, 24);
        cx.drawImage(images.characterSelectInfo3, 0, 0, 58, 26, (142 + (charSelect.initInfo3Frame / 2) ** 2 * 4), (244 + (charSelect.initInfo3Frame / 2) ** 2 * 1), 58, 26);
        cx.drawImage(images.characterSelectInfo3, 0, 26 * (charSelect.mode === 'Player' ? 1 : 2), 58, 26, (280 - (charSelect.initInfo3Frame / 2) ** 2 * 4), (1 - (charSelect.initInfo3Frame / 2) ** 2 * 1), 58, 26);

        // Mugshots
        for (let x = 0; x < charSelect.size.x; x++) {
            for (let y = 0; y < charSelect.size.y; y++) {
                cx.drawImage(images.whiteMugshot, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
                const char = charSelect.selectCharacter(new Vector2D(x, y));
                if (char) cx.drawImage(images['CHARACTER_' + char.id + "_MUGSHOT"], 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
                else if (x === 1 && y === 2) {
                    cx.drawImage(images.random2Img, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11 + Math.sin(charSelect.animationFrame * 0.05) * 2, 52, 52);
                    cx.drawImage(images.randomImg, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11 - Math.sin(charSelect.animationFrame * 0.05), 52, 52);
                }
                else cx.drawImage(images.lockImg, 0, 0, 52, 52, 192 + x * 44 - y * 11, 10 + y * 44 + x * 11, 52, 52);
            }
        }

        // Cursor
        [cursor1, cursor2].forEach((cursor, index) => {
            if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (!(cursor.player instanceof Computer) || cursor1.ready)))) {
                cx.drawImage(images['characterSelectP' + (index + 1)], (Math.floor(charSelect.animationFrame / 16) % 4) * 64, 0, 64, 64, 186 + cursor.pos.x * 44 - cursor.pos.y * 11, 4 + cursor.pos.y * 44 + cursor.pos.x * 11, 64, 64);
            }
        });

        // Bubble
        [cursor1, cursor2].forEach((cursor, index) => {
            if (cursor && (charSelect.mode === 'Player' || (!cursor.ready && (!(cursor.player instanceof Computer) || cursor1.ready)))) {
                cx.drawImage(images.characterSelectInfo, index * 24, 0, 24, 24, (index * 40 + 186) + cursor.pos.x * 44 - cursor.pos.y * 11, (index * 32 + 8) + cursor.pos.y * 44 + cursor.pos.x * 11, 24, 24);
            }
        });
    }

    if (![cursor1, cursor2].find(cursor => !cursor.ready || cursor.infoFrame) && charSelect.mode !== 'Training') CharacterSelection.displayStage(display);

    // Music
    if (charSelect.initAnimFrame === charSelect.initAnimInitFrame) {
        display.music = new Sound(display.assets.sounds.charSelect, 0.25);
        display.music.play();
    }
    if (charSelect.nextActivity) {
        display.music.pause();
    }
    if (display.music.audio.ended) {
        display.music.reset();
    }

    // Sound
    if (charSelect.cursors.find(cursor => !cursor.ready)) {
        const cursors = charSelect.cursors.filter(cursor => charSelect.cursors.some(cursor => !(cursor.player instanceof Computer) && !cursor.ready) ?
            !(cursor.player instanceof Computer) : cursor.player instanceof Computer);
        cursors.forEach(cursor => {
            const player = cursor.player instanceof Computer ? charSelect.cursors[0].player : cursor.player;
            if (player.inputList.frame[0].a && !player.inputList.frame[1].a &&
                charSelect.charSelected.selected && !charSelect.initAnimFrame) {
                let okSound = new Sound(display.assets.sounds.ok, 1);
                okSound.play();
                if (display.assets.sounds[`CHARACTER_${charSelect.charSelected.id}_ACTIVE_PROFILE`]) {
                    let selectedSound = new Sound(display.assets.sounds[`CHARACTER_${charSelect.charSelected.id}_ACTIVE_PROFILE`], 1);
                    selectedSound.play();
                }
            } else if (player.inputList.frame[0].b && !player.inputList.frame[1].b && !charSelect.initAnimFrame) {
                let returnSound = new Sound(display.assets.sounds.return, 1);
                returnSound.play();
            } else {
                [{ stick: 8, fixStick: [7, 8, 9], axis: "y", val: -1 }, { stick: 2, fixStick: [1, 2, 3], axis: "y", val: 1 },
                { stick: 4, fixStick: [1, 4, 7], axis: "x", val: -1 }, { stick: 6, fixStick: [3, 6, 9], axis: "x", val: 1 }].forEach(({ stick, fixStick, axis, val }) => {
                    if (player.inputList.frame[0].stick === stick && !fixStick.includes(player.inputList.frame[1].stick) && !charSelect.initAnimFrame) {
                        let selectSound = new Sound(display.assets.sounds.select, 1);
                        selectSound.play();
                    }
                });
            }
        });
    } else if (!charSelect.stageReady) {
        charSelect.cursors.filter(cursor => !(cursor.player instanceof Computer)).forEach(cursor => {
            const player = cursor.player;
            if (player.inputList.frame[0].a && !player.inputList.frame[1].a && !charSelect.initAnimFrame) {
                let okSound = new Sound(display.assets.sounds.ok, 1);
                okSound.play();
                if (display.assets.sounds[`CHARACTER_${charSelect.charSelected.id}_ACTIVE_PROFILE`]) {
                    let selectedSound = new Sound(display.assets.sounds[`CHARACTER_${charSelect.charSelected.id}_ACTIVE_PROFILE`], 1);
                    selectedSound.play();
                }
            }
            else if (player.inputList.frame[0].b && !player.inputList.frame[1].b && !charSelect.stageReady && !charSelect.initAnimFrame) {
                let returnSound = new Sound(display.assets.sounds.return, 1);
                returnSound.play();
            } else {
                [{ stick: 8, fixStick: [7, 8, 9], val: -1 }, { stick: 2, fixStick: [1, 2, 3], val: 1 }].forEach(({ stick, fixStick, val }) => {
                    if (player.inputList.frame[0].stick === stick && !fixStick.includes(player.inputList.frame[1].stick) && !charSelect.stageReady && !charSelect.initAnimFrame) {
                        let selectSound = new Sound(display.assets.sounds.select, 1);
                        selectSound.play();
                    }
                });
            }
        });
    }

    // Transition
    if (charSelect.endAnimFrame) display.fadeEffect('#000', charSelect.endAnimFrame, charSelect.endAnimEndFrame);
}

CharacterSelection.displayStage = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const charSelect = display.game.activity;

    if (charSelect.stageFrame) {
        cx.globalAlpha = 1 / charSelect.stageFrame;
        for (let i = -2; i < 3; i++) {
            const id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            cx.drawImage(images['s' + id + 'preview'], 0, 0, display.width, 54, 0, (i + 2) * 54 - charSelect.stageFrame ** 2, display.width, 54);
        }
        cx.fillStyle = '#0008';
        cx.fillRect(0, 0, display.width, display.height);
        cx.drawImage(images.stageSelect, 0, 0, display.width, display.height, 0 - charSelect.stageFrame ** 2, 0 - charSelect.stageFrame ** 2, display.width + charSelect.stageFrame ** 2 * 2, display.height + charSelect.stageFrame ** 2 * 2);
        cx.drawImage(images['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'], 0, 0, display.width, 54, 0, 2 * 54 - charSelect.stageFrame ** 2, display.width, 54);
        cx.globalAlpha = 1;
    } else {
        for (let i = -3; i < 4; i++) {
            const id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            cx.drawImage(images['s' + id + 'preview'], 0, 0, display.width, 54, 0, (i + 2) * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1), display.width, 54);
        }
        cx.fillStyle = '#0008';
        cx.fillRect(0, 0, display.width, display.height);
        cx.drawImage(images.stageSelect, 0, 0, display.width, display.height, 0, 0, display.width, display.height);
        cx.drawImage(images['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'], 0, 0, display.width, 54, 0, 2 * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1), display.width, 54);
        cx.drawImage(images.stageSelectCursor, 16 * (Math.floor(charSelect.animationFrame / 8) % 6), 0, 16, 54, 320, 108, 16, 54);
    }
}