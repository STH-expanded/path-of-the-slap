class PauseMenu extends AbstractMenu {
    constructor(fight) {
        super();
        this.options = ["Resume", "Rematch", "CharacterSelection", "MainMenu"];
        this.optionYCenter = 2;
        this.fight = fight;
    }

    // BROKEN STATE
    update = game => {
        this.fight.players.forEach(player => {
            const currentInput = player.inputHistory.frame.length > 0 ? player.inputHistory.frame[player.inputHistory.frame.length - 1] : {};
            const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
            if (currentInput.a && !lastInput.a) this.nextActivity = this.handler(game);
            else if (currentInput.start && !lastInput.start) this.fight.pauseMenu = null;
            else {
                if (currentInput.up && !lastInput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (currentInput.down && !lastInput.down) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    handler = game => {
        if (this.options[this.cursor] === "Resume") this.fight.pauseMenu = null;
        return this.options[this.cursor] === "Resume" ? null :
            this.options[this.cursor] === "Rematch" ? new Fight(
                game.lastFight.players,
                game.lastFight.stage,
                game.activity.trainingMode,
                true
            ) :
            this.options[this.cursor] === "CharacterSelection" ? new CharacterSelection(
                game.activity.trainingMode ? "Training" : game.activity.player2 instanceof Computer ? "Player" : "Computer",
                Game.CHARACTERS, Game.STAGES,
                game.lastFight.players
            ) :
            this.options[this.cursor] === "MainMenu" ? new MainMenu() : null;
    }
}