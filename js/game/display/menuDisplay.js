class MenuDisplay extends ActivityDisplay {}
MenuDisplay.update = display => {
    var menu = display.game.activity;

    display.cx.fillStyle = '#114';
    display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom);

    // Options
    var drawMenuElement = (asset, index) => {
        display.cx.drawImage(
            asset,
            0, 0, 128, 32,
            176 * display.zoom, (display.canvas.height * menu.optionYCenter / display.zoom - menu.options.length / 2 * 32 + 32 * index) * display.zoom,
            128 * display.zoom, 32 * display.zoom
        );
    };

    menu.options.forEach((option, index) => {
        option += option === 'Player' && display.game.players.length < 2 ? 'Disabled' : '';
        drawMenuElement(display.assets['btn' + option], index);
        if (display.game.activity.cursor === index) drawMenuElement(display.assets.menucursor, index);
    });

    // Transitions
    if (menu.initAnimFrame) display.fadeEffect('#000', menu.initAnimFrame, menu.initAnimInitFrame);
    if (menu.endAnimFrame) display.fadeEffect('#000', menu.endAnimFrame, menu.endAnimEndFrame);
}