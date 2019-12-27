class Fight extends Activity {
    constructor(players, stage, winReset) {
        super();
        this.display = FightDisplay;
        this.nextActivity = null;

        this.player1 = players[0];
        this.player2 = players[1];
        this.stage = stage;

        this.timer = 120;

        this.winners = [];
        this.playoff = 2;

        this.update = game => {
            [this.player1, this.player2].forEach(player => player.update(game));

            this.timer--;

            this.winners = this.checkWinners();
            if (this.winners.length > 0) {
                this.winners.forEach(winner => winner.winCount++);
                game.lastFight.players = [this.player1, this.player2];
                game.lastFight.stage = this.stage;
                game.activity = (this.winners.find(winner => winner.winCount === this.playoff)) ?
                    new Menu(game.endMenuOptions, game.endMenuHandler) :
                    new Fight([this.player1, this.player2], this.stage, false);
            }
        };

        this.checkWinners = () => {
            let p1Health = this.player1.character.health;
            let p2Health = this.player2.character.health;
            if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && this.timer <= 0)) return [this.player1, this.player2];
            else if (p2Health <= 0 || (p1Health > p2Health && this.timer <= 0)) return [this.player1];
            else if (p1Health <= 0 || (p1Health < p2Health && this.timer <= 0)) return [this.player2];
            return [];
        }
        
        this.initFight = winReset => {
            if (winReset) {
                this.player1.winCount = 0;
                this.player2.winCount = 0;
            }
            this.player1.character.health = this.player1.character.maxHealth;
            this.player2.character.health = this.player2.character.maxHealth;
            this.player1.character.pos = new Vector2D(
                Math.floor(this.stage.size.x / 3) - this.player1.character.size.x / 2,
                270 - 16 - this.player1.character.size.y
            );
            this.player2.character.pos = new Vector2D(
                Math.floor(this.stage.size.x / 3 * 2) - this.player2.character.size.x / 2,
                270 - 16 - this.player2.character.size.y
            );
        }
        this.initFight(winReset);
    }
}