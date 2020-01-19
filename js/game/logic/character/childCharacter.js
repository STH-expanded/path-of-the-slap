class ChildCharacter extends Character {
    constructor(playerId) {
        super(playerId);

        this.id = '01';
        this.name = 'ChildCharacter';

        this.idleSize = new Vector2D(32, 128);
        this.jumpSize = new Vector2D(32, 96);
        this.crouchSize = new Vector2D(32, 96);
    }
}
