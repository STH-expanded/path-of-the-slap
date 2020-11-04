class AbstractMenu extends Activity {
    constructor() {
        super();
        this.display = MenuDisplay;

        this.initAnimInitFrame = 10;
        this.initAnimFrame = this.initAnimInitFrame;
        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;
        
        this.cursor = 0;
        this.options = [];
        this.optionYCenter = 0;
    }

    update = game => {
        Object.values(game.players).forEach(player => {
            const currentInput = player.inputHistory.frame[player.inputHistory.frame.length - 1];
            const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
            if (currentInput.a && !lastInput.a) this.nextActivity = this.handler(game);
            else {
                if (currentInput.up && !lastInput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (currentInput.down && !lastInput.down) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    handler = () => {}
}