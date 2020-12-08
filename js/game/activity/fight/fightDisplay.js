Fight.display = display => {
    const cx = display.cx;
    const fight = display.game.activity;

    const char1 = fight.players[0].character;
    const char2 = fight.players[1].character;

    // Viewport
    const view = { xOffset: (char1.collisionBox.center().x + char2.collisionBox.center().x) / 2 - display.width / 2, yOffset: 0, w: display.width, h: display.height };
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.collisionBox.size.x - display.width) view.xOffset = fight.stage.collisionBox.size.x - display.width;
    cx.translate(-view.xOffset, 0);

    // Background
    Fight.perspectiveLayer(display, fight, view);

    // GUI
    cx.translate(view.xOffset, 0);
    Fight.GUI(display);
    cx.translate(-view.xOffset, 0);

    // Characters
    [char1, char2].forEach(character => {
        if (debugMode.display) Fight.debugActor(display, character);
        const animation = character.actions[character.action].animation;
        if (animation) {
            const image = display.assets.images["CHARACTER_" + character.id + "_" + (animation.altImg && animation.altImg.condition(display.game, character) ? animation.altImg.action : character.action)];
            if (image) {
                cx.save();
                if (!character.direction) display.flipHorizontally(character.collisionBox.center().x);
                cx.drawImage(
                    image,
                    animation.size.x * (Math.floor(character.actionIndex * animation.speed) % animation.frameCount), 0,
                    animation.size.x, animation.size.y,
                    character.collisionBox.pos.x + animation.offset.x,
                    character.collisionBox.pos.y + animation.offset.y,
                    animation.size.x, animation.size.y
                );
                cx.restore();
            }
        }
    });
    
    // Actors
    fight.actors.forEach(actor => {
        if (debugMode.display) Fight.debugActor(display, actor);
        const animation = actor.actions[actor.action].animation;
        if (animation) {
            const image = display.assets.images["ACTOR_00_" + actor.action];
            if (image) {
                cx.save();
                if (!actor.direction) display.flipHorizontally(actor.collisionBox.center().x);
                cx.drawImage(
                    image,
                    animation.size.x * (Math.floor(actor.actionIndex * animation.speed) % animation.frameCount), 0,
                    animation.size.x, animation.size.y,
                    actor.collisionBox.pos.x + animation.offset.x,
                    actor.collisionBox.pos.y + animation.offset.y,
                    animation.size.x, animation.size.y
                );
                cx.restore();
            }
        }
    });

    cx.translate(view.xOffset, 0);

    // Pause menu
    if (fight.pauseMenu) fight.pauseMenu.constructor.display(display);
}

Fight.debugActor = (display, actor) => {
    const cx = display.cx;
    cx.lineWidth = 4 / display.zoom;
    cx.strokeStyle = '#00f';
    cx.fillStyle = '#00f2';
    cx.fillRect(actor.collisionBox.pos.x, actor.collisionBox.pos.y, actor.collisionBox.size.x, actor.collisionBox.size.y);
    cx.strokeRect(actor.collisionBox.pos.x, actor.collisionBox.pos.y, actor.collisionBox.size.x, actor.collisionBox.size.y);
    cx.lineWidth = 2 / display.zoom;
    cx.strokeStyle = '#0f0';
    cx.fillStyle = '#0f04';
    actor.hurtboxes.forEach(hurtbox => {
        cx.fillRect(hurtbox.pos.x, hurtbox.pos.y, hurtbox.size.x, hurtbox.size.y);
        cx.strokeRect(hurtbox.pos.x, hurtbox.pos.y, hurtbox.size.x, hurtbox.size.y);
    });
    cx.strokeStyle = '#f00';
    cx.fillStyle = '#f004';
    actor.hitboxes.forEach(hitbox => {
        cx.fillRect(hitbox.pos.x, hitbox.pos.y, hitbox.size.x, hitbox.size.y);
        cx.strokeRect(hitbox.pos.x, hitbox.pos.y, hitbox.size.x, hitbox.size.y);
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

    const player1 = fight.players[0];
    const player2 = fight.players[1];

    // TIMER
    if (!fight.trainingMode) {
        const timer = (fight.timer - (fight.timer % 60)) / 60;
        let nb = timer > 99 ? "99" : timer.toString();
        if (nb.length === 1) nb = "0" + nb;
        for (let i = 0; i < nb.length; i++) cx.drawImage(images.timerNumbers, 14 * nb[i], 0, 14, 20, display.width / 2 + (-14 + i * 14), 12, 14, 20);
    } else cx.drawImage(images.infinity, 0, 0, 28, 20, 226, 12, 28, 20);

    // P1
    cx.save();
    display.flipHorizontally(32);
    cx.drawImage(images.hudmugshot, 0, 0, 64, 64);
    cx.drawImage(images['cm' + player1.selectedCharacter.id], 6, 6, 52, 52);
    cx.restore();
    cx.drawImage(images.hudlife, 64, 8, 160, 16);
    cx.fillStyle = '#0080ff';
    cx.fillRect(66 + (156 - (156 * (player1.character.health / player1.character.maxHealth))), 10, 156 * (player1.character.health / player1.character.maxHealth), 12);
    const imgci1 = images['ci' + player1.selectedCharacter.id];
    cx.drawImage(imgci1, 64, 24, imgci1.naturalWidth, 18);
    if (!fight.trainingMode) for (let i = 0; i < fight.playoff; i++) cx.drawImage(images[i < fight.winCount[0] ? "winScore" : "scoreImg"], 208 - 16 * i, 24, 16, 16);

    //P2
    cx.drawImage(images.hudmugshot, display.width - 64, 0, 64, 64);
    cx.drawImage(images['cm' + player2.selectedCharacter.id], display.width - 58, 6, 52, 52);
    cx.drawImage(images.hudlife, 256, 8, 160, 16);
    cx.fillStyle = '#0080ff';
    cx.fillRect(258, 10, 156 * (player2.character.health / player2.character.maxHealth), 12);
    const imgci2 = images['ci' + player2.selectedCharacter.id];
    cx.drawImage(imgci2, 416 - imgci2.naturalWidth, 24, imgci2.naturalWidth, 18);
    if (!fight.trainingMode) for (let i = 0; i < fight.playoff; i++) cx.drawImage(images[i < fight.winCount[1] ? "winScore" : "scoreImg"], 256 + 16 * i, 24, 16, 16);

    // Training or Fight Animation Display
    if (!fight.trainingMode) {
        if (fight.initAnimFrame) cx.drawImage(images.entranceImg, 0, 0, display.width, display.height);
        else if (fight.roundAnimFrame < fight.roundAnimEndFrame) cx.drawImage(images['round' + (1 + fight.winCount[0] + fight.winCount[1])], 0, 0, display.width, display.height);
        if (fight.roundIsOver) {
            if (fight.roundEndAnimFrame < fight.roundEndAnimEndFrame) cx.drawImage(images[fight.timer === 0 ? 'timeover' : 'ko'], 0, 0, display.width, display.height);
            else if (fight.endAnimFrame < fight.endAnimEndFrame) cx.drawImage(images['result' + (fight.winCount[0] === fight.playoff && fight.winCount[1] === fight.playoff ? 3 : fight.winCount.indexOf(Math.max(...fight.winCount)) + 1)], 0, 0, display.width, display.height);
        }
    } else Fight.trainingGUI(display);
}

Fight.trainingGUI = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const player = display.game.activity.players[0];

    cx.fillStyle = "rgba(0, 0, 0, 0.5)";
    cx.fillRect(0, 64, 76, 4 + player.inputList.state.length * 12);

    player.inputList.state.forEach((inputObject, index) => {
        let arrow = [1, 1];
        if (inputObject.input.right && inputObject.input.up) arrow = [2, 0];
        else if (inputObject.input.right && inputObject.input.down) arrow = [2, 2];
        else if (inputObject.input.left && inputObject.input.down) arrow = [0, 2];
        else if (inputObject.input.left && inputObject.input.up) arrow = [0, 0];
        else if (inputObject.input.up) arrow = [1, 0];
        else if (inputObject.input.right) arrow = [2, 1];
        else if (inputObject.input.down) arrow = [1, 2];
        else if (inputObject.input.left) arrow = [0, 1];

        cx.drawImage(images.arrows, 8 * arrow[0], 8 * arrow[1], 8, 8, 8, 68 + 12 * index, 8, 8);
        cx.drawImage(images.aBtn, 8 * (inputObject.input.a ? 1 : 0), 0, 8, 8, 24, 68 + 12 * index, 8, 8);
        cx.drawImage(images.bBtn, 8 * (inputObject.input.b ? 1 : 0), 0, 8, 8, 36, 68 + 12 * index, 8, 8);

        const frame = inputObject.frameCount > 999 ? "999" : inputObject.frameCount.toString();
        for (let i = 0; i < frame.length; i++) {
            cx.drawImage(images.trainingNumbers, 5 * frame[i], 0, 5, 8, 52 + i * 5, 68 + 12 * index, 5, 8);
        }
    });
}