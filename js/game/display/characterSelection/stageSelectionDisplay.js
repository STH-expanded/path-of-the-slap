class StageSelectionDisplay {}
StageSelectionDisplay.update = display => {
    var charSelect = display.game.activity;

    if (charSelect.stageFrame) {
        display.cx.globalAlpha = 1 / charSelect.stageFrame;

        for (let i = -2; i < 3; i++) {
            var id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            display.cx.drawImage(
                display.assets['s' + id + 'preview'],
                0, 0,
                480, 54,
                0,
                ((i + 2) * 54 - charSelect.stageFrame ** 2) * display.zoom,
                480 * display.zoom, 54 * display.zoom
            );
        }

        display.cx.fillStyle = '#0008';
        display.cx.fillRect(0, 0, display.canvas.width, display.canvas.height);

        display.cx.drawImage(
            display.assets.stageSelect,
            0, 0,
            480, 270,
            (0 - charSelect.stageFrame ** 2) * display.zoom,
            (0 - charSelect.stageFrame ** 2) * display.zoom,
            (480 + charSelect.stageFrame ** 2 * 2) * display.zoom,
            (270 + charSelect.stageFrame ** 2 * 2) * display.zoom
        );

        display.cx.drawImage(
            display.assets['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'],
            0, 0,
            480, 54,
            0,
            (2 * 54 - charSelect.stageFrame ** 2) * display.zoom,
            480 * display.zoom, 54 * display.zoom
        );

        display.cx.globalAlpha = 1;
    } else {

        for (let i = -3; i < 4; i++) {
            var id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            display.cx.drawImage(
                display.assets['s' + id + 'preview'],
                0, 0,
                480, 54,
                0,
                ((i + 2) * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1)) * display.zoom,
                480 * display.zoom, 54 * display.zoom
            );
        }

        display.cx.fillStyle = '#0008';
        display.cx.fillRect(0, 0, display.canvas.width, display.canvas.height);

        display.cx.drawImage(display.assets.stageSelect, 0, 0, 480, 270, 0, 0, 480 * display.zoom, 270 * display.zoom);

        display.cx.drawImage(
            display.assets['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'],
            0, 0,
            480, 54,
            0,
            (2 * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1)) * display.zoom,
            480 * display.zoom, 54 * display.zoom
        );

        display.cx.drawImage(
            display.assets.stageSelectCursor,
            16 * (Math.floor(display.frame / 8) % 6), 0, 16, 54,
            320 * display.zoom, 108 * display.zoom, 16 * display.zoom, 54 * display.zoom
        );
    }
}