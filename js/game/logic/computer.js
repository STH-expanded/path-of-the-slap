class Computer extends Player {
    constructor() {
        super();
        this.sequenceIndex = 0; //frame
        this.sequence = {
            frames: 60,
            steps: {
                0: {
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                },
                1: {
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }
            }
        }
    }

    getInput = (activity) => {
        let input = null;

        if (activity instanceof Fight) {
            input = this.sequence.steps[Object.keys(this.sequence.steps).reverse().find(step => step <= this.sequenceIndex)];
        }

        this.sequenceIndex++;
        if (this.sequenceIndex > this.sequence.frames) this.sequenceIndex = 0;


        return input;
    }
}