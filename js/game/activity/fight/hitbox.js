class HitBox extends CollisionBox {
    constructor(pos, size, damage, hitstunFrame, hitstunVelocity, ejectionVelocity,owner) {
        super(pos, size);
        this.damage = damage;
        this.hitstunFrame = hitstunFrame;
        this.hitstunVelocity = hitstunVelocity;
        this.ejectionVelocity = ejectionVelocity;
        this.owner =owner;
    }
}