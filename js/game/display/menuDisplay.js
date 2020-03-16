class MenuDisplay extends ActivityDisplay {}
MenuDisplay.update = display => {
    var menu = display.game.activity instanceof Fight ? display.game.activity.pauseMenu : display.game.activity;

    if (menu.optionYCenter === display.game.mainMenuOptionYCenter) {
        display.cx.drawImage(display.assets.titleScreen, 0, 0, 480, 270, 0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom);
    }
    else {
        display.cx.fillStyle = display.game.activity instanceof Fight ? '#0008' : '#000';
        display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom);
    }

    // Options
    var drawMenuElement = (asset, index, offset) => {
        display.cx.drawImage(
            asset,
            0, 0, 128, 32,
            176 * display.zoom + offset, ((display.canvas.height - display.canvas.height / menu.optionYCenter) / display.zoom - menu.options.length / 2 * 32 + 32 * index) * display.zoom,
            128 * display.zoom, 32 * display.zoom
        );
    };

    menu.options.forEach((option, index) => {
        option += option === 'Player' && display.game.players.length < 2 ? 'Disabled' : '';
        drawMenuElement(display.assets['btn' + option], index, 0);
        var cursor = display.game.activity instanceof Fight ? display.game.activity.pauseMenu.cursor : display.game.activity.cursor;
        if (cursor === index) drawMenuElement(display.assets.menucursor, index, Math.sin(display.frame * 0.1) * 4 * display.zoom);
    });
}