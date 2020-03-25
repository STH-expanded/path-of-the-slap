class Projectile {
  constructor(collisionBox, launcher, direction, speed, damage, action) {
    this.collisionBox = collisionBox; // CollisionBox
    this.launcher = launcher; //playerId
    this.direction = direction; //Boolean
    this.speed = speed; // Vecteur2D
    this.damage = damage; //int
    this.action = action ? action : "actif";

    this.hurtboxes = [];
    this.hitboxes = [];

    this.update = game => {
      this.getNewStatus(game)

      this.hurtboxes = [];
      this.hitboxes = [];


      if (this.action) this[this.action](game);
    };

    this.getNewStatus = game => {
      var newStatus = this.status;
  
      return newStatus;
  };

    this.actif = game => {
      this.collisionBox.pos = this.direction ? this.collisionBox.pos.plus(this.speed) : this.collisionBox.pos.plus(new Vector2D(-this.speed.x, this.speed.y));
      this.hurtboxes.push(new HurtBox(this.collisionBox.pos, this.collisionBox.size));
      
    };
  }
}
