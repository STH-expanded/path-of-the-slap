class Computer extends Player {
    constructor() {
        super();
        this.sequenceIndex = 0; //frame
        this.sequences = [{
            //lowA + highA + highB
            frames: 65,
            fit: (fight, character) => {
                const p1 = fight.players[0].character.collisionBox;
                const p2 = fight.players[1].character.collisionBox;
                const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
                const hit_dist = 80 - character.collisionBox.size.x / 2;
                return hit_dist >= dist ? 1 : 0;
            },
            steps: {
                0: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: false,
                    start: false
                }),
                1: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: true,
                    b: false,
                    start: false
                }),
                2: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                15: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                }),
                16: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                32: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: true,
                    start: false
                }),
                33: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                })
            }
        },
        {
            // lowB + Reculer + QCF
            frames: 100,
            fit: (fight, character) => {
                const p1 = fight.players[0].character.collisionBox;
                const p2 = fight.players[1].character.collisionBox;
                const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
                const hit_dist = 80 - character.collisionBox.size.x / 2;
                return hit_dist >= dist ? 1 : 0;
            },
            steps: {
                0: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: false,
                    start: false
                }),
                1: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: true,
                    start: false
                }),
                2: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                33: (fight, character) => ({
                    left: character.direction,
                    up: false,
                    right: !character.direction,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                64: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                65: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: false,
                    start: false
                }),
                66: (fight, character) => ({
                    left: !character.direction,
                    up: false,
                    right: character.direction,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                67: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                })
            }
        },
        {
            // QCF + dash
            frames: 60,
            fit: (fight, character) => .05,
            steps: {
                0: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: false,
                    start: false
                }),
                1: (fight, character) => ({
                    left: !character.direction,
                    up: false,
                    right: character.direction,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                2: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                }),
                3: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                36: (fight, character) => ({
                    left: !character.direction,
                    up: false,
                    right: character.direction,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                37: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                38: (fight, character) => ({
                    left: !character.direction,
                    up: false,
                    right: character.direction,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                39: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                })
            }
        },
        {
            // AerialB + HighA + HighA + HighB
            frames: 90,
            fit: (fight, character) => {
                const p1 = fight.players[0].character.collisionBox;
                const p2 = fight.players[1].character.collisionBox;
                const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
                const hit_dist = 80 - character.collisionBox.size.x / 2;
                return hit_dist >= dist ? 1 : 0;
            },
            steps: {
                0: (fight, character) => ({
                    left: false,
                    up: true,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                1: (fight, character) => ({
                    left: false,
                    up: true,
                    right: false,
                    down: false,
                    a: false,
                    b: true,
                    start: false
                }),
                2: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                25: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                }),
                26: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                41: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                }),
                42: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                57: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: true,
                    start: false
                }),
                58: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                })
            }
        },
        {
            // LowB + AerialA + HighB
            frames: 90,
            fit: (fight, character) => {
                const p1 = fight.players[0].character.collisionBox;
                const p2 = fight.players[1].character.collisionBox;
                const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
                const hit_dist = 80 - character.collisionBox.size.x / 2;
                return hit_dist >= dist ? 1 : 0;
            },
            steps: {
                0: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: false,
                    start: false
                }),
                1: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: true,
                    a: false,
                    b: true,
                    start: false
                }),
                2: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                32: (fight, character) => ({
                    left: false,
                    up: true,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                33: (fight, character) => ({
                    left: false,
                    up: true,
                    right: false,
                    down: false,
                    a: true,
                    b: false,
                    start: false
                }),
                34: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                }),
                59: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: true,
                    start: false
                }),
                60: (fight, character) => ({
                    left: false,
                    up: false,
                    right: false,
                    down: false,
                    a: false,
                    b: false,
                    start: false
                })
            }
        }
        ];
        this.sequence = this.sequences[0];
    }

    getInput = (activity) => {
        let input = null;

        input = this.sequence.steps[Object.keys(this.sequence.steps).reverse().find(step => step <= this.sequenceIndex)](activity, this.character);

        this.sequenceIndex++;
        if (this.sequenceIndex > this.sequence.frames) {
            this.sequenceIndex = 0;
            const max_fitness = Math.max.apply(Math, this.sequences.map(sequence => sequence.fit(activity, this.character)));
            const possibleSequences = this.sequences.filter(sequence => sequence.fit(activity, this.character) === max_fitness);
            this.sequence = possibleSequences[Math.floor(Math.random() * possibleSequences.length)];
        }

        return input;
    }
}