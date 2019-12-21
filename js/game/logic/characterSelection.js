class CharacterSelection {
    constructor(mode) {
        this.cursor = new Vector2D(1, 2);
        this.cursorLimit = new Vector2D(3, 5);
        this.mode = mode;

        this.playerController = 0;

        this.player1 = null;
        this.player1Pos = null;
        this.player2 = null;
        this.player2Pos = null;

        this.selectCharacter = keys => {
            var character = null;
            switch (this.cursor.x + '' + this.cursor.y) {
                case '00':
                    character = new Mario(keys);
                    break;
                case '10':
                    character = new Character(keys);
                    break;
                case '20':
                    character = null;
                    break;
                case '01':
                    character = null;
                    break;
                case '11':
                    character = null;
                    break;
                case '21':
                    character = null;
                    break;
                case '02':
                    character = null;
                    break;
                case '12':
                    character = null;
                    break;
                case '22':
                    character = null;
                    break;
                case '03':
                    character = null;
                    break;
                case '13':
                    character = null;
                    break;
                case '23':
                    character = null;
                    break;
                case '04':
                    character = null;
                    break;
                case '14':
                    character = null;
                    break;
                case '24':
                    character = null;
                    break;
                default:
                    console.log('ERROR : WRONG CURSOR VALUE');
                    break;
            }
            return character;
        }

        this.update = game => {
            if (this.playerController < game.players.length) {
                var id = game.players[this.playerController].id;
                var input = game.inputList.get(id);
                var lastInput = game.lastInputList.get(id);

                if (input.b) game.gameState = game.gameStateEnum.MAINMENU;
                else {
                    if (input.a && !lastInput.a && this.selectCharacter(null)) {
                        if (!this.player1) {
                            this.player1 = game.players[0];
                            this.player1.character = this.selectCharacter(this.player1.keys);
                            this.player1Pos = new Vector2D(this.cursor.x, this.cursor.y);
                            this.cursor = new Vector2D(1, 2);
                            if (this.mode === 'playerVSplayer') this.playerController++;
                        } else if (!this.player2) {
                            this.player2 = this.mode === 'playerVSplayer' ? game.players[1] : new Player('computer', {}, 'computer');
                            this.player2.character = this.selectCharacter(this.player2.keys);
                            this.player2Pos = new Vector2D(this.cursor.x, this.cursor.y);
                        }

                        if (this.player1 && this.player2) {
                            game.fight = new Fight(this.player1, this.player2, game.stages[0]);
                            game.fight.initFight(true);
                            game.gameState = game.gameStateEnum.FIGHT;
                        }
                    }

                    if (input.up && !lastInput.up) {
                        this.cursor.y = (((this.cursor.y - 1) % this.cursorLimit.y) + this.cursorLimit.y) % this.cursorLimit.y;
                    }

                    if (input.down && !lastInput.down) {
                        this.cursor.y = (((this.cursor.y + 1) % this.cursorLimit.y) + this.cursorLimit.y) % this.cursorLimit.y;
                    }

                    if (input.left && !lastInput.left) {
                        this.cursor.x = (((this.cursor.x - 1) % this.cursorLimit.x) + this.cursorLimit.x) % this.cursorLimit.x;
                    }

                    if (input.right && !lastInput.right) {
                        this.cursor.x = (((this.cursor.x + 1) % this.cursorLimit.x) + this.cursorLimit.x) % this.cursorLimit.x;
                    }
                }
            }
        };
    }
}