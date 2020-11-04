class MenuDisplay extends ActivityDisplay {}
MenuDisplay.update = display => {
    const cx = display.cx;
    const activity = display.game.activity;
    const menu = activity instanceof Fight ? activity.pauseMenu : activity;

    // Background
    if (menu instanceof MainMenu) {
        cx.drawImage(display.assets.images.titleScreen, 0, 0, display.width, display.height, 0, 0, display.width, display.height);
    }
    else {
        cx.fillStyle = menu instanceof PauseMenu ? '#0008' : '#000';
        cx.fillRect(0, 0, display.width, display.height);
    }

    // Options
    menu.options.forEach((option, index) => {
        option += option === 'Player' && Object.keys(display.game.players).length < 2 ? 'Disabled' : '';
        MenuDisplay.drawMenuElement(display, menu, display.assets.images['btn' + option], index, 0);
        const cursor = activity instanceof Fight ? activity.pauseMenu.cursor : activity.cursor;
        if (cursor === index) MenuDisplay.drawMenuElement(display, menu, display.assets.images.menucursor, index, Math.sin(display.frame * 0.1) * 4);
    });
}

MenuDisplay.drawMenuElement = (display, menu, asset, index, offset) => {
    display.cx.drawImage(
        asset,
        0, 0, 128, 32,
        176 + offset, ((display.height - display.height / menu.optionYCenter) - menu.options.length / 2 * 32 + 32 * index),
        128, 32
    );
}