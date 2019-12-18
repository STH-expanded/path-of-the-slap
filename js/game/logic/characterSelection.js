class CharacterSelection {
    constructor(characters, mode) {
        this.cursor = new Vector2D(0, 0);
        this.characters = characters;
        this.mode = mode;

        this.playerController = 0;

        this.player1 = null;
        this.player2 = null;

        this.update = game => {
            if (this.playerController < game.players.length) {
                var id = game.players[this.playerController].id;
                var input = game.inputList.get(id);
                var lastInput = game.lastInputList.get(id);

                if (input.b) game.gameState = game.gameStateEnum.MAINMENU;
                else {
                    if (input.a && !lastInput.a) {
                        if (!this.player1) {
                            this.player1 = game.players[0];
                            this.player1.character = new Character(this.player1.keys);
                            if (this.mode === 'playerVSplayer') this.playerController++;
                        } else if (!this.player2) {
                            this.player2 = this.mode === 'playerVSplayer' ? game.players[1] : new Player('computer', this.player1.keys, 'computer');
                            this.player2.character = new Character(this.player2.keys);
                        }

                        if (this.player1 && this.player2) {
                            game.fight = new Fight(this.player1, this.player2, game.stages[0]);
                            game.gameState = game.gameStateEnum.FIGHT;
                        }
                    }

                    if (input.up && !lastInput.up) {
                        this.cursor.y = (((this.cursor.y - 1) % this.characters.length) + this.characters.length) % this.characters.length;
                    }

                    if (input.down && !lastInput.down) {
                        this.cursor.y = (((this.cursor.y + 1) % this.characters.length) + this.characters.length) % this.characters.length;
                    }
                }
            }
        }
    }
}