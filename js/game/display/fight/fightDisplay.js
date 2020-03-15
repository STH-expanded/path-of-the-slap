class FightDisplay extends ActivityDisplay {}
FightDisplay.update = display => {
    var fight = display.game.activity;

    // Players
    var player1 = fight.player1.character;
    var player2 = fight.player2.character;

    // Fight middle
    var middle = (player1.collisionBox.pos.x + player1.collisionBox.size.x / 2) / 2 + (player2.collisionBox.pos.x + player2.collisionBox.size.x / 2) / 2;

    // Viewport
    var view = {
        xOffset: middle - display.canvas.width / 2 / display.zoom,
        yOffset: 0,
        w: display.canvas.width / display.zoom,
        h: display.canvas.height / display.zoom
    };

    // Viewport borders
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.size.x - display.canvas.width / display.zoom) view.xOffset = fight.stage.size.x - display.canvas.width / display.zoom;

    display.cx.translate(-view.xOffset * display.zoom, 0);

    // Background
    FightDisplay.perspectiveLayer(display, fight, view);

    display.cx.translate(view.xOffset * display.zoom, 0);

    // GUI
    GUI.update(display);

    display.cx.translate(-view.xOffset * display.zoom, 0);

    // Player
    [player1, player2].forEach(player => {

        // DEBUG
        if (display.debugMode) {
            // Player
            display.cx.fillStyle = '#00f4';
            display.cx.fillRect(
                player.collisionBox.pos.x * display.zoom, player.collisionBox.pos.y * display.zoom,
                player.collisionBox.size.x * display.zoom, player.collisionBox.size.y * display.zoom
            );

            // Hurtboxes
            display.cx.fillStyle = '#0f04';
            player.hurtboxes.forEach(hurtbox => {
                display.cx.fillRect(
                    hurtbox.pos.x * display.zoom, hurtbox.pos.y * display.zoom,
                    hurtbox.size.x * display.zoom, hurtbox.size.y * display.zoom
                );
            });

            // Hitboxes
            display.cx.fillStyle = '#f004';
            player.hitboxes.forEach(hitbox => {
                display.cx.fillRect(
                    hitbox.pos.x * display.zoom, hitbox.pos.y * display.zoom,
                    hitbox.size.x * display.zoom, hitbox.size.y * display.zoom
                );
            });

            // State
            display.cx.textAlign = 'center';
            display.cx.fillStyle = '#fff';
            display.cx.font = 10 * display.zoom + 'px serif';
            display.cx.fillText(
                'action: ' + player.action,
                (player.collisionBox.pos.x + player.collisionBox.size.x / 2) * display.zoom,
                (player.collisionBox.pos.y - 6) * display.zoom
            );
            if (player.status) {
                display.cx.fillText(
                    'status: ' + player.status,
                    (player.collisionBox.pos.x + player.collisionBox.size.x / 2) * display.zoom,
                    (player.collisionBox.pos.y - 16) * display.zoom
                );
            }
        }

        var drawCharacter = player => {

            display.cx.save();
            if (!player.direction) {
                display.flipHorizontally((player.collisionBox.pos.x + player.collisionBox.size.x / 2) * display.zoom);
            }

            if (player.status) {
                switch (player.status) {
                    case "HIT":
                        display.cx.drawImage(display.assets.c00stun,
                            0, 0,
                            91, 192,
                            (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
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
                        display.cx.drawImage(display.assets.c00a0,
                            0, 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "GET_UP":
                        display.cx.drawImage(display.assets.c00a0,
                            0, 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "FORWARD_DASH":
                        display.cx.drawImage(display.assets.c00df,
                            0, 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        display.cx.drawImage(display.assets.dust,
                            128 * Math.floor((player.frame / 2) % 20), 0,
                            128, 128,
                            (-(Math.floor(player.frame / 2) * player.forwardDashSpeed) + player.collisionBox.pos.x - 128) * display.zoom,
                            (8 + player.collisionBox.pos.y + player.collisionBox.size.y - 128) * display.zoom,
                            128 * display.zoom, 128 * display.zoom
                        );
                        display.cx.globalAlpha = 0.5;
                        display.cx.drawImage(display.assets.dash,
                            128 * Math.floor((player.frame / 4) % 20), 0,
                            128, 128,
                            (player.collisionBox.pos.x + player.collisionBox.size.x) * display.zoom,
                            (player.collisionBox.pos.y + player.collisionBox.size.y - 128) * display.zoom,
                            128 * display.zoom, 128 * display.zoom
                        );
                        display.cx.globalAlpha = 1;
                        break;
                    case "BACKWARD_DASH":
                        console.log("BACKWARD_DASH");
                        break;
                    case "BACKWARD_AERIAL":
                        if (player.speed.y <= 0) {
                            display.cx.drawImage(display.assets.c00a1,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        else {
                            display.cx.drawImage(display.assets.c00a2,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        break;
                    case "NEUTRAL_AERIAL":
                        if (player.speed.y <= 0) {
                            display.cx.drawImage(display.assets.c00a1,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        else {
                            display.cx.drawImage(display.assets.c00a2,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        break;
                    case "FORWARD_AERIAL":
                        if (player.speed.y <= 0) {
                            display.cx.drawImage(display.assets.c00a1,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        else {
                            display.cx.drawImage(display.assets.c00a2,
                                0, 0,
                                91, 192,
                                (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                                (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                                91 * display.zoom, 192 * display.zoom
                            );
                        }
                        break;
                    case "BACKWARD_HIGH":
                        display.cx.drawImage(display.assets.c00hb,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "NEUTRAL_HIGH":
                        display.cx.drawImage(display.assets.c00idle,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "FORWARD_HIGH":
                        display.cx.drawImage(display.assets.c00hf,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "BACKWARD_LOW":
                        display.cx.drawImage(display.assets.c00lidle,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "NEUTRAL_LOW":
                        display.cx.drawImage(display.assets.c00lidle,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "FORWARD_LOW":
                        display.cx.drawImage(display.assets.c00lidle,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "AERIAL_A":
                        display.cx.drawImage(display.assets.c00aa,
                            91 * Math.floor((player.frame / 5) % 4), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            (16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "AERIAL_B":
                        display.cx.drawImage(display.assets.c00ab,
                            182 * Math.floor((player.frame / 4) % 6), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "HIGH_A":
                        display.cx.drawImage(display.assets.c00ha,
                            182 * Math.floor((player.frame / 4) % 4), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "HIGH_B":
                        display.cx.drawImage(display.assets.c00hab,
                            182 * Math.floor((player.frame / 5) % 6), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (-16 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "LOW_A":
                        display.cx.drawImage(display.assets.c00la,
                            182 * Math.floor((player.frame / 3) % 4), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "LOW_B":
                        display.cx.drawImage(display.assets.c00lab,
                            182 * Math.floor((player.frame / 5) % 6), 0,
                            182, 192,
                            (32 + player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            (-32 + player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                }
            }

            display.cx.restore();
        }

        if (player.id === '00') drawCharacter(player);
    });

    display.cx.translate(view.xOffset * display.zoom, 0);

    // PauseMenu
    if (fight.pauseMenu) fight.pauseMenu.display.update(display);
};

FightDisplay.perspectiveLayer = (display, fight, view) => {
    if (display.assets['s' + fight.stage.id + 'l0']) {
        display.cx.drawImage(display.assets['s' + fight.stage.id + 'l0'], -view.xOffset, 0, fight.stage.size.x, fight.stage.size.y + 16, 0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom);
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

    display.cx.translate(0, 270 * display.zoom);
    display.cx.rotate((-90 * Math.PI) / 180);

    for (var row = 0; row < img.w; row++) {
        var yTop = m1 * row + b1;
        var yBottom = m2 * row + b2;
        display.cx.drawImage(display.assets['s' + fight.stage.id + 'floor'], row, img.x / 2, 1, img.h, row * display.zoom, yTop * display.zoom, 1 * display.zoom, (yBottom - yTop) * display.zoom);
    }

    display.cx.rotate((90 * Math.PI) / 180);
    display.cx.translate(0, -270 * display.zoom);

    if (display.assets['s' + fight.stage.id + 'l1']) {
        display.cx.drawImage(display.assets['s' + fight.stage.id + 'l1'], -view.xOffset / 2, 0, fight.stage.size.x, fight.stage.size.y + 16, 0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom);
    }
};