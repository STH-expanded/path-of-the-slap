class StageSelectionDisplay {}
StageSelectionDisplay.update = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const charSelect = display.game.activity;

    if (charSelect.stageFrame) {
        cx.globalAlpha = 1 / charSelect.stageFrame;

        for (let i = -2; i < 3; i++) {
            const id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            cx.drawImage(
                images['s' + id + 'preview'],
                0, 0, display.width, 54,
                0, (i + 2) * 54 - charSelect.stageFrame ** 2, display.width, 54
            );
        }

        cx.fillStyle = '#0008';
        cx.fillRect(0, 0, display.width, display.height);

        cx.drawImage(
            images.stageSelect,
            0, 0, display.width, display.height,
            0 - charSelect.stageFrame ** 2, 0 - charSelect.stageFrame ** 2, display.width + charSelect.stageFrame ** 2 * 2, display.height + charSelect.stageFrame ** 2 * 2
        );

        cx.drawImage(
            images['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'],
            0, 0, display.width, 54,
            0, 2 * 54 - charSelect.stageFrame ** 2, display.width, 54
        );

        cx.globalAlpha = 1;
    } else {
        for (let i = -3; i < 4; i++) {
            const id = charSelect.stages[(((i + charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id;
            cx.drawImage(
                images['s' + id + 'preview'],
                0, 0, display.width, 54,
                0, (i + 2) * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1), display.width, 54
            );
        }

        cx.fillStyle = '#0008';
        cx.fillRect(0, 0, display.width, display.height);

        cx.drawImage(images.stageSelect, 0, 0, display.width, display.height, 0, 0, display.width, display.height);

        cx.drawImage(
            images['s' + charSelect.stages[(((charSelect.stageCursor) % charSelect.stages.length) + charSelect.stages.length) % charSelect.stages.length].id + 'preview'],
            0, 0, display.width, 54,
            0, 2 * 54 + charSelect.selectStageFrame ** 2 * (charSelect.selectStageFrame < 0 ? -1 : 1), display.width, 54
        );

        cx.drawImage(
            images.stageSelectCursor,
            16 * (Math.floor(display.frame / 8) % 6), 0, 16, 54,
            320, 108, 16, 54
        );
    }
}