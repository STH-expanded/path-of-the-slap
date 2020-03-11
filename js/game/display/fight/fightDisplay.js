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

    // DEBUG
    if (display.debugMode) {
        [player1, player2].forEach(player => {

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

            var drawCharacter = player => {

                display.cx.save();
                if (!player.direction) {
                    display.flipHorizontally((player.collisionBox.pos.x + player.collisionBox.size.x / 2) * display.zoom);
                }

                switch (player.action) {
                    case "HIT":
                        display.cx.fillStyle = '#04ff';
                        break;
                    case "EJECTED":
                        display.cx.fillStyle = '#229954';
                        break;
                    case "GROUND":
                        display.cx.fillStyle = '#2c3e50';
                        break;
                    case "RECOVER":
                        display.cx.fillStyle = '#d4ac0d';
                        break;
                    case "TECH":
                        display.cx.fillStyle = '#8e44ad';
                        break;
                    case "BLOCK_AERIAL":
                        display.cx.fillStyle = '#0b5345';
                        break;
                    case "BLOCK_HIGH":
                        display.cx.fillStyle = '#5f6a6a';
                        break;
                    case "BLOCK_LOW":
                        display.cx.fillStyle = '#82e0aa';
                        break;
                    case "LAND":
                        display.cx.fillStyle = '#fc33ff';
                        break;
                    case "GET_UP":
                        display.cx.fillStyle = '#d3f8b0';
                        break;
                    case "FORWARD_DASH":
                        display.cx.drawImage(display.assets.c00df,
                            0, 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "BACKWARD_DASH":
                        display.cx.fillStyle = '#ffa4a4';
                        break;
                    case "BACKWARD_AERIAL":
                        display.cx.fillStyle = '#ff7000';
                        break;
                    case "NEUTRAL_AERIAL":
                        display.cx.fillStyle = '#ffd800';
                        break;
                    case "FORWARD_AERIAL":
                        display.cx.fillStyle = '#cdff00';
                        break;
                    case "BACKWARD_HIGH":
                        display.cx.drawImage(display.assets.c00hb,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "NEUTRAL_HIGH":
                        display.cx.drawImage(display.assets.c00idle,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "FORWARD_HIGH":
                        display.cx.drawImage(display.assets.c00hf,
                            91 * Math.floor((display.frame / 8) % 6), 0,
                            91, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 45) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            91 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "BACKWARD_LOW":
                        display.cx.fillStyle = '#0f00ff';
                        break;
                    case "NEUTRAL_LOW":
                        display.cx.fillStyle = '#9e00ff';
                        break;
                    case "FORWARD_LOW":
                        display.cx.fillStyle = '#d800ff';
                        break;
                    case "AERIAL_A":
                        display.cx.fillStyle = '#946aa8';
                        break;
                    case "AERIAL_B":
                        display.cx.fillStyle = '#0f6903';
                        break;
                    case "HIGH_A":
                        display.cx.drawImage(display.assets.c00ha,
                            182 * Math.floor((player.frame / 4) % 4), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "HIGH_B":
                        display.cx.drawImage(display.assets.c00hab,
                            182 * Math.floor((player.frame / 5) % 6), 0,
                            182, 192,
                            (player.collisionBox.pos.x + player.collisionBox.size.x / 2 - 91) * display.zoom,
                            -80 + (player.collisionBox.pos.y + player.collisionBox.size.y / 2 - 96) * display.zoom,
                            182 * display.zoom, 192 * display.zoom
                        );
                        break;
                    case "LOW_A":
                        display.cx.fillStyle = '#73717d';
                        break;
                    case "LOW_B":
                        display.cx.fillStyle = '#d9ace2';
                        break;
                }
                
                display.cx.restore();
            }

            if (player.id === '00') drawCharacter(player);
        });
    }

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