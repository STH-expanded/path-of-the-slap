class Projectile {
	hurtboxes = [];
	hitboxes = [];
	active = true;

	constructor(collisionBox, launcher, direction, speed, damage, stun, action) {
		this.collisionBox = collisionBox;
		this.launcher = launcher;
		this.direction = direction;
		this.speed = speed;
		this.damage = damage;
		this.stun = stun;
		this.action = action ? action : "actif";
	}

	update = game => {
		this.hurtboxes = [];
		this.hitboxes = [];
		this[this.action](game);
	}

	istouchHurt = () => this.active = false;

	isOut = game => !this.collisionBox.includedIn(game.activity.stage);

	actif = game => {
		this.active = this.isOut(game) ? false : this.active;
		this.collisionBox.pos = this.direction ?
			this.collisionBox.pos.plus(this.speed) :
			this.collisionBox.pos.plus(new Vector2D(-this.speed.x, this.speed.y));
		this.hitboxes.push(new HitBox(this.collisionBox.pos, this.collisionBox.size, "projectile", this.damage, this.stun, false, 0, this.direction));
	}
}