Fight.display = display => {
    const cx = display.cx;
    const fight = display.game.activity;

    const char1 = fight.players[0].character;
    const char2 = fight.players[1].character;

    // let isTraining = false;

    cx.fillStyle = '#000';
    cx.fillRect(0, 0, display.width, display.height);

    // Viewport
    const view = { xOffset: (char1.collisionBox.center().x + char2.collisionBox.center().x) / 2 - display.width / 2 + Math.cos(fight.timer * 0.01) * 4, yOffset: Math.sin(fight.timer * 0.01) * 4, w: display.width, h: display.height };
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.collisionBox.size.x - display.width) view.xOffset = fight.stage.collisionBox.size.x - display.width;
    cx.translate(-view.xOffset, -view.yOffset);

    // Background
    Fight.perspectiveLayer(display, fight, view);

    // GUI
    cx.translate(view.xOffset, view.yOffset);
    Fight.GUI(display);
    cx.translate(-view.xOffset, -view.yOffset);

    //
    const displayOnFrontArray = [];

    // Characters & actors
    [char1, char2, ...fight.actors].forEach(element => {
        if (debugMode.display) Fight.debugActor(display, element);
        const animation = element.actions[element.action].animation;
        if (animation) {
            const image = display.assets.images[(element instanceof Actor ? "ACTOR_" : "CHARACTER_") + element.id + "_" + (animation.altImg && animation.altImg.condition(display.game, element) ? animation.altImg.action : element.action)];
            if (image) {
                cx.save();
                if (!element.direction) display.flipHorizontally(element.collisionBox.center().x);
                cx.translate(element.collisionBox.pos.x, element.collisionBox.pos.y);
                if (animation.effects) {
                    const effects = animation.effects[Object.keys(animation.effects).reverse().find(index => index <= element.actionIndex)];
                    effects.forEach(effect => {
                        if (effect.displayOnFront) {
                            displayOnFrontArray.push({ element: element, effect: effect });
                        } else {
                            if (effect.name === "shake") display[effect.name + "Effect"](element.hitstun, element.hitstun);
                            if (effect.name === "rotate") display[effect.name + "Effect"](element, ...effect.params);
                        }
                    });
                }
              
                if (animation.sfx) {
                    const sfxs = animation.sfx[Object.keys(animation.sfx).reverse().find(index => index <= element.actionIndex)];
                    sfxs.forEach(sfx => {
                        display.assets.sounds[sfx.name].play();
                    })
                }
                cx.drawImage(
                    image,
                    animation.size.x * (Math.floor(element.actionIndex * animation.speed) % animation.frameCount), 0,
                    animation.size.x, animation.size.y,
                    animation.offset.x, animation.offset.y,
                    animation.size.x, animation.size.y
                );
                if (animation.vfx) {
                    const vfxs = animation.vfx[Object.keys(animation.vfx).reverse().find(index => index <= element.actionIndex)];
                    vfxs.forEach(vfx => {
                        cx.drawImage(
                            display.assets.images[vfx.assetId],
                            vfx.size.x * (Math.floor(element.actionIndex * vfx.speed) % vfx.frameCount), 0,
                            vfx.size.x, vfx.size.y,
                            vfx.offset.x, vfx.offset.y,
                            vfx.size.x, vfx.size.y
                        );
                    });
                }
                cx.restore();
            }
        }
    });

    fight.animationUnlink.forEach((vfx)=>{
        cx.save();
        if (!vfx.direction) display.flipHorizontally(new CollisionBox(vfx.pos,vfx.size).center().x);
        // cx.fillRect(
        //     vfx.pos.x  ,vfx.pos.y,
        //     vfx.size.x, vfx.size.y
        // );
        cx.drawImage(
            display.assets.images[vfx.assetId],
            vfx.size.x * (Math.floor(vfx.indexCount * vfx.speed) % vfx.frameCount), 0,
            vfx.size.x, vfx.size.y,
            vfx.pos.x  ,vfx.pos.y,
            vfx.size.x, vfx.size.y
        );
        cx.restore();
    });

    displayOnFrontArray.forEach(({ element, effect }) => {
        if (effect.name === "shake") display[effect.name + "Effect"](element.hitstun, element.hitstun);
        if (effect.name === "rotate") display[effect.name + "Effect"](element, ...effect.params);
        if (effect.name === "dark") display[effect.name + "Effect"](view, element.actionIndex, ...effect.params);
    });

    cx.translate(view.xOffset, view.yOffset);
    
    // Training or Fight Animation Display
    if (!fight.trainingMode) {
        if (fight.initAnimFrame) {
            cx.fillStyle = '#000';
            cx.fillRect(0, 0, display.width, display.height);
            display.fadeEffect('#fff', fight.initAnimInitFrame - fight.initAnimFrame, fight.initAnimInitFrame);
            cx.drawImage(display.assets.images.entranceImg, 0, 0, display.width, display.height);
        } else if (fight.roundAnimFrame < fight.roundAnimEndFrame) cx.drawImage(display.assets.images['round' + (1 + fight.winCount[0] + fight.winCount[1])], 0, 0, display.width, display.height);
        if (fight.roundIsOver) {
            if (fight.roundEndAnimFrame < fight.roundEndAnimEndFrame) cx.drawImage(display.assets.images[fight.timer === 0 ? 'timeover' : 'ko'], 0, 0, display.width, display.height);
            else if (fight.endAnimFrame < fight.endAnimEndFrame) cx.drawImage(display.assets.images['result' + (fight.winCount[0] === fight.playoff && fight.winCount[1] === fight.playoff ? 3 : fight.winCount.indexOf(Math.max(...fight.winCount)) + 1)], 0, 0, display.width, display.height);
        }
    } else Fight.trainingGUI(display);

    // Music
    if ((fight.initAnimInitFrame === fight.initAnimFrame || fight.roundEndAnimFrame === 120) && !fight.trainingMode) {
        let fightIntro = new Sound(display.assets.sounds.fightIntro, 0.25);
        fightIntro.play();
        display.music = new Sound(display.assets.sounds.fight, 0.25);
        display.music.play();
    }
    if (fight.animationFrame === 0  && fight.trainingMode) {
        let fightIntro = new Sound(display.assets.sounds.fightIntro, 0.25);
        fightIntro.play();
        display.music = new Sound(display.assets.sounds.fight, 0.25);
        display.music.play();
    }
    if (!fight.pauseMenu && display.music && display.music.isPaused()) {
        display.music.resume();
    }
    if (fight.nextActivity || fight.pauseMenu) {
        display.music.pause();
    }
    if (display.music.audio.ended) {
        display.music.reset();
    }

    // Pause menu
    if (fight.pauseMenu) fight.pauseMenu.constructor.display(display);
}

Fight.debugActor = (display, actor) => {
    const collisionBoxDisable = actor.actions[actor.action].collisionBoxDisable;
    const cx = display.cx;
    [
        { stroke: collisionBoxDisable ? '#888' : '#00f', fill: collisionBoxDisable ? '#8884' : '#00f4', line: 4, elements: [actor.collisionBox] },
        { stroke: '#0f0', fill: '#0f04', line: 2, elements: actor.hurtboxes },
        { stroke: '#f00', fill: '#f004', line: 2, elements: actor.hitboxes },
    ].forEach(({ stroke, fill, line, elements }) => {
        cx.lineWidth = line / display.zoom;
        cx.strokeStyle = stroke;
        cx.fillStyle = fill;
        elements.forEach(element => {
            cx.fillRect(element.pos.x, element.pos.y, element.size.x, element.size.y);
            cx.strokeRect(element.pos.x, element.pos.y, element.size.x, element.size.y);
        });
    });
    cx.lineWidth = 4 / display.zoom;
    cx.textAlign = 'center';
    cx.fillStyle = '#fff';
    cx.strokeStyle = '#000';
    cx.font = 12 + 'px serif';
    cx.strokeText(actor.action, actor.collisionBox.center().x, actor.collisionBox.pos.y - 6);
    cx.fillText(actor.action, actor.collisionBox.center().x, actor.collisionBox.pos.y - 6);
}

Fight.perspectiveLayer = (display, fight, view) => {
    const cx = display.cx;
    const images = display.assets.images;
    const stage = fight.stage;

    // Background layer 0
    if (images['s' + stage.id + 'l0']) {
        cx.drawImage(images['s' + stage.id + 'l0'], -view.xOffset, 0, stage.collisionBox.size.x, stage.collisionBox.size.y + 16, 0, 0, stage.collisionBox.size.x, stage.collisionBox.size.y + 16);
    }

    // Background floor
    cx.translate(0, display.height);
    cx.rotate((-90 * Math.PI) / 180);

    const img = {
        x: view.xOffset,
        y: view.yOffset,
        w: 64,
        h: view.w
    }
    const angle = img.h / 2;
    const x1 = 0;
    const y1 = img.x - angle;
    const x2 = 0;
    const y2 = img.x + img.h + angle;
    const x3 = img.w;
    const y3 = img.x;
    const x4 = img.w;
    const y4 = img.x + img.h;
    const m1 = Math.tan(Math.atan2(y3 - y1, x3 - x1));
    const b1 = y3 - m1 * x3;
    const m2 = Math.tan(Math.atan2(y4 - y2, x4 - x2));
    const b2 = y4 - m2 * x4;

    for (let row = 0; row < img.w; row++) {
        const yTop = m1 * row + b1;
        const yBottom = m2 * row + b2;
        cx.drawImage(images['s' + stage.id + 'floor'], row, img.x / 2, 1, img.h, row, yTop, 1, yBottom - yTop);
    }

    cx.rotate((90 * Math.PI) / 180);
    cx.translate(0, -display.height);

    // Background layer 1
    if (images['s' + stage.id + 'l1']) {
        cx.drawImage(images['s' + stage.id + 'l1'], -view.xOffset / 2, 0, stage.collisionBox.size.x, stage.collisionBox.size.y + 16, 0, 0, stage.collisionBox.size.x, stage.collisionBox.size.y + 16);
    }
}

Fight.GUI = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const fight = display.game.activity;

    // TIMER
    if (!fight.trainingMode) {
        const timer = (fight.timer - (fight.timer % 60)) / 60;
        let nb = timer > 99 ? "99" : timer.toString();
        if (nb.length === 1) nb = "0" + nb;
        for (let i = 0; i < nb.length; i++) cx.drawImage(images.timerNumbers, 14 * nb[i], 0, 14, 20, display.width / 2 + (-14 + i * 14), 12, 14, 20);
    } else cx.drawImage(images.infinity, 0, 0, 28, 20, 226, 12, 28, 20);

    fight.players.forEach((player, index) => {
        const character = player.character;
        // Name
        const nameImg = images['CHARACTER_' + character.id + "_NAME"];
        cx.drawImage(nameImg, index ? 416 - nameImg.naturalWidth : 64, 24, nameImg.naturalWidth, 18);
        cx.save();
        if (index) display.flipHorizontally(display.width / 2);
        // Mugshot
        cx.save();
        display.flipHorizontally(32);
        cx.drawImage(images.hudmugshot, 0, 0, 64, 64);
        cx.drawImage(images['CHARACTER_' + character.id + "_MUGSHOT"], 6, 6, 52, 52);
        cx.restore();
        // Health bar
        cx.drawImage(images.hudlife, 64, 8, 160, 16);
        const healthCoef = character.health / character.maxHealth;
        const maxLength = 156;
        const length = Math.round(maxLength * healthCoef);
        const { color1, color2 } = healthCoef === 1 ? { color1: '#6888fc', color2: '#0000c4' }
            : healthCoef > 0.5 ? { color1: '#58d858', color2: '#007800' }
                : healthCoef > 0.25 ? { color1: '#fcb800', color2: '#ac8000' }
                    : { color1: '#fc3800', color2: '#8c1800' };
        cx.fillStyle = color2;
        cx.fillRect(66 + maxLength - length, 10, length, 12);
        cx.fillStyle = color1;
        cx.fillRect(66 + maxLength - length, 12, length, 8);
        cx.fillStyle = color2;
        cx.fillRect(66 + maxLength - length, 18, length, 1);
        cx.fillStyle = '#fff';
        cx.fillRect(66 + maxLength - length, 14, length, 2);
        // Win count
        if (!fight.trainingMode) for (let i = 0; i < fight.playoff; i++) cx.drawImage(images[i < fight.winCount[index] ? "winScore" : "scoreImg"], 208 - 16 * i, 24, 16, 16);
        cx.restore();
    });
}

Fight.trainingGUI = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const player = display.game.activity.players[0];

    cx.fillStyle = "rgba(0, 0, 0, 0.5)";
    cx.fillRect(0, 64, 76, 4 + player.inputList.state.length * 12);

    player.inputList.state.forEach((inputObject, index) => {
        let arrow = [1, 1];
        switch (inputObject.input.stick) {
            case 1: arrow = [0, 2]; break;
            case 2: arrow = [1, 2]; break;
            case 3: arrow = [2, 2]; break;
            case 4: arrow = [0, 1]; break;
            case 6: arrow = [2, 1]; break;
            case 7: arrow = [0, 0]; break;
            case 8: arrow = [1, 0]; break;
            case 9: arrow = [2, 0]; break;
            default: break;
        }

        cx.drawImage(images.arrows, 8 * arrow[0], 8 * arrow[1], 8, 8, 8, 68 + 12 * index, 8, 8);
        cx.drawImage(images.aBtn, 8 * (inputObject.input.a ? 1 : 0), 0, 8, 8, 24, 68 + 12 * index, 8, 8);
        cx.drawImage(images.bBtn, 8 * (inputObject.input.b ? 1 : 0), 0, 8, 8, 36, 68 + 12 * index, 8, 8);

        const frame = inputObject.frameCount > 999 ? "999" : inputObject.frameCount.toString();
        for (let i = 0; i < frame.length; i++) {
            cx.drawImage(images.trainingNumbers, 5 * frame[i], 0, 5, 8, 52 + i * 5, 68 + 12 * index, 5, 8);
        }
    });
}