class Game {
    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;
        this.lastInputList = new Map();

        this.players = [];

        this.lastFight = {
            players: [],
            stage: null
        }

        this.stages = [
            new Stage(1, 'forest', new Vector2D(0, 0), new Vector2D(480, 270 - 16))
        ];

        // Main Menu
        this.mainMenuOptions = ['Player', 'Computer', 'Practice'];
        this.mainMenuHandler = (game, options, cursor) => {
            if (!(options[cursor] === 'Player' && game.players.length < 2)) {
                game.activity = new CharacterSelection(
                    options[cursor],
                    [
                        game.players[0],
                        options[cursor] === 'Player' ? game.players[1] : new Player('computer')
                    ]
                );
            }
        };

        // End Menu
        this.endMenuOptions = ['Rematch', 'CharacterSelection', 'MainMenu'];
        this.endMenuHandler = (game, options, cursor) => {
            switch (options[cursor]) {
                case 'Rematch':
                    game.activity = new Fight(game.lastFight.players, game.lastFight.stage, true);
                    break;
                case 'CharacterSelection':
                    game.activity = new CharacterSelection(options[cursor], game.lastFight.players);
                    break;
                case 'MainMenu':
                    game.activity = new Menu(game.mainMenuOptions, game.mainMenuHandler);
                    break;
            }
        };

        this.update = () => {
            if (this.inputList.size !== this.players.size) {
                this.inputList.forEach((input, id) => {
                    if (!this.players.find(player => player.id === id)) this.players.push(new Player(id));
                });
            }

            this.activity.update(this);

            this.inputList.forEach((input, id) => this.lastInputList.set(id, JSON.parse(JSON.stringify(input))));
            this.frame++;
        };

        this.activity = new Menu(this.mainMenuOptions, this.mainMenuHandler);
    }
}