class HitBox extends CollisionBox {
    constructor(type, pos, size, might, stun, status, power, direction, ejection=0) {
        super();
        this.type = type;
        this.size = size;
        this.pos = new Vector2D(pos.x - size.x / 2, pos.y - size.y / 2);
        this.might = might;
        this.stun = stun;
        this.status = status;
        this.power = power;
        this.direction = direction;
        this.ejection = ejection;
    }
}
