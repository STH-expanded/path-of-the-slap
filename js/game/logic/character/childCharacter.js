class ChildCharacter extends Character {
    constructor() {
        super();

        this.id = '00';
        this.name = 'ChildCharacter';
        
        this.inputs = null;

        this.size = new Vector2D(32, 96);

        this.walkSpeed = 4;
        this.jumpSpeed = 20;
    }
}
