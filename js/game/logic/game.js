class Game {
    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;
        this.lastInputList = new Map();

        this.activity = new Opening();

        this.players = [];

        this.lastFight = {
            players: [],
            stage: null
        }

        this.stages = [
            Stage,
            ChildStage,
            ChildStage,
            Stage,
            Stage,
            Stage,
            ChildStage,
            Stage,
            ChildStage,
            ChildStage,
            Stage
        ];

        this.characters = [
            null,
            null,
            null,
            null,
            ChildCharacter2,
            null,
            Character,
            null,
            ChildCharacter,
            null,
            ChildCharacter3,
            null,
            null,
            null,
            null
        ];

        // Main Menu
        this.mainMenuOptions = ['Player', 'Computer', 'Training'];
        this.mainMenuOptionYCenter = 3;
        this.mainMenuHandler = (game, options, cursor) => {
            var nextActivity = null;
            if (!(options[cursor] === 'Player' && game.players.length < 2)) {
                nextActivity = new CharacterSelection(
                    options[cursor],
                    game.characters,
                    game.stages,
                    [
                        game.players[0],
                        options[cursor] === 'Player' ? game.players[1] : new Player('computer')
                    ]
                );
            }
            return nextActivity;
        };

        // End Menu
        this.endMenuOptions = ['Rematch', 'CharacterSelection', 'MainMenu'];
        this.endMenuOptionYCenter = 2;
        this.endMenuHandler = (game, options, cursor) => {
            var nextActivity = null;
            switch (options[cursor]) {
                case 'Rematch':
                    nextActivity = new Fight(game.lastFight.players, game.lastFight.stage, false, true,0);
                    break;
                case 'CharacterSelection':
                    nextActivity = new CharacterSelection(options[cursor], game.characters, game.stages, game.lastFight.players);
                    break;
                case 'MainMenu':
                    nextActivity = new Menu(game.mainMenuOptions, game.mainMenuOptionYCenter, game.mainMenuHandler);
                    break;
            }
            return nextActivity;
        };

        this.update = () => {
            if (this.inputList.size !== this.players.size) {
                this.inputList.forEach((input, id) => {
                    if (!this.players.find(player => player.id === id)) this.players.push(new Player(id));
                });
            }

            this.activity.update(this);

            this.inputList.forEach((input, id) => this.lastInputList.set(id, { ...input }));
            this.frame++;
        };
    }
}