class MainMenu extends AbstractMenu {
    constructor() {
        super();
        this.options = ['Computer', 'Player', 'Training'];
        this.optionYCenter = 4;
    }
    
    handler = game => {
        const players = Object.values(game.players);
        return this.options[this.cursor] === 'Player' && players.length < 2 ? null :
            new CharacterSelection(this.options[this.cursor], Game.CHARACTERS, Game.STAGES,
                [players[0], this.options[this.cursor] === 'Player' ? players[1] : new Computer()]
            );
    }
}