class Fight extends Activity {
    constructor(players, stage, trainingMode, winReset) {
        super();
        this.display = FightDisplay;
        this.trainingMode = trainingMode;
        this.nextActivity = null;

        this.player1 = players[0];
        this.player2 = players[1];
        this.stage = stage;

        this.timer = 5400;

        this.winners = [];
        this.playoff = 2;

        this.pauseMenu = null;
        
        // Pause Menu
        this.pauseMenu = null;
        this.pauseMenuOptions = ['Resume', 'Rematch', 'CharacterSelection', 'MainMenu'];
        this.pauseMenuOptionYCenter = 2;
        this.pauseMenuHandler = (game, options, cursor) => {
            var nextActivity = null;
            switch (options[cursor]) {
                case 'Resume':
                    game.activity.pauseMenu = null;
                    break;
                case 'Rematch':
                    nextActivity = new Fight(game.lastFight.players, game.lastFight.stage, game.activity.trainingMode, true);
                    break;
                case 'CharacterSelection':
                    var mode = game.activity.trainingMode ? 'Training' : game.activity.player2.id !== 'computer' ? 'Player' : 'Computer';
                    nextActivity = new CharacterSelection(mode, game.characters, game.stages, game.lastFight.players);
                    break;
                case 'MainMenu':
                    nextActivity = new Menu(game.mainMenuOptions, game.mainMenuOptionYCenter, game.mainMenuHandler);
                    break;
            }
            return nextActivity;
        };

        this.update = game => {
            if (!this.pauseMenu) {
                [this.player1, this.player2].forEach(player => {
                    if (player.id !== 'computer') {
                        if (game.inputList.get(player.id).start && !game.lastInputList.get(player.id).start) {
                            game.lastFight.players = [this.player1, this.player2];
                            game.lastFight.stage = this.stage;
                            this.pauseMenu = new PauseMenu(this.pauseMenuOptions, this.pauseMenuOptionYCenter, this.pauseMenuHandler, this);
                        }
                    }
                });

                [this.player1, this.player2].forEach(player => player.update(game));

                if (!this.trainingMode) {
                    this.timer--;

                    this.winners = this.checkWinners(this.player1.character.health, this.player2.character.health, this.timer);
                    if (this.winners.length > 0) {
                        this.winners.forEach(winner => winner.winCount++);
                        game.lastFight.players = [this.player1, this.player2];
                        game.lastFight.stage = this.stage;
                        game.activity = (this.winners.find(winner => winner.winCount === this.playoff)) ?
                            new Menu(game.endMenuOptions, game.endMenuOptionYCenter, game.endMenuHandler) :
                            new Fight([this.player1, this.player2], this.stage, false, false);
                    }
                }
            }
            else this.pauseMenu.update(game);
        };

        this.checkWinners = (p1Health, p2Health, timer) => {
            if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && timer <= 0)) return [this.player1, this.player2];
            else if (p2Health <= 0 || (p1Health > p2Health && timer <= 0)) return [this.player1];
            else if (p1Health <= 0 || (p1Health < p2Health && timer <= 0)) return [this.player2];
            return [];
        };

        this.initFight = winReset => {
            [this.player1, this.player2].forEach((player, index) => {
                if (winReset) player.winCount = 0;
                player.character.health = player.character.maxHealth;
                player.character.hurtbox.playerPos = new Vector2D(Math.floor((this.stage.size.x / 3) * (1 + index)) - player.character.hurtbox.playerSize.x / 2, 270 - 16 - player.character.hurtbox.playerSize.y);
                player.inputList = [];
                player.character.inputList = null;
            });
        };
        this.initFight(winReset);
    }
}
