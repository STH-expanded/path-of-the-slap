class Mario extends Character {
    constructor() {
        super();

        this.id = 1;
        this.name = 'Mario';
        
        this.mugshotImg = 'cm00';
        this.profileImg = 'cp00';
        
        this.keys = null;

        this.size = new Vector2D(16, 16);

        this.walkSpeed = 4;
        this.jumpSpeed = 8;
    }
}
