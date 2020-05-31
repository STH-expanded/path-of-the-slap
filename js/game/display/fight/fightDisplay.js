class FightDisplay extends ActivityDisplay { }
FightDisplay.update = display => {
    var fight = display.game.activity;

    // Players
    var player1 = fight.player1.character;
    var player2 = fight.player2.character;

    // Fight middle
    var middle = (player1.collisionBox.pos.x + player1.collisionBox.size.x / 2) / 2 + (player2.collisionBox.pos.x + player2.collisionBox.size.x / 2) / 2;

    // Viewport
    var view = {
        xOffset: middle - display.width / 2,
        yOffset: 0,
        w: display.width,
        h: display.height
    };

    // Viewport borders
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.size.x - display.width) view.xOffset = fight.stage.size.x - display.width;

    display.cx.translate(-view.xOffset, 0);

    // Background
    FightDisplay.perspectiveLayer(display, fight, view);

    display.cx.translate(view.xOffset, 0);

    // GUI
    GUI.update(display);

    display.cx.translate(-view.xOffset, 0);

    if (display.debugMode) {
        //Projectile
        fight.projectiles.forEach(projectile => {
            display.cx.fillStyle = '#00f4';
            display.cx.fillRect(
                projectile.collisionBox.pos.x,
                projectile.collisionBox.pos.y,
                projectile.collisionBox.size.x,
                projectile.collisionBox.size.y
            );
            display.cx.fillStyle = "#0f04";
            projectile.hurtboxes.forEach(hurtbox => {
                display.cx.fillRect(
                    hurtbox.pos.x,
                    hurtbox.pos.y,
                    hurtbox.size.x,
                    hurtbox.size.y
                );
            });
            display.cx.fillStyle = "#f004";
            projectile.hitboxes.forEach(hitbox => {
                display.cx.fillRect(
                    hitbox.pos.x,
                    hitbox.pos.y,
                    hitbox.size.x,
                    hitbox.size.y
                );
            });
        });
    }

    // Player
    [player1, player2].forEach(player => {

        // DEBUG
        if (display.debugMode) {
            // Player
            display.cx.fillStyle = '#00f4';
            display.cx.fillRect(
                player.collisionBox.pos.x, player.collisionBox.pos.y,
                player.collisionBox.size.x, player.collisionBox.size.y
            );

            // Hurtboxes
            display.cx.fillStyle = '#0f04';
            player.hurtboxes.forEach(hurtbox => {
                display.cx.fillRect(
                    hurtbox.pos.x, hurtbox.pos.y,
                    hurtbox.size.x, hurtbox.size.y
                );
            });

            // Hitboxes
            display.cx.fillStyle = '#f004';
            player.hitboxes.forEach(hitbox => {
                display.cx.fillRect(
                    hitbox.pos.x, hitbox.pos.y,
                    hitbox.size.x, hitbox.size.y
                );
            });

            // State
            display.cx.textAlign = 'center';
            display.cx.fillStyle = '#fff';
            display.cx.font = 10 + 'px serif';
            display.cx.fillText(
                'action: ' + player.action,
                (player.collisionBox.pos.x + player.collisionBox.size.x / 2),
                (player.collisionBox.pos.y - 6)
            );
            if (player.status) {
                display.cx.fillText(
                    'status: ' + player.status,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2),
                    (player.collisionBox.pos.y - 16)
                );
            }
        }

        if (player.id === '00') FightDisplay.drawCharacter0(display, player);
        if (player.id === '02') FightDisplay.drawCharacter2(display, player);

        display.cx.save();
        fight.projectiles.forEach(projectile => {
            if (!projectile.direction) {
                display.flipHorizontally((projectile.collisionBox.pos.x + projectile.collisionBox.size.x / 2));
            }
            display.cx.drawImage(display.assets.images.projectile1,
                0, 0,
                128, 64,
                (projectile.collisionBox.pos.x + projectile.collisionBox.size.x / 2 - 64),
                (projectile.collisionBox.pos.y + projectile.collisionBox.size.y / 2 - 32),
                128, 64
            );
        });
        display.cx.restore();
    });

    display.cx.translate(view.xOffset, 0);

    // PauseMenu
    if (fight.pauseMenu) fight.pauseMenu.display.update(display);
};
FightDisplay.drawCharacter0 = (display, player) => {

    display.cx.save();
    if (!player.direction) {
        display.flipHorizontally((player.collisionBox.pos.x + player.collisionBox.size.x / 2));
    }

    if (player.status) {
        switch (player.status) {
            case "HIT":
                display.cx.drawImage(display.assets.images.c00stun,
                    0, 0,
                    91, 192,
                    (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
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
                display.cx.drawImage(display.assets.images.c00a0,
                    0, 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "FORWARD_DASH":
                display.cx.drawImage(display.assets.images.c00df,
                    0, 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                display.cx.drawImage(display.assets.images.dust,
                    128 * Math.floor((player.frame / 2) % 20), 0,
                    128, 128,
                    (-(Math.floor(player.frame / 2) * player.forwardDashSpeed) + player.collisionBox.pos.x - 128),
                    (8 + player.collisionBox.pos.y + player.collisionBox.size.y - 128),
                    128, 128
                );
                display.cx.globalAlpha = 0.25;
                display.cx.drawImage(display.assets.images.dash,
                    128 * Math.floor((player.frame / 4) % 20), 0,
                    128, 128,
                    (player.collisionBox.pos.x + player.collisionBox.size.x),
                    (player.collisionBox.pos.y + player.collisionBox.size.y - 128),
                    128, 128
                );
                display.cx.globalAlpha = 1;
                break;
            case "BACKWARD_DASH":
                console.log("BACKWARD_DASH");
                break;
            case "BACKWARD_AERIAL":
            case "NEUTRAL_AERIAL":
            case "FORWARD_AERIAL":
                if (player.speed.y <= 0) {
                    display.cx.drawImage(display.assets.images.c00a1,
                        0, 0,
                        91, 192,
                        (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                        (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                        91, 192
                    );
                } else {
                    display.cx.drawImage(display.assets.images.c00a2,
                        0, 0,
                        91, 192,
                        (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                        (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                        91, 192
                    );
                }
                break;
            case "BACKWARD_HIGH":
                display.cx.drawImage(display.assets.images.c00hb,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "NEUTRAL_HIGH":
                display.cx.drawImage(display.assets.images.c00idle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "FORWARD_HIGH":
                display.cx.drawImage(display.assets.images.c00hf,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "BACKWARD_LOW":
            case "NEUTRAL_LOW":
            case "FORWARD_LOW":
                display.cx.drawImage(display.assets.images.c00lidle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "AERIAL_A":
                display.cx.drawImage(display.assets.images.c00aa,
                    91 * Math.floor((player.frame / 5) % 4), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "AERIAL_B":
                display.cx.drawImage(display.assets.images.c00ab,
                    182 * Math.floor((player.frame / 4) % 6), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "HIGH_A":
                display.cx.drawImage(display.assets.images.c00ha,
                    182 * Math.floor((player.frame / 4) % 4), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "HIGH_B":
                display.cx.drawImage(display.assets.images.c00hab,
                    182 * Math.floor((player.frame / 5) % 6), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "LOW_A":
                display.cx.drawImage(display.assets.images.c00la,
                    182 * Math.floor((player.frame / 3) % 4), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "LOW_B":
                display.cx.drawImage(display.assets.images.c00lab,
                    182 * Math.floor((player.frame / 5) % 6), 0,
                    182, 192,
                    (32 + player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "QCF":
                display.cx.drawImage(display.assets.images.c00qcf,
                    182 * Math.floor((player.frame / 4) % 8), 0,
                    182, 192,
                    (16 + player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
        }
    }

    display.cx.restore();
}

FightDisplay.drawCharacter2 = (display, player) => {

    display.cx.save();
    if (!player.direction) {
        display.flipHorizontally((player.collisionBox.pos.x + player.collisionBox.size.x / 2));
    }

    if (player.status) {
        switch (player.status) {
            case "HIT":
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
                display.cx.drawImage(display.assets.images.c02a0,
                    0, 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "FORWARD_DASH":
                display.cx.drawImage(display.assets.images.c02df,
                    182 * Math.floor((player.frame / 6) % 6), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "BACKWARD_DASH":
                display.cx.drawImage(display.assets.images.c02db,
                    182 * Math.floor((player.frame / 4) % 4), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "BACKWARD_AERIAL":
            case "NEUTRAL_AERIAL":
            case "FORWARD_AERIAL":
                if (player.speed.y <= 0) {
                    display.cx.drawImage(display.assets.images.c02a1,
                        0, 0,
                        91, 192,
                        (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                        (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                        91, 192
                    );
                } else {
                    display.cx.drawImage(display.assets.images.c02a2,
                        0, 0,
                        91, 192,
                        (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                        (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                        91, 192
                    );
                }
                break;
            case "BACKWARD_HIGH":
                display.cx.drawImage(display.assets.images.c02hb,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "NEUTRAL_HIGH":
                display.cx.drawImage(display.assets.images.c02idle,
                    91 * Math.floor((display.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    91, 192
                );
                break;
            case "FORWARD_HIGH":
                display.cx.drawImage(display.assets.images.c02hf,
                    182 * Math.floor((display.frame / 8) % 9), 0,
                    182, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91),
                    (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
                    182, 192
                );
                break;
            case "BACKWARD_LOW":
            case "NEUTRAL_LOW":
            case "FORWARD_LOW":
                display.cx.drawImage(display.assets.images.c02lidle,
                    91 * Math.floor((display.frame / 8) % 5), 0,
                    91, 192,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45),
                    (-48 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96),
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

    display.cx.restore();
}

FightDisplay.perspectiveLayer = (display, fight, view) => {
    if (display.assets.images['s' + fight.stage.id + 'l0']) {
        display.cx.drawImage(display.assets.images['s' + fight.stage.id + 'l0'], -view.xOffset, 0, fight.stage.size.x, fight.stage.size.y + 16, 0, 0, fight.stage.size.x, (fight.stage.size.y + 16));
    }

    var img = {
        x: view.xOffset,
        y: view.yOffset,
        w: 64,
        h: view.w
    };

    var angle = img.h / 2;

    //bottom left
    var x1 = 0;
    var y1 = img.x - angle;
    //bottom right
    var x2 = 0;
    var y2 = img.x + img.h + angle;
    //top left
    var x3 = img.w;
    var y3 = img.x;
    //top right
    var x4 = img.w;
    var y4 = img.x + img.h;

    var m1 = Math.tan(Math.atan2(y3 - y1, x3 - x1));
    var b1 = y3 - m1 * x3;
    var m2 = Math.tan(Math.atan2(y4 - y2, x4 - x2));
    var b2 = y4 - m2 * x4;

    display.cx.translate(0, 270);
    display.cx.rotate((-90 * Math.PI) / 180);

    for (var row = 0; row < img.w; row++) {
        var yTop = m1 * row + b1;
        var yBottom = m2 * row + b2;
        display.cx.drawImage(display.assets.images['s' + fight.stage.id + 'floor'], row, img.x / 2, 1, img.h, row, yTop, 1, (yBottom - yTop));
    }

    display.cx.rotate((90 * Math.PI) / 180);
    display.cx.translate(0, -270);

    if (display.assets.images['s' + fight.stage.id + 'l1']) {
        display.cx.drawImage(display.assets.images['s' + fight.stage.id + 'l1'], -view.xOffset / 2, 0, fight.stage.size.x, fight.stage.size.y + 16, 0, 0, fight.stage.size.x, (fight.stage.size.y + 16));
    }
};