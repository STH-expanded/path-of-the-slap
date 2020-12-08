class HitBox extends CollisionBox {
    constructor(pos, size, damage, hitstunVelocity) {
        super(pos, size);
        this.damage = damage;
        this.hitstunVelocity = hitstunVelocity;
    }
}

// class HitBox extends CollisionBox {
//     constructor(pos, size, type, might, stun, status, power, direction, ejection=0) {
//         super(pos, size);
//         this.type = type;
//         this.might = might;
//         this.stun = stun;
//         this.status = status;
//         this.power = power;
//         this.direction = direction;
//         this.ejection = ejection;
//     }
// }