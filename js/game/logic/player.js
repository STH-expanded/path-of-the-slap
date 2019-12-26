class Player {
    constructor(id) {
        this.id = id;

        this.inputs = null;
        this.lastInputs = [];

        this.character = null;
        this.winCount = 0;

        this.updateLastInputs = () => {
            if (this.lastInputs.length > 0 &&
                JSON.stringify(this.inputs) === JSON.stringify(this.lastInputs[this.lastInputs.length - 1].inputs)
                ) this.lastInputs[this.lastInputs.length - 1].frames++;
            else {
                if (this.lastInputs.length === 10) this.lastInputs.splice(0, 1);
                this.lastInputs.push({
                    inputs: JSON.parse(JSON.stringify(this.inputs)),
                    frames: 1
                });
            }
        }

        this.update = game => {
            this.inputs = id !== 'computer' ? game.inputList.get(this.id) : {};
            this.updateLastInputs();

            if (game.activity) this.character.update(game, this.inputs);
        };
    }
}