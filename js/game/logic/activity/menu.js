class Menu extends Activity {
    constructor(options, optionYCenter, handler) {
        super();
        this.display = MenuDisplay;
        this.nextActivity = null;

        this.options = options;
        this.optionYCenter = optionYCenter;
        this.handler = handler;
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
            game.inputList.forEach((input, id) => {
                game.lastInputList.forEach((lastinput, lastid) => {
                    if (id === lastid) {
                        if (input.a && !lastinput.a) this.nextActivity = this.handler(game, this.options, this.cursor);
                        else {
                            if (input.up && !lastinput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                            if (input.down && !lastinput.down) this.cursor = (this.cursor + 1) % this.options.length;
                        }
                    }
                });
            });
        }
    }
}