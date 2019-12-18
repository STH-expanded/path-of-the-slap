class Mario extends Character {
    constructor(keys) {
        super(keys);
        this.id = 1;
        this.name = 'Mario';
        this.size = new Vector2D(16, 16);
        this.pos = new Vector2D(
            Math.floor(Math.random() * 448),
            270 - 16 - this.size.y
        );
        this.walkSpeed = 4;
        this.jumpSpeed = 8;
    }
}
