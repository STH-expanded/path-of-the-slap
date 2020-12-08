class Chama extends Sling {
    constructor(action, direction, position) {
        super(action, direction, position);

        this.idleSize = new Vector2D(24, 96);
        this.jumpSize = new Vector2D(24, 64);
        this.crouchSize = new Vector2D(24, 64);

        this.collisionBox = new CollisionBox(new Vector2D(position - this.idleSize.x / 2, 270 - 16 - this.idleSize.y), this.idleSize.times(1));
    }
}
Chama.id = '03';