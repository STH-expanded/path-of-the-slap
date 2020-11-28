class FightDisplay extends ActivityDisplay {}
FightDisplay.update = display => {
    const cx = display.cx;
    const fight = display.game.activity;

    // Players
    const player1 = fight.players[0].character;
    const player2 = fight.players[1].character;

    // Fight middle
    const middle = (player1.collisionBox.center().x + player2.collisionBox.center().x) / 2;

    // Viewport
    const view = {
        xOffset: middle - display.width / 2,
        yOffset: 0,
        w: display.width,
        h: display.height
    };

    // Viewport borders
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.size.x - display.width) view.xOffset = fight.stage.size.x - display.width;

    cx.translate(-view.xOffset, 0);

    // Background
    FightDisplay.perspectiveLayer(display, fight, view);

    cx.translate(view.xOffset, 0);

    // GUI
    GUI.update(display);

    cx.translate(-view.xOffset, 0);

    // Players
    [player1, player2].forEach(player => {

        // DEBUG
        if (debugMode.display) {
            cx.lineWidth = 4 / display.zoom;
            
            cx.strokeStyle = '#00f';
            cx.strokeRect(
                player.collisionBox.pos.x, player.collisionBox.pos.y,
                player.collisionBox.size.x, player.collisionBox.size.y
            );

            cx.lineWidth = 2 / display.zoom;

            // Hurtboxes
            cx.strokeStyle = '#0f0';
            cx.fillStyle = '#0f04';
            player.hurtboxes.forEach(hurtbox => {
                cx.fillRect(
                    hurtbox.pos.x, hurtbox.pos.y,
                    hurtbox.size.x, hurtbox.size.y
                );
                cx.strokeRect(
                    hurtbox.pos.x, hurtbox.pos.y,
                    hurtbox.size.x, hurtbox.size.y
                );
            });

            // Hitboxes
            cx.strokeStyle = '#f00';
            cx.fillStyle = '#f004';
            player.hitboxes.forEach(hitbox => {
                cx.fillRect(
                    hitbox.pos.x, hitbox.pos.y,
                    hitbox.size.x, hitbox.size.y
                );
                cx.strokeRect(
                    hitbox.pos.x, hitbox.pos.y,
                    hitbox.size.x, hitbox.size.y
                );
            });

            // State
            cx.textAlign = 'center';
            cx.fillStyle = '#fff';
            cx.font = 10 + 'px serif';
            cx.fillText(
                'action: ' + player.action,
                player.collisionBox.center().x,
                player.collisionBox.pos.y - 6
            );
            if (player.status) {
                cx.fillText(
                    'status: ' + player.status,
                    player.collisionBox.center().x,
                    player.collisionBox.pos.y - 16
                );
            }
        }

        if (player.constructor.id === '00') FightDisplay.drawCharacter0(display, player);
        if (player.constructor.id === '02') FightDisplay.drawCharacter2(display, player);
    });
    
    // Projectiles
    fight.projectiles.forEach(projectile => {
        // DEBUG
        if (debugMode.display) {
            cx.fillStyle = '#00f4';
            cx.fillRect(
                projectile.collisionBox.pos.x, projectile.collisionBox.pos.y,
                projectile.collisionBox.size.x, projectile.collisionBox.size.y
            );
            cx.fillStyle = "#0f04";
            projectile.hurtboxes.forEach(hurtbox => {
                cx.fillRect(
                    hurtbox.pos.x, hurtbox.pos.y,
                    hurtbox.size.x, hurtbox.size.y
                );
            });
            cx.fillStyle = "#f004";
            projectile.hitboxes.forEach(hitbox => {
                cx.fillRect(
                    hitbox.pos.x, hitbox.pos.y,
                    hitbox.size.x, hitbox.size.y
                );
            });
        }

        cx.save();
        if (!projectile.direction) {
            display.flipHorizontally(projectile.collisionBox.center().x);
        }
        cx.drawImage(display.assets.images.projectile1,
            0, 0,
            128, 64,
            projectile.collisionBox.center().x - 64,
            projectile.collisionBox.center().y - 32,
            128, 64
        );
        cx.restore();
    });

    cx.translate(view.xOffset, 0);

    // PauseMenu
    if (fight.pauseMenu) fight.pauseMenu.display.update(display);
}

FightDisplay.drawCharacter0 = (display, player) => {
    const cx = display.cx;

    cx.save();
    if (!player.direction) {
        display.flipHorizontally((player.collisionBox.center().x));
    }

    if (player.status) {
        switch (player.status) {
            case "HIT":
                cx.drawImage(display.assets.images.c00stun,
                    0, 0,
                    91, 192,
                    (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "EJECTED":
                console.log("EJECTED");
                break;
            case "GROUND":
                console.log("GROUND");
                break;
            case "RECOVER":
                console.log("RECOVER");
                break;
            case "TECH":
                console.log("TECH");
                break;
            case "BLOCK_AERIAL":
                console.log("BLOCK_AERIAL");
                break;
            case "BLOCK_HIGH":
                console.log("BLOCK_HIGH");
                break;
            case "BLOCK_LOW":
                console.log("BLOCK_LOW");
                break;
        }
    } else {
        switch (player.action) {
            case "LAND":
            case "GET_UP":
                cx.drawImage(display.assets.images.c00a0,
                    0, 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_DASH":
                cx.drawImage(display.assets.images.c00df,
                    0, 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-16 + player.collisionBox.center().y - 96),
                    182, 192
                );
                cx.drawImage(display.assets.images.dust,
                    128 * Math.floor((player.frame / 2) % 20), 0,
                    128, 128,
                    (-(Math.floor(player.frame / 2) * player.forwardDashSpeed) + player.collisionBox.pos.x - 128),
                    (8 + player.collisionBox.pos.y + player.collisionBox.size.y - 128),
                    128, 128
                );
                cx.globalAlpha = 0.25;
                cx.drawImage(display.assets.images.dash,
                    128 * Math.floor((player.frame / 4) % 20), 0,
                    128, 128,
                    (player.collisionBox.pos.x + player.collisionBox.size.x),
                    (player.collisionBox.pos.y + player.collisionBox.size.y - 128),
                    128, 128
                );
                cx.globalAlpha = 1;
                break;
            case "BACKWARD_DASH":
                console.log("BACKWARD_DASH");
                break;
            case "BACKWARD_AERIAL":
            case "NEUTRAL_AERIAL":
            case "FORWARD_AERIAL":
                if (player.speed.y <= 0) {
                    cx.drawImage(display.assets.images.c00a1,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (player.collisionBox.center().y - 96),
                        91, 192
                    );
                } else {
                    cx.drawImage(display.assets.images.c00a2,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (player.collisionBox.center().y - 96),
                        91, 192
                    );
                }
                break;
            case "BACKWARD_HIGH":
                cx.drawImage(display.assets.images.c00hb,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "NEUTRAL_HIGH":
                cx.drawImage(display.assets.images.c00idle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_HIGH":
                cx.drawImage(display.assets.images.c00hf,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "BACKWARD_LOW":
            case "NEUTRAL_LOW":
            case "FORWARD_LOW":
                cx.drawImage(display.assets.images.c00lidle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "AERIAL_A":
                cx.drawImage(display.assets.images.c00aa,
                    91 * Math.floor((player.frame / 5) % 4), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "AERIAL_B":
                cx.drawImage(display.assets.images.c00ab,
                    182 * Math.floor((player.frame / 4) % 6), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (16 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "HIGH_A":
                cx.drawImage(display.assets.images.c00ha,
                    182 * Math.floor((player.frame / 4) % 4), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-16 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "HIGH_B":
                cx.drawImage(display.assets.images.c00hab,
                    182 * Math.floor((player.frame / 5) % 6), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-16 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "LOW_A":
                cx.drawImage(display.assets.images.c00la,
                    182 * Math.floor((player.frame / 3) % 4), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "LOW_B":
                cx.drawImage(display.assets.images.c00lab,
                    182 * Math.floor((player.frame / 5) % 6), 0,
                    182, 192,
                    (32 + player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "QCF":
                cx.drawImage(display.assets.images.c00qcf,
                    182 * Math.floor((player.frame / 4) % 8), 0,
                    182, 192,
                    (16 + player.collisionBox.center().x - 91),
                    (-16 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
        }
    }

    cx.restore();
}

FightDisplay.drawCharacter2 = (display, player) => {
    const cx = display.cx;

    cx.save();
    if (!player.direction) {
        display.flipHorizontally((player.collisionBox.center().x));
    }

    if (player.status) {
        switch (player.status) {
            case "HIT":
                cx.drawImage(display.assets.images.c02stun,
                    0, 0,
                    91, 192,
                    (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "EJECTED":
                console.log("EJECTED");
                break;
            case "GROUND":
                console.log("GROUND");
                break;
            case "RECOVER":
                console.log("RECOVER");
                break;
            case "TECH":
                console.log("TECH");
                break;
            case "BLOCK_AERIAL":
                console.log("BLOCK_AERIAL");
                break;
            case "BLOCK_HIGH":
                console.log("BLOCK_HIGH");
                break;
            case "BLOCK_LOW":
                console.log("BLOCK_LOW");
                break;
        }
    } else {
        switch (player.action) {
            case "LAND":
            case "GET_UP":
                cx.drawImage(display.assets.images.c02a0,
                    0, 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_DASH":
                cx.drawImage(display.assets.images.c02df,
                    182 * Math.floor((player.frame / 6) % 6), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_DASH":
                cx.drawImage(display.assets.images.c02db,
                    182 * Math.floor((player.frame / 4) % 4), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_AERIAL":
            case "NEUTRAL_AERIAL":
            case "FORWARD_AERIAL":
                if (player.speed.y <= 0) {
                    cx.drawImage(display.assets.images.c02a1,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (-16 + player.collisionBox.center().y - 96),
                        91, 192
                    );
                } else {
                    cx.drawImage(display.assets.images.c02a2,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (-16 + player.collisionBox.center().y - 96),
                        91, 192
                    );
                }
                break;
            case "BACKWARD_HIGH":
                cx.drawImage(display.assets.images.c02hb,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "NEUTRAL_HIGH":
                cx.drawImage(display.assets.images.c02idle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_HIGH":
                cx.drawImage(display.assets.images.c02hf,
                    182 * Math.floor((display.frame / 8) % 9), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_LOW":
            case "NEUTRAL_LOW":
            case "FORWARD_LOW":
                cx.drawImage(display.assets.images.c02lidle,
                    91 * Math.floor((display.frame / 8) % 5), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-48 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "AERIAL_A":
                break;
            case "AERIAL_B":
                break;
            case "HIGH_A":
                break;
            case "HIGH_B":
                break;
            case "LOW_A":
                break;
            case "LOW_B":
                break;
            case "QCF":
                break;
        }
    }

    cx.restore();
}

FightDisplay.perspectiveLayer = (display, fight, view) => {
    const cx = display.cx;
    const images = display.assets.images;
    const stage = fight.stage;

    // Background layer 0
    if (images['s' + stage.id + 'l0']) {
        cx.drawImage(images['s' + stage.id + 'l0'], -view.xOffset, 0, stage.size.x, stage.size.y + 16, 0, 0, stage.size.x, stage.size.y + 16);
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
        cx.drawImage(images['s' + stage.id + 'l1'], -view.xOffset / 2, 0, stage.size.x, stage.size.y + 16, 0, 0, stage.size.x, stage.size.y + 16);
    }
}