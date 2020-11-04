class EndMenu extends AbstractMenu {
    constructor() {
        super();
        this.options = ['Rematch', 'CharacterSelection', 'MainMenu'];
        this.optionYCenter = 2;
    }

    handler = game => {
        return this.options[this.cursor] === 'Rematch' ? new Fight(game.lastFight.players, game.lastFight.stage, false, true) :
            this.options[this.cursor] === 'CharacterSelection' ? new CharacterSelection(this.options[this.cursor], Game.CHARACTERS, Game.STAGES, game.lastFight.players) :
            this.options[this.cursor] === 'MainMenu' ? new MainMenu() : null;
    }
}