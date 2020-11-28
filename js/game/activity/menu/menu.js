class AbstractMenu extends Activity {
    display = MenuDisplay;
    
    cursor = 0;

    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame);
        this.options = options;
        this.optionYCenter = optionYCenter;
    }

    update = game => {
        Object.values(game.players).forEach(player => {
            const currentInput = player.inputHistory.frame[player.inputHistory.frame.length - 1];
            const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
            if (currentInput.a && !lastInput.a) this.nextActivity = this.optionHandler(game);
            else {
                if (currentInput.up && !lastInput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (currentInput.down && !lastInput.down) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    optionHandler = () => {}
}

class MainMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
    }

    optionHandler = game => {
        const players = Object.values(game.players);
        return this.options[this.cursor] === 'Player' && players.length < 2 ? null :
            new CharacterSelection(60, 10, this.options[this.cursor], Game.CHARACTERS, Game.STAGES,
                [players[0], this.options[this.cursor] === 'Player' ? players[1] : game.computer]
            );
    }
}

class PauseMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter, fight) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
        this.fight = fight;
    }

    update = game => {
        this.fight.players.forEach(player => {
            const currentInput = player.inputHistory.frame.length > 0 ? player.inputHistory.frame[player.inputHistory.frame.length - 1] : {};
            const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
            if (currentInput.a && !lastInput.a) this.nextActivity = this.optionHandler(game);
            else if (currentInput.start && !lastInput.start) this.fight.pauseMenu = null;
            else {
                if (currentInput.up && !lastInput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (currentInput.down && !lastInput.down) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    optionHandler = game => {
        if (this.options[this.cursor] === "Resume") this.fight.pauseMenu = null;
        return this.options[this.cursor] === "Resume" ? null :
            this.options[this.cursor] === "Rematch" ? new Fight(game.activity.trainingMode ? 0 : 60, 60,
                game.lastFight.players,
                game.lastFight.stage,
                game.activity.trainingMode
            ) :
            this.options[this.cursor] === "CharacterSelection" ? new CharacterSelection(60, 10,
                game.activity.trainingMode ? "Training" : game.activity.players[1] instanceof Computer ? "Computer" : "Player",
                Game.CHARACTERS, Game.STAGES,
                game.lastFight.players
            ) :
            this.options[this.cursor] === "MainMenu" ? new MainMenu(10, 10, ['Computer', 'Player', 'Training'], 4) : null;
    }
}

class EndMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
    }

    optionHandler = game => (this.options[this.cursor] === 'Rematch' ? new Fight(60, 60, game.lastFight.players, game.lastFight.stage, false) :
        this.options[this.cursor] === 'CharacterSelection' ? new CharacterSelection(60, 10, this.options[this.cursor], Game.CHARACTERS, Game.STAGES, game.lastFight.players) :
        this.options[this.cursor] === 'MainMenu' ? new MainMenu(10, 10, ['Computer', 'Player', 'Training'], 4) : null);
}