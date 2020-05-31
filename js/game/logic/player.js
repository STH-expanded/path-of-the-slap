class Player {
    constructor(id) {
        this.id = id;
        this.inputList = [];
        this.character = null;
        this.winCount = 0;
    }

    update = game => {
        this.updateLastInputs(this.socdCleaner(this.id !== 'computer' ? {...game.inputList.get(this.id)} : {}));
        if (game.activity) this.character.update(game, this.inputList);
    }

    socdCleaner = inputs => {
        const cleanedInputs = inputs;
        if (cleanedInputs.left && cleanedInputs.right) {
            cleanedInputs.left = false;
            cleanedInputs.right = false;
        }
        if (cleanedInputs.up && cleanedInputs.down) {
            cleanedInputs.down = false;
        }
        return cleanedInputs;
    }

    updateLastInputs = inputs => {
        if (this.inputList.length > 0 && JSON.stringify(inputs) === JSON.stringify(this.inputList[this.inputList.length - 1].inputs)) {
            this.inputList[this.inputList.length - 1].frames++;
        } else {
            if (this.inputList.length === 10) this.inputList.splice(0, 1);
            this.inputList.push({
                inputs: inputs,
                frames: 1
            });
        }
    }
}