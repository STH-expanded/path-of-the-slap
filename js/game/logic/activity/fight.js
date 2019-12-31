class Fight extends Activity {
    constructor(players, stage, winReset) {
        super();
        this.display = FightDisplay;
        this.nextActivity = null;

        this.player1 = players[0];
        this.player2 = players[1];
        this.stage = stage;

        this.timer = 5400;

        this.winners = [];
        this.playoff = 2;

        this.update = game => {
            [this.player1, this.player2].forEach(player => player.update(game));

            this.timer--;

            this.winners = this.checkWinners(this.player1.character.health, this.player2.character.health, this.timer);
            if (this.winners.length > 0) {
                this.winners.forEach(winner => winner.winCount++);
                game.lastFight.players = [this.player1, this.player2];
                game.lastFight.stage = this.stage;
                game.activity = (this.winners.find(winner => winner.winCount === this.playoff)) ?
                    new Menu(game.endMenuOptions, game.endMenuOptionYCenter, game.endMenuHandler) :
                    new Fight([this.player1, this.player2], this.stage, false);
            }
        };

        this.checkWinners = (p1Health, p2Health, timer) => {
            if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && timer <= 0)) return [this.player1, this.player2];
            else if (p2Health <= 0 || (p1Health > p2Health && timer <= 0)) return [this.player1];
            else if (p1Health <= 0 || (p1Health < p2Health && timer <= 0)) return [this.player2];
            return [];
        }
        
        this.initFight = winReset => {
            [this.player1, this.player2].forEach((player, index) => {
                if (winReset) player.winCount = 0;
                player.character.health = player.character.maxHealth;
                player.character.pos = new Vector2D(
                    Math.floor(this.stage.size.x / 3 * (1 + index)) - player.character.size.x / 2,
                    270 - 16 - player.character.size.y
                );
                player.inputList = [];
                player.character.inputList = null;
            });
        }
        this.initFight(winReset);
    }
}