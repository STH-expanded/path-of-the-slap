class Player {
    constructor(id, keys, type) {
        this.id = id;
        this.keys = keys;
        this.type = type;

        this.character = null;

        this.update = game => {
            if (this.character) this.character.update(game);
        };
    }
}