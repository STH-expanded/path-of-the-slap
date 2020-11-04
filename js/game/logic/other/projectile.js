class Projectile {
	constructor(collisionBox, launcher, direction, speed, damage, stun, action) {
		this.collisionBox = collisionBox; // CollisionBox
		this.launcher = launcher; //player
		this.direction = direction; //Boolean
		this.speed = speed; // Vecteur2D
		this.damage = damage;
		this.stun = stun; //int
		this.action = action ? action : "actif";
		this.active = true;

		this.hurtboxes = [];
		this.hitboxes = [];
	}

	update = game => {
		this.hurtboxes = [];
		this.hitboxes = [];

		if (this.action) this[this.action](game);
	}

	istouchHurt = () => this.active = false;

	isOut = game => !this.collisionBox.isIncludedIn(game.activity.stage);

	actif = game => {
		this.active = this.isOut(game) ? false : this.active;
		this.collisionBox.pos = this.direction ?
			this.collisionBox.pos.plus(this.speed) :
			this.collisionBox.pos.plus(new Vector2D(-this.speed.x, this.speed.y));
		this.hitboxes.push(new HitBox("projectile", this.collisionBox.pos, this.collisionBox.size, this.damage, this.stun, false, 0, this.direction));
	}
}