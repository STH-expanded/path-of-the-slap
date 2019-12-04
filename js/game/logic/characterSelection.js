class CharacterSelection {
    constructor(characters, mode) {
        this.cursor = new Vector2D(0, 0);
        this.characters = characters;
        this.mode = mode;

        this.update = game => {
            game.inputList.forEach((input, id) => {
                game.lastInputList.forEach((lastInput, lastId) => {
                    if (id === lastId) {
                        if (input.a && !lastInput.a) {
                            console.log("x:" + this.cursor.x + ' y:' + this.cursor.y);
                            game.fight = new Fight();
                            game.gameState = game.gameStateEnum.FIGHT;
                        }
                        if (input.b) {
                            game.gameState = game.gameStateEnum.MAINMENU;
                        }
                        if (input.up && !lastInput.up) {
                            this.cursor.y = (((this.cursor.y - 1) % this.characters.length) + this.characters.length) % this.characters.length;
                        }
                        if (input.down && !lastInput.down) {
                            this.cursor.y = (((this.cursor.y + 1) % this.characters.length) + this.characters.length) % this.characters.length;
                        }
                    }
                });
            });
        }
    }
}