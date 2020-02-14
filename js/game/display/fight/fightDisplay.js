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