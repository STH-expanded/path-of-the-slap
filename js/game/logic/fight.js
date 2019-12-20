class Fight {
    constructor(player1, player2, stage) {
        this.player1 = player1;
        this.player2 = player2;
        this.stage = stage;

        this.timer = 3600;

        this.winners = [];
        this.playoff = 2;

        this.update = game => {
            [this.player1, this.player2].forEach(player => {
                this.assignKeys(player, game);
                player.update(game);
            });

            this.timer--;

            this.winners = this.checkWinners();
            if (this.winners.length > 0) {
                this.winners.forEach(winner => winner.winCount++);
                if (this.winners.find(winner => winner.winCount === this.playoff)) {
                    game.gameState = game.gameStateEnum.ENDMENU;
                } else {
                    this.player1.character.health = this.player1.character.maxHealth;
                    this.player2.character.health = this.player2.character.maxHealth;
                    game.fight = new Fight(this.player1, this.player2, this.stage);
                }
            }
        };

        this.assignKeys = (player, game) => {
            game.inputList.forEach((keys, id) => {
                if (id === player.id) player.keys = keys;
            });
        }

        this.checkWinners = () => {
            let p1Health = this.player1.character.health;
            let p2Health = this.player2.character.health;
            if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && this.timer <= 0)) return [this.player1, this.player2];
            else if (p2Health <= 0 || (p1Health > p2Health && this.timer <= 0)) return [this.player1];
            else if (p1Health <= 0 || (p1Health < p2Health && this.timer <= 0)) return [this.player2];
            return [];
        }
    }
}