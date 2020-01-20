class HurtBox extends CollisionBox {
    constructor(pos, size) {
        super();

        this.size = size;
        this.pos = new Vector2D(pos.x - size.x / 2, pos.y - size.y / 2);
    }
}
