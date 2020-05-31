class PauseMenu extends Menu {
    constructor(options, optionYCenter, handler, fight) {
        super(options, optionYCenter, handler);
        this.display = MenuDisplay;
        this.fight = fight;
        this.nextActivity = null;

        this.cursor = 0;

        this.initAnimInitFrame = 10;
        this.initAnimFrame = this.initAnimInitFrame;

        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;
    }

    update = game => {
        if (this.initAnimFrame) this.initAnimFrame--;
        if (this.nextActivity) {
            if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
            else this.endAnimFrame++;
        } else if (!this.initAnimFrame && !this.endAnimFrame) {
            [this.fight.player1, this.fight.player2].forEach(player => {
                var input = player.id !== 'computer' ? game.inputList.get(player.id) : null;
                var lastinput = player.id !== 'computer' ? game.lastInputList.get(player.id) : null;
                if (input && lastinput) {
                    if (input.a && !lastinput.a) this.nextActivity = this.handler(game, this.options, this.cursor);
                    else if (input.b && !lastinput.b) this.fight.pauseMenu = null;
                    else {
                        if (input.up && !lastinput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                        if (input.down && !lastinput.down) this.cursor = (this.cursor + 1) % this.options.length;
                    }
                }
            });
        }
    }
}