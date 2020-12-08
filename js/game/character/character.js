class Character {

    velocity = new Vector2D(0, 0);

    actionIndex = 0;

    hurtboxes = [];
    hitboxes = [];

    hitstunVelocity = new Vector2D(0, 0);
    hitstun = 0;

    constructor(data, action, direction, position) {
        this.data = data;
        this.id = data.id;
        this.maxHealth = data.health;
        this.health = data.health;
        
        this.actionsBlueprint = data.actionsBlueprint;
        this.actions = data.actions;
        this.action = action;

        this.direction = direction;
        this.collisionBox = new CollisionBox(
            new Vector2D(position.x - Math.round(this.actions[action].size.x / 2), position.y - this.actions[action].size.y),
            this.actions[action].size
        );
    }

    getEnemy = fight => fight.players.find(player => player.character !== this).character;

    getEnemyActors = fight => fight.actors.filter(actor => actor.master !== this);

    getEnemies = fight => [...this.getEnemyActors(fight), this.getEnemy(fight)];

    isHit = fight => this.getEnemies(fight).some(enemy => this.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(enemy.hitboxes).includes(true)));

    isGrounded = fight => this.collisionBox.pos.y + this.collisionBox.size.y === fight.stage.collisionBox.size.y;

    takeDamage = damage => this.health = Math.max(0, Math.min(this.maxHealth, this.health - damage));

    update = (game, inputList) => {
        const fight = game.activity;
        // Update status action
        if (this.action !== 'HIT' && this.isHit(fight)) {
            let hitbox = null;
            this.getEnemies(fight).forEach(enemy => hitbox = hitbox ? hitbox : enemy.hitboxes.find(hitbox => hitbox.intersectingCollisionBoxes(this.hurtboxes).includes(true)));
            if (hitbox) {
                this.hitstun = Math.round(hitbox.damage * 0.25);
                this.takeDamage(hitbox.damage);
                this.hitstunVelocity = hitbox.hitstunVelocity;
            }
        }
        if (this.action === 'HIT') this.hitstun--;

        // Update action
        this.actionIndex++;
        const newAction = this.actionsBlueprint.find(action => action.condition(fight, this, inputList)).action || this.action;
        if (newAction !== this.action || this.actionIndex >= this.actions[this.action].duration) {
            this.action = newAction;
            this.actionIndex = 0;
        }


        const actionData = this.actions[this.action];


        // Update size
        if (this.actionIndex === 0) {
            const size = actionData.size;
            this.collisionBox.pos.y += this.collisionBox.size.y - size.y;
            this.collisionBox.size = new Vector2D(size.x, size.y);
        }
        
        
        const enemyCollisionBox = this.getEnemy(fight).collisionBox;

        
        // Update direction
        if (!actionData.fixedDirection) {
            if (this.collisionBox.center().x !== enemyCollisionBox.center().x) this.direction = this.collisionBox.center().x < enemyCollisionBox.center().x;
        }


        // Update velocity
        const velocity = actionData.velocity[Object.keys(actionData.velocity).reverse().find(index => index <= this.actionIndex)](fight, this, inputList);
        this.velocity = this.action === 'HIT' ? this.hitstunVelocity : velocity;


        // Update position
        this.collisionBox.pos = this.collisionBox.pos.plus(this.velocity);
        // Clip updated position to stage
        if (!this.collisionBox.includedIn(fight.stage.collisionBox)) {
            fight.stage.clipCollisionBox(this.collisionBox);
            // If player is hit and had to be clipped to stage, apply reverse hitstun force to other player
            if (this.action === 'HIT') {
                enemyCollisionBox.pos = enemyCollisionBox.pos.plus(this.velocity.times(-1));
                if (!enemyCollisionBox.includedIn(fight.stage.collisionBox)) fight.stage.clipCollisionBox(enemyCollisionBox);
            }
        }
        // Update other player position with same velocity if colliding with updated position
        if (this.collisionBox.intersects(enemyCollisionBox)) {
            enemyCollisionBox.pos = enemyCollisionBox.pos.plus(new Vector2D(this.velocity.x, 0));
            fight.stage.xClipCollisionBoxes(enemyCollisionBox, this.collisionBox);
            // Apply horizontal force to both players if still colliding
            if (this.collisionBox.intersects(enemyCollisionBox)) {
                const collideForce = this.collisionBox.center().x < enemyCollisionBox.center().x ? 1 : -1;
                this.collisionBox.pos.x -= collideForce;
                enemyCollisionBox.pos.x += collideForce;
                fight.stage.xClipCollisionBoxes(this.collisionBox, enemyCollisionBox);
                fight.stage.xClipCollisionBoxes(enemyCollisionBox, this.collisionBox);
            }
        }
        

        const characterData = this.data;


        // Update hurtboxes
        this.hurtboxes = [];
        if (characterData.actions[this.action].hurtboxes) {
            const hurtboxes = characterData.actions[this.action].hurtboxes[Object.keys(characterData.actions[this.action].hurtboxes).reverse().find(index => index <= this.actionIndex)];
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
        if (characterData.actions[this.action].hitboxes) {
            const hitboxes = characterData.actions[this.action].hitboxes[Object.keys(characterData.actions[this.action].hitboxes).reverse().find(index => index <= this.actionIndex)];
            hitboxes.forEach(hitbox => {
                const size = new Vector2D(hitbox.size.x, hitbox.size.y);
                const pos = new Vector2D(
                    this.collisionBox.pos.x + (this.direction ? hitbox.offset.x : this.collisionBox.size.x - hitbox.offset.x - size.x),
                    this.collisionBox.pos.y + hitbox.offset.y
                );
                this.hitboxes.push(new HitBox(pos, size, hitbox.damage, new Vector2D(hitbox.hitstunVelocity.x * (this.direction ? 1 : -1), hitbox.hitstunVelocity.y)));
            });
        }


        // Update actors
        if (characterData.actions[this.action].actors) {
            const actors = characterData.actions[this.action].actors[Object.keys(characterData.actions[this.action].actors).reverse().find(index => index <= this.actionIndex)];
            actors.forEach(actor => {
                fight.actors.push(new Actor(
                    this,
                    actor.data,
                    "IDLE",
                    this.direction,
                    this.collisionBox.center().plus(new Vector2D(actor.offset.x * (this.direction ? 1 : -1), actor.offset.y))
                ));
            });
        }
    }
}