class Player {
    constructor(id) {
        this.id = id;

        this.inputList = [];

        this.character = null;
        this.winCount = 0;

        this.updateLastInputs = inputs => {
            if (this.inputList.length > 0 && JSON.stringify(inputs) === JSON.stringify(this.inputList[this.inputList.length - 1].inputs)) {
                this.inputList[this.inputList.length - 1].frames++;
            } else {
                if (this.inputList.length === 10) this.inputList.splice(0, 1);
                this.inputList.push({
                    inputs: JSON.parse(JSON.stringify(inputs)),
                    frames: 1
                });
            }
        }

        this.update = game => {
            this.updateLastInputs(id !== 'computer' ? game.inputList.get(this.id) : {});
            if (game.activity) this.character.update(game, this.inputList);
        };
    }
}