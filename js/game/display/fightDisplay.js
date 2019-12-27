class FightDisplay extends ActivityDisplay {
    static update = (display, fight) => {

        // Background
        display.cx.drawImage(display.assets.layer0, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);
        display.cx.drawImage(display.assets.layer1, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);

        // Players
        var player1 = fight.player1.character;
        var player2 = fight.player2.character;

        if (display.debugMode) {
            display.cx.fillStyle = '#00f';
            display.cx.globalAlpha = 0.5;
            display.cx.fillRect(player1.pos.x * display.zoom, player1.pos.y * display.zoom, player1.size.x * display.zoom, player1.size.y * display.zoom);
            display.cx.fillRect(player2.pos.x * display.zoom, player2.pos.y * display.zoom, player2.size.x * display.zoom, player2.size.y * display.zoom);
            display.cx.globalAlpha = 1;
        }

        // Foreground
        display.cx.drawImage(display.assets.layer2, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);
        display.cx.drawImage(display.assets.layer3, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);

        // GUI
        GUI.update(display, fight);
    }
}