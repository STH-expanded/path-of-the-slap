class MenuDisplay extends ActivityDisplay {
    static update = display => {
        var menu = display.game.activity;

        display.cx.fillStyle = '#114';
        display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom)

        // Options
        menu.options.forEach((option, index) => {
            option += option === 'Player' && display.game.players.length < 2 ? 'Disabled' : '';
            display.cx.drawImage(display.assets['btn' + option], 0, 0, 128, 32, 176 * display.zoom, (84 + 32 * index) * display.zoom, 128 * display.zoom, 32 * display.zoom);
            if (display.game.activity.cursor === index) {
                display.cx.drawImage(display.assets.menucursor, 0, 0, 128, 32, 176 * display.zoom, (84 + 32 * index) * display.zoom, 128 * display.zoom, 32 * display.zoom);
            }
        });
        
        // Transitions
        if (menu.initAnimFrame) display.fadeEffect('#000', menu.initAnimFrame, menu.initAnimInitFrame);
        if (menu.endAnimFrame) display.fadeEffect('#000', menu.endAnimFrame, menu.endAnimEndFrame);
    }
}