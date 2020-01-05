class FightDisplay extends ActivityDisplay {}
FightDisplay.update = display => {
    var fight = display.game.activity;

    // Players
    var player1 = fight.player1.character;
    var player2 = fight.player2.character;

    // Fight middle
    var middle = ((player1.pos.x + player1.size.x / 2) / 2 + (player2.pos.x + player2.size.x / 2) / 2);

    // Viewport
    var view = {
        xOffset: middle - display.canvas.width / 2 / display.zoom,
        yOffset: 0,
        w: display.canvas.width / display.zoom,
        h: display.canvas.height / display.zoom,
    }

    // Viewport borders
    if (view.xOffset < 0) view.xOffset = 0;
    if (view.xOffset > fight.stage.size.x - display.canvas.width / display.zoom) view.xOffset = fight.stage.size.x - display.canvas.width / display.zoom;

    display.cx.translate(-view.xOffset * display.zoom, 0);

    // Background
    if (fight.stage.id === 2) {
        FightDisplay.perspectiveLayer(display, fight, view);
    } else {
        display.cx.drawImage(
            display.assets['s' + fight.stage.id + 'l0'],
            0, 0, fight.stage.size.x, fight.stage.size.y + 16,
            0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom
        );
        display.cx.drawImage(
            display.assets['s' + fight.stage.id + 'l1'],
            0, 0, fight.stage.size.x, fight.stage.size.y + 16,
            0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom
        );
    }


    if (display.debugMode) {

        // Player Hitbox/Hurtbox
        display.cx.fillStyle = '#00f';
        display.cx.globalAlpha = 0.5;
        display.cx.fillRect(player1.pos.x * display.zoom, player1.pos.y * display.zoom, player1.size.x * display.zoom, player1.size.y * display.zoom);
        display.cx.fillRect(player2.pos.x * display.zoom, player2.pos.y * display.zoom, player2.size.x * display.zoom, player2.size.y * display.zoom);
        display.cx.globalAlpha = 1;

        // Player State
        display.cx.textAlign = "center";
        display.cx.fillStyle = 'white';
        display.cx.font = 10 * display.zoom + "px serif";
        display.cx.fillText(
            "x:" + player1.pos.x + " y:" + player1.pos.y,
            (player1.pos.x + player1.size.x / 2) * display.zoom,
            (player1.pos.y - 6) * display.zoom
        );
        // display.cx.fillText(
        //     player1.action,
        //     player1.pos.x + player1.size.x / 2,
        //     player1.pos.y - 18
        // );
    }

    // Foreground
    if (display.assets['s' + fight.stage.id + 'l2']) {
        display.cx.drawImage(
            display.assets['s' + fight.stage.id + 'l2'],
            0, 0, fight.stage.size.x, fight.stage.size.y + 16,
            0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom
        );
    }
    if (display.assets['s' + fight.stage.id + 'l3']) {
        display.cx.drawImage(
            display.assets['s' + fight.stage.id + 'l3'],
            0, 0, fight.stage.size.x, fight.stage.size.y + 16,
            0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom
        );
    }

    display.cx.translate(view.xOffset * display.zoom, 0);

    // GUI
    GUI.update(display);
}

FightDisplay.perspectiveLayer = (display, fight, view) => {

    display.cx.drawImage(
        display.assets['s' + fight.stage.id + 'l0'],
        -view.xOffset / 2, 0, fight.stage.size.x, fight.stage.size.y + 16,
        0, 0, fight.stage.size.x * display.zoom, (fight.stage.size.y + 16) * display.zoom
    );

    var img = {
        x: view.xOffset,
        y: view.yOffset,
        w: 64,
        h: view.w
    }

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

    var m1 = Math.tan(Math.atan2((y3 - y1), (x3 - x1)));
    var b1 = y3 - m1 * x3;
    var m2 = Math.tan(Math.atan2((y4 - y2), (x4 - x2)));
    var b2 = y4 - m2 * x4;

    display.cx.translate(0, 270 * display.zoom);
    display.cx.rotate(-90 * Math.PI / 180);

    for (var row = 0; row < img.w; row++) {
        var yTop = m1 * row + b1;
        var yBottom = m2 * row + b2;
        display.cx.drawImage(display.assets['s2l1'],
            row, img.x / 2, 1, img.h,
            row * display.zoom, yTop * display.zoom,
            1 * display.zoom, (yBottom - yTop) * display.zoom
        );
    }

    display.cx.rotate(90 * Math.PI / 180);
    display.cx.translate(0, -270 * display.zoom);
}