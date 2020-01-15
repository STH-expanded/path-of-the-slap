class ChildCharacter extends Character {
    constructor(playerID) {
        super();

        this.id = '01';
        this.name = 'ChildCharacter';
        this.playerID = playerID;

        this.hurtbox.playerSize = new Vector2D(32, 96);

        this.walkSpeed = 4;
        this.jumpSpeed = 20;
    }
}
