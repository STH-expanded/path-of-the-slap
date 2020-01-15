class Fight extends Activity {
    constructor(players, stage, trainingMode, winReset,round) {
        super();
        this.display = FightDisplay;
        this.trainingMode = trainingMode;
        this.nextActivity = null;

        this.player1 = players[0];
        this.player2 = players[1];
        this.stage = stage;
        this.round=round+1

        this.timer = 400;

        this.winners = [];
        this.playoff = 2;
        this.stoplayer =  180; // temps ou le jeux serat figé
        this.endingGame = null // game is finish

        this.update = game => {
            if (this.stoplayer === 0) {
                [this.player1, this.player2].forEach(player => player.update(game));
                
                if (!this.trainingMode) {
                    this.timer--;

                    this.winners = this.checkWinners(this.player1.character.health, this.player2.character.health, this.timer);
                    if (this.winners.length > 0) {
                        if(this.endingGame === null){
                            this.endingGame=60
                        }else if(this.endingGame===0){
                            this.winners.forEach(winner => winner.winCount++);
                            game.lastFight.players = [this.player1, this.player2];
                            game.lastFight.stage = this.stage;
                            game.activity = (this.winners.find(winner => winner.winCount === this.playoff)) ?
                                new Menu(game.endMenuOptions, game.endMenuOptionYCenter, game.endMenuHandler) :
                                new Fight([this.player1, this.player2], this.stage, false, false,1);
                        }
                    }
                }
                
            }
            if (this.endingGame>0) {
                this.endingGame--
            }
            if (this.stoplayer>0) {
                this.stoplayer--
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