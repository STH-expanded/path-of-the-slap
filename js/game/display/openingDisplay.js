class OpeningDisplay extends ActivityDisplay {}
OpeningDisplay.update = display => {
    const cx = display.cx;
    const opening = display.game.activity;

    // Background
    cx.fillStyle = '#000';
    cx.fillRect(0, 0, display.width, display.height);

    cx.drawImage(
        display.assets.images.opening,
        0, 0,
        128, 24,
        display.width / 2 - 64,
        display.height / 2 - 12,
        128,
        24
    );

    // Animation
    if (opening.initAnimFrame > opening.initAnimInitFrame * 0.75) {
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, display.width, display.height);
    } else if (opening.initAnimFrame === Math.floor(opening.initAnimInitFrame * 0.75)) {
        display.audioManager.play(new Sound('sfx', 'audio/smw_coin.wav'));
    }
    if (opening.endAnimFrame) display.fadeEffect('#000', opening.endAnimFrame, opening.endAnimEndFrame);
}