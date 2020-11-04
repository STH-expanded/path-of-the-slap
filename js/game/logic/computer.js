class Computer extends Player {
    constructor() {
        super();
        this.inputComputer = {
            left: false,
            up: false,
            right: false,
            down: false,
            a: false,
            b: false,
            start: false
        }

    }

    getInput = activity => {
        if (activity instanceof Fight) {
            this.inputComputer.a = true;
        }
        return this.inputComputer;
    }
}