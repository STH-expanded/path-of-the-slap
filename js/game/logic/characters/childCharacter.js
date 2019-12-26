class ChildCharacter extends Character {
    constructor() {
        super();

        this.id = 1;
        this.name = 'ChildCharacter';
        
        this.mugshotImg = 'cm00';
        this.profileImg = 'cp00';
        
        this.inputs = null;

        this.size = new Vector2D(32, 96);

        this.walkSpeed = 4;
        this.jumpSpeed = 20;
    }
}
