class Opening extends Activity {
    constructor(initAnimInitFrame, endAnimEndFrame) {
        super(initAnimInitFrame, endAnimEndFrame);
    }

    update = game => {
        // Debug mode
        if (debugMode.fight) {
            game.players["keyboard"].selectedCharacter = SLING;
            game.computer.selectedCharacter = SLING;
            this.nextActivity = new Fight(60, 60,
                [game.players["keyboard"], game.computer],
                Game.TRAINING_STAGE,
                false
            );
        } else this.nextActivity = new MainMenu(10, 120, ['Computer', 'Player', 'Training'], 4);
    }
}

Opening.display = display => {
    const cx = display.cx;
    const opening = display.game.activity;

    // Background
    cx.fillStyle = '#000';
    cx.fillRect(0, 0, display.width, display.height);
    cx.drawImage(display.assets.images.opening, 0, 0, 128, 24, display.width / 2 - 64, display.height / 2 - 12, 128, 24);

    // Animation
    if (opening.initAnimFrame > opening.initAnimInitFrame * 0.75) {
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, display.width, display.height);
    } else if (opening.initAnimFrame === Math.floor(opening.initAnimInitFrame * 0.75)) {
        display.assets.sounds.coin.play();
    }
    if (opening.endAnimFrame) display.fadeEffect('#000', opening.endAnimFrame, opening.endAnimEndFrame);
}