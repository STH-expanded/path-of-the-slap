class Fight {
    constructor(player1, player2, stage) {
        this.player1 = player1;
        this.player2 = player2;
        this.stage = stage;

        this.timer = 3600;

        this.winner = null;

        this.update = game => {
            [this.player1, this.player2].forEach(player => player.update(game));

            this.winner = this.checkWinner();
            if (this.winner) {
                game.gameState = game.gameStateEnum.ENDMENU;
            }
            
            this.timer--;
        };
    }

    checkWinner = () => {
        let p1Health = this.player1.character.health;
        let p2Health = this.player2.character.health;
        if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && this.timer <= 0)) return 'draw';
        else if (p2Health <= 0 || (p1Health > p2Health && this.timer <= 0)) return 'player1';
        else if (p1Health <= 0 || (p1Health < p2Health && this.timer <= 0)) return 'player2';
        return null;
    };
}