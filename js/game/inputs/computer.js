class Computer extends Player {
    sequences = [{
        frames: 60,
        fit: (fight, character) => debugMode.cpu ? 2 : 0,
        steps: {
            0: (fight, character) => ({})
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
                down: true
            }),
            3: (fight, character) => ({
                down: true,
                a: true
            }),
            4: (fight, character) => ({
            }),
            17: (fight, character) => ({
                a: true
            }),
            18: (fight, character) => ({
            }),
            34: (fight, character) => ({
                b: true
            }),
            35: (fight, character) => ({
            })
        }
    },
    {
        // QCF + dash
        frames: 60,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                down: true
            }),
            3: (fight, character) => ({
                left: !character.direction,
                right: character.direction,
                down: true
            }),
            4: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            5: (fight, character) => ({
                left: !character.direction,
                right: character.direction,
                a: true
            }),
            6: (fight, character) => ({
            }),
            39: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            40: (fight, character) => ({
            }),
            41: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            42: (fight, character) => ({
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
                right: character.direction
            }),
            5: (fight, character) => ({
            }),
            11: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            17: (fight, character) => ({
                left: !character.direction,
                up: true,
                right: character.direction
            }),
            28: (fight, character) => ({
                left: !character.direction,
                up: true,
                right: character.direction,
                b: true
            }),
            42: (fight, character) => ({
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
                up: true
            }),
            1: (fight, character) => ({
                up: true,
                b: true
            }),
            2: (fight, character) => ({
            }),
            25: (fight, character) => ({
                a: true
            }),
            26: (fight, character) => ({
            }),
            41: (fight, character) => ({
                a: true
            }),
            42: (fight, character) => ({
            }),
            57: (fight, character) => ({
                b: true
            }),
            58: (fight, character) => ({
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
                down: true
            }),
            1: (fight, character) => ({
                down: true,
                b: true
            }),
            2: (fight, character) => ({
            }),
            32: (fight, character) => ({
                up: true
            }),
            33: (fight, character) => ({
                up: true,
                a: true
            }),
            34: (fight, character) => ({
            }),
            59: (fight, character) => ({
                b: true
            }),
            60: (fight, character) => ({
            })
        }
    },
    {
        // HCF
        frames: 130,
        fit: (fight, character) => {
            const p1 = fight.players[0].character.collisionBox;
            const p2 = fight.players[1].character.collisionBox;
            const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
            const hit_dist = 80 - character.collisionBox.size.x / 2;
            return hit_dist >= dist ? 1 : 0;
        },
        steps: {
            0: (fight, character) => ({
                left: character.direction,
                right: !character.direction
            }),
            3: (fight, character) => ({
                left: character.direction,
                right: !character.direction,
                down: true
            }),
            4: (fight, character) => ({
                down: true
            }),
            5: (fight, character) => ({
                left: !character.direction,
                right: character.direction,
                down: true
            }),
            6: (fight, character) => ({
                left: !character.direction,
                right: character.direction,
                a: true
            }),
            7: (fight, character) => ({
            })
        }
    },
    {
        // DP
        frames: 40,
        fit: (fight, character) => {
            const p1 = fight.players[0].character.collisionBox;
            const p2 = fight.players[1].character.collisionBox;
            const dist = Math.abs(p1.pos.x + p1.size.x / 2 - (p2.pos.x + p2.size.x / 2)) - p1.size.x / 2 - p2.size.x / 2;
            const hit_dist = 80 - character.collisionBox.size.x / 2;
            return hit_dist >= dist ? 1.5 : 0;
        },
        steps: {
            0: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            3: (fight, character) => ({
                down: true
            }),
            4: (fight, character) => ({
                left: !character.direction,
                right: character.direction,
                down: true,
                a: true
            }),
            5: (fight, character) => ({
            })
        }
    },
    {
        // move forward 
        frames: 60,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                left: !character.direction,
                right: character.direction
            }),
            59: (fight, character) => ({
            })
        }
    },
    {
        // move backward
        frames: 60,
        fit: (fight, character) => .05,
        steps: {
            0: (fight, character) => ({
                left: character.direction,
                right: !character.direction
            }),
            59: (fight, character) => ({
            })
        }
    },
    {
        // block
        frames: 30,
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
                right: !character.direction
            }),
            30: (fight, character) => ({
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