class Actor {

    velocity = new Vector2D(0, 0);

	actionIndex = 0;
	
	hurtboxes = [];
	hitboxes = [];

    constructor(master, data, action, direction, position) {
        this.master = master;
        this.data = data;
        this.id = data.id;
        this.maxHealth = data.health;
        this.health = data.health;
        
        this.actionsBlueprint = data.actionsBlueprint;
        this.actions = data.actions;
        this.action = action;

        this.direction = direction;
        this.collisionBox = new CollisionBox(position, this.actions[action].size);
    }

    getEnemy = fight => fight.players.find(player => player.character !== this.master).character;

    getEnemyActors = fight => fight.actors.filter(actor => actor.master !== this);

    getEnemies = fight => [...this.getEnemyActors(fight), this.getEnemy(fight)];

    isHit = fight => this.getEnemies(fight).some(enemy => this.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(enemy.hitboxes).includes(true)));

    hitEnemy = fight => this.getEnemies(fight).some(enemy => enemy.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(this.hitboxes).includes(true)));

    takeDamage = damage => this.health = Math.max(0, Math.min(this.maxHealth, this.health - damage));

	isOut = game => !this.collisionBox.includedIn(game.activity.stage.collisionBox);

	update = game => {
        const fight = game.activity;
        // Update status action
        if (this.action !== 'HIT' && this.isHit(fight)) {
            let hitbox = null;
            this.getEnemies(fight).forEach(enemy => hitbox = hitbox ? hitbox : enemy.hitboxes.find(hitbox => hitbox.intersectingCollisionBoxes(this.hurtboxes).includes(true)));
            if (hitbox) this.takeDamage(hitbox.damage);
        }

        // Update action
        this.actionIndex++;
        const newAction = this.actionsBlueprint.find(action => action.condition(fight, this)).action || this.action;
        if (newAction !== this.action || this.actionIndex >= this.actions[this.action].duration) {
            this.action = newAction;
            this.actionIndex = 0;
        }


        const actionData = this.actions[this.action];


        // Update size
        if (actionData.size && this.actionIndex === 0) {
            const size = actionData.size;
            this.collisionBox.pos.y += this.collisionBox.size.y - size.y;
            this.collisionBox.size = new Vector2D(size.x, size.y);
        }


        // Update direction


        // Update velocity
        if (actionData.velocity) this.velocity = actionData.velocity[Object.keys(actionData.velocity).reverse().find(index => index <= this.actionIndex)](fight, this);

        
        // Update position
        this.collisionBox.pos = this.collisionBox.pos.plus(this.velocity);
        // Clip updated position to stage
        if (!this.collisionBox.includedIn(fight.stage.collisionBox)) fight.stage.clipCollisionBox(this.collisionBox);


        const actorData = this.data;
        

        // Update hurtboxes
        this.hurtboxes = [];
        if (actorData.actions[this.action].hurtboxes) {
            const hurtboxes = actorData.actions[this.action].hurtboxes[Object.keys(actorData.actions[this.action].hurtboxes).reverse().find(index => index <= this.actionIndex)];
            hurtboxes.forEach(hurtbox => {
                const size = new Vector2D(hurtbox.size.x, hurtbox.size.y);
                const pos = new Vector2D(
                    this.collisionBox.pos.x + (this.direction ? hurtbox.offset.x : this.collisionBox.size.x - hurtbox.offset.x - size.x),
                    this.collisionBox.pos.y + hurtbox.offset.y
                );
                this.hurtboxes.push(new CollisionBox(pos, size));
            });
        }
        

        // Update hitboxes
        this.hitboxes = [];
        if (actorData.actions[this.action].hitboxes) {
            const hitboxes = actorData.actions[this.action].hitboxes[Object.keys(actorData.actions[this.action].hitboxes).reverse().find(index => index <= this.actionIndex)];
            hitboxes.forEach(hitbox => {
                const size = new Vector2D(hitbox.size.x, hitbox.size.y);
                const pos = new Vector2D(
                    this.collisionBox.pos.x + (this.direction ? hitbox.offset.x : this.collisionBox.size.x - hitbox.offset.x - size.x),
                    this.collisionBox.pos.y + hitbox.offset.y
                );
                this.hitboxes.push(new HitBox(pos, size, hitbox.damage, new Vector2D(hitbox.hitstunVelocity.x * (this.direction ? 1 : -1), hitbox.hitstunVelocity.y)));
            });
        }
	}
}