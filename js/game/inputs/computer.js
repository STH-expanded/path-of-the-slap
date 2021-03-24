class Computer extends Player {
    sequences = [{
        frames: 60,
        fit: (fight, character) => debugMode.cpu ? 2 : 0,
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
            3: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: true,
                a: false,
                b: false,
                start: false
            }),
            4: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            5: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: true,
                b: false,
                start: false
            }),
            6: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            39: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            40: (fight, character) => ({
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
            3: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: true,
                a: true,
                b: false,
                start: false
            }),
            4: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            17: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: true,
                b: false,
                start: false
            }),
            18: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            34: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: true,
                start: false
            }),
            35: (fight, character) => ({
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
            3: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: true,
                a: false,
                b: false,
                start: false
            }),
            4: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            5: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: true,
                b: false,
                start: false
            }),
            6: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            39: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            40: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            41: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
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
            })
        }
    },
    {
        // dash + AerialB
        frames: 60,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            5: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            11: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            17: (fight, character) => ({
                left: !character.direction,
                up: true,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            28: (fight, character) => ({
                left: !character.direction,
                up: true,
                right: character.direction,
                down: false,
                a: false,
                b: true,
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
    },
    {
        // move forward 
        frames: 121,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                left: !character.direction,
                up: false,
                right: character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            120: (fight, character) => ({
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
        // move backward
        frames: 121,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                left: character.direction,
                up: false,
                right: !character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            120: (fight, character) => ({
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
        // block
        frames: 121,
        fit: (fight, character) => {
            let i = 0;
            fight.actors.forEach(actor => {
                if (Math.abs(actor.collisionBox.center().x - fight.players[1].character.collisionBox.center().x) < 100) {
                    i = 1;
                }
            });
            return i;
        },
        steps: {
            0: (fight, character) => ({
                left: character.direction,
                up: false,
                right: !character.direction,
                down: false,
                a: false,
                b: false,
                start: false
            }),
            120: (fight, character) => ({
                left: false,
                up: false,
                right: false,
                down: false,
                a: false,
                b: false,
                start: false
            })
        }
    }];
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