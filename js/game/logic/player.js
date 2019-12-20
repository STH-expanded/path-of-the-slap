class Player {
    constructor(id, keys, type) {
        this.id = id;
        this.keys = keys;
        this.type = type;

        this.character = null;
        this.winCount = 0;

        this.update = game => {
            if (this.character) this.character.update(game,this.keys);
        };
    }
}