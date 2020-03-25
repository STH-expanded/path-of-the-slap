class HitBox extends CollisionBox {
    constructor(pos, size, might, stun, status, power) {
        super();

        this.size = size;
        this.pos = new Vector2D(pos.x - size.x / 2, pos.y - size.y / 2);
        this.might = might;
        this.stun = stun;
        this.status = status;
        this.power = power;
    }
}
