class CharacterSelection {
    constructor(characters, option) {
        this.cursor = new Vector2D(0, 0);
        this.characters = characters;

        this.update = game => {
            game.inputList.forEach((input, id) => {
                game.lastInputList.forEach((lastInput, lastId) => {
                    if (id === lastId) {
                        if (input.a && !lastInput.a) {
                            console.log("x:" + this.cursor.x + ' y:' + this.cursor.y);
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