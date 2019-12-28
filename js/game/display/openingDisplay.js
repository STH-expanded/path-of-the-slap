class OpeningDisplay extends ActivityDisplay {}
OpeningDisplay.update = display => {
    var opening = display.game.activity;

    display.cx.fillStyle = '#000';
    display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom)

    display.cx.drawImage(
        display.assets.openingImg,
        0, 0,
        128, 24,
        display.cx.canvas.width / 2 - 64 * display.zoom,
        display.cx.canvas.height / 2 - 12 * display.zoom,
        128 * display.zoom,
        24 * display.zoom
    );

    // Transitions
    if (opening.initAnimFrame > opening.initAnimInitFrame * 0.75) {
        display.cx.fillStyle = '#000';
        display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom)
    } else if (opening.initAnimFrame === Math.floor(opening.initAnimInitFrame * 0.75)) {
        display.audioManager.play(new Sound('sfx', 'audio/smw_coin.wav'));
    }
    if (opening.endAnimFrame) display.fadeEffect('#000', opening.endAnimFrame, opening.endAnimEndFrame);
}