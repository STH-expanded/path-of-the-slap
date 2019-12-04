class Fight {
  constructor(player1, player2, stage) {
    this.player1 = player1;
    this.player2 = player2;
    this.stage = stage;
    this.timer = 600;
    this.player1Life = 1000;
    this.player2Life = 1000;

    this.update = game => {
      this.timerDown();

      // tout le reste de la logique pour retirer les pv

      this.checkVictory(game);
    };
  }

  timerDown = () => {
    this.timer -= 1;
  };

  checkVictory = game => {
    let winner;
    if (this.player1Life === 0 || (this.player1Life < this.player2Life && this.timer === 0)) {
      winner = this.player2;
      game.gameState = game.gameStateEnum.ENDMENU;
    } else if (this.player2Life === 0 || (this.player2Life < this.player1Life && this.timer === 0)) {
      winner = this.player1;
      game.gameState = game.gameStateEnum.ENDMENU;
    } else if (
      (this.player1Life === 0 && this.player2Life === 0) ||
      (this.player1Life === this.player2Life && this.timer === 0)
    ) {
      game.gameState = game.gameStateEnum.ENDMENU;
    }
  };
}
