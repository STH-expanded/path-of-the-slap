class Player {
    constructor(id) {
        this.id = id;
        this.index = null;

        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            a: false,
            b: false
        };
        this.keysHistory = [{
            keys: this.keys,
            frames: 0
        }];

        this.updateKeysHistory = () => {
            if (this.keysHistory.length > 0 && util.sameKeys(this.keys, this.keysHistory[this.keysHistory.length - 1].keys)) this.keysHistory[this.keysHistory.length - 1].frames++;
            else {
                if (this.keysHistory.length === 10) this.keysHistory.splice(0, 1);
                this.keysHistory.push({
                    keys: this.keys,
                    frames: 1
                });
            }
        }

        this.update = () => {

        }
    }
}