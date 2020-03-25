class Projectile {
  constructor(collisionBox, launcher, direction, speed, damage,stun, action) {
    this.collisionBox = collisionBox; // CollisionBox
    this.launcher = launcher; //playerId
    this.direction = direction; //Boolean
    this.speed = speed; // Vecteur2D
    this.damage = damage;
    this.stun = stun; //int
    this.action = action ? action : "actif";
    this.active = true;

    this.hurtboxes = [];
    this.hitboxes = [];

    this.update = game => {
      this.getNewStatus(game);

      this.hurtboxes = [];
      this.hitboxes = [];

      if (this.action) this[this.action](game);
    };

    this.getNewStatus = game => {
      var newStatus = this.status;
      return newStatus;
    };

    this.istouchHurt=()=>{
      this.active = false;
    }

    this.isOut=(game)=>{
      return (!this.collisionBox.isIncludedIn(game.activity.stage))
    }

    this.actif = game => {
      this.actif = this.isOut(game) ? false : this.actif; 
      this.collisionBox.pos = this.direction
        ? this.collisionBox.pos.plus(this.speed)
        : this.collisionBox.pos.plus(new Vector2D(-this.speed.x, this.speed.y));
      this.hitboxes.push(new HitBox(this.collisionBox.pos, this.collisionBox.size,this.damage,this.stun));
    };
  }
}
