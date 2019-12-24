class CharacterSelection {
    constructor(mode) {
        this.cursor = new Vector2D(0, 2);
        this.cursorLimit = new Vector2D(3, 5);
        this.mode = mode;

        this.initAnimFrame = 60;
        this.mugshotOrder = [
            [56, 36, 32, 44, 48],
            [52, 40, 28, 40, 52],
            [48, 44, 32, 36, 56]
        ];

        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;
        this.nextGameState = null;

        this.playerController = 0;

        this.player1 = null;
        this.player1Pos = null;
        this.player2 = null;
        this.player2Pos = null;

        this.selectCharacter = pos => {
            var character = null;
            switch (pos.x + '' + pos.y) {
                case '00':
                    character = new Mario();
                    break;
                case '10':
                    character = new Character();
                    break;
                case '20':
                    character = new Character();
                    break;
                case '01':
                    character = new Character();
                    break;
                case '11':
                    character = new Character();
                    break;
                case '21':
                    character = new Character();
                    break;
                case '02':
                    character = new Character();
                    break;
                case '12':
                    character = new Mario();
                    break;
                case '22':
                    character = new Mario();
                    break;
                case '03':
                    character = new Mario();
                    break;
                case '13':
                    character = new Mario();
                    break;
                case '23':
                    character = new Mario();
                    break;
                case '04':
                    character = new Mario();
                    break;
                case '14':
                    character = new Mario();
                    break;
                case '24':
                    character = new Character();
                    break;
                default:
                    console.log('ERROR : WRONG CURSOR VALUE');
                    break;
            }
            return character;
        }

        this.update = game => {
            if (this.initAnimFrame) this.initAnimFrame--;
            if (this.nextGameState) {
                if (this.endAnimFrame >= this.endAnimEndFrame) game.gameState = this.nextGameState;
                else this.endAnimFrame++;
            }
            else if (this.playerController < game.players.length & !this.initAnimFrame & !this.endAnimFrame) {
                var id = game.players[this.playerController].id;
                var input = game.inputList.get(id);
                var lastInput = game.lastInputList.get(id);

                if (input.b) this.nextGameState = game.gameStateEnum.MAINMENU;
                else {
                    if (input.a && !lastInput.a && this.selectCharacter(this.cursor)) {
                        if (!this.player1) {
                            this.player1 = game.players[0];
                            this.player1.character = this.selectCharacter(this.cursor);
                            this.player1Pos = new Vector2D(this.cursor.x, this.cursor.y);

                            this.cursor = new Vector2D(2, 2);
                            if (this.mode === 'playerVSplayer') this.playerController++;
                            
                        } else if (!this.player2) {
                            this.player2 = this.mode === 'playerVSplayer' ? game.players[1] : new Player('computer', {}, 'computer');
                            this.player2.character = this.selectCharacter(this.cursor);
                            this.player2Pos = new Vector2D(this.cursor.x, this.cursor.y);
                        }

                        if (this.player1 && this.player2) {
                            game.fight = new Fight(this.player1, this.player2, game.stages[0]);
                            game.fight.initFight(true);
                            this.nextGameState = game.gameStateEnum.FIGHT;
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
        }
    }
}