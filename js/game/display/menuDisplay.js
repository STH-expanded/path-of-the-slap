class MenuDisplay extends ActivityDisplay {}
MenuDisplay.update = display => {
    var menu = display.game.activity instanceof Fight ? display.game.activity.pauseMenu : display.game.activity;

    if (menu.optionYCenter === display.game.mainMenuOptionYCenter) {
        display.cx.drawImage(display.assets.images.titleScreen, 0, 0, 480, 270, 0, 0, 480, 270);
    }
    else {
        display.cx.fillStyle = display.game.activity instanceof Fight ? '#0008' : '#000';
        display.cx.fillRect(0, 0, 480, 270);
    }

    // Options
    var drawMenuElement = (asset, index, offset) => {
        display.cx.drawImage(
            asset,
            0, 0, 128, 32,
            176 + offset, ((display.height - display.height / menu.optionYCenter) - menu.options.length / 2 * 32 + 32 * index),
            128, 32
        );
    };

    menu.options.forEach((option, index) => {
        option += option === 'Player' && display.game.players.length < 2 ? 'Disabled' : '';
        drawMenuElement(display.assets.images['btn' + option], index, 0);
        var cursor = display.game.activity instanceof Fight ? display.game.activity.pauseMenu.cursor : display.game.activity.cursor;
        if (cursor === index) drawMenuElement(display.assets.images.menucursor, index, Math.sin(display.frame * 0.1) * 4);
    });
}