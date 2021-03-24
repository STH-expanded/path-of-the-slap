class Computer extends Player {
    sequences = [{
        frames: 60,
        fit: (fight, character) => debugMode.cpu ? 2 : 0,
        steps: {
            0: (fight, character) => ({
                left: false,
                up: true,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            })
        }
    }
  ];
    sequence = this.sequences[0];
    sequenceIndex = 1;

    getInput = activity => {
        if (this.sequenceIndex > this.sequence.frames) {
            this.sequenceIndex = 1;
            const max_fitness = Math.max.apply(Math, this.sequences.map(sequence => sequence.fit(activity, this.character)));
            const possibleSequences = this.sequences.filter(sequence => sequence.fit(activity, this.character) === max_fitness);
            this.sequence = possibleSequences[Math.floor(Math.random() * possibleSequences.length)];
        }
        this.sequenceIndex++;
        return this.sequence.steps[Object.keys(this.sequence.steps).reverse().find(step => step <= this.sequenceIndex)](activity, this.character);
    }
}