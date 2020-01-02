class FightDisplay extends ActivityDisplay {}
FightDisplay.update = display => {
    var fight = display.game.activity;

    // Background
    display.cx.drawImage(display.assets.layer0, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);
    display.cx.drawImage(display.assets.layer1, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);

    // Players
    var player1 = fight.player1.character;
    var player2 = fight.player2.character;

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
    display.cx.drawImage(display.assets.layer2, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);
    display.cx.drawImage(display.assets.layer3, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);

    // GUI
    GUI.update(display);
}