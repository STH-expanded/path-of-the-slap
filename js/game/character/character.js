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

    updateAction = (fight, inputList) => {
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
        this.actionIndex++;
        const newAction = this.actionsBlueprint.find(action => action.condition(fight, this, inputList)).action || this.action;
        if (newAction !== this.action || this.actionIndex >= this.actions[this.action].duration) {
            this.action = newAction;
            this.actionIndex = 0;
        }
    }

    updateDirection = (fight, actionData) => {
        const enemyCollisionBox = this.getEnemy(fight).collisionBox;
        if (!actionData.fixedDirection && this.collisionBox.center().x !== enemyCollisionBox.center().x) {
            this.direction = this.collisionBox.center().x < enemyCollisionBox.center().x;
        }
    }

    updateVelocity = (fight, inputList, actionData) => {
        const velocity = actionData.velocity[Object.keys(actionData.velocity).reverse().find(index => index <= this.actionIndex)](fight, this, inputList);
        this.velocity = this.action === 'HIT' ? this.hitstunVelocity : velocity;
        this.velocity = this.action === 'EJECTED' ? this.hitstunVelocity : velocity;
    }

    updateSize = actionData => {
        if (this.actionIndex === 0) {
            const size = actionData.size;
            this.collisionBox.pos.y += this.collisionBox.size.y - size.y;
            this.collisionBox.size = new Vector2D(size.x, size.y);
        }
    }

    updatePosition = fight => {
        const enemyCollisionBox = this.getEnemy(fight).collisionBox;
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
    }

    updateActionElements = (fight, actionData) => {
        this.hitboxes = [];
        this.hurtboxes = [];
        ["hitboxes", "hurtboxes", "actors"].forEach(actionElement => {
            if (actionData[actionElement]) {
                const elements = actionData[actionElement][Object.keys(actionData[actionElement]).reverse().find(index => index <= this.actionIndex)];
                elements.forEach(element => {
                    if (actionElement === "actors") fight.actors.push(new Actor(element.data, "IDLE", element.offset, this));
                    else {
                        const size = new Vector2D(element.size.x, element.size.y);
                        const pos = new Vector2D(
                            this.collisionBox.pos.x + (this.direction ? element.offset.x : this.collisionBox.size.x - element.offset.x - size.x),
                            this.collisionBox.pos.y + element.offset.y
                        );
                        if (actionElement === "hurtboxes") this.hurtboxes.push(new CollisionBox(pos, size));
                        else this.hitboxes.push(new HitBox(pos, size, element.damage, new Vector2D(element.hitstunVelocity.x * (this.direction ? 1 : -1), element.hitstunVelocity.y)));
                    }
                });
            }
        });
    }

    update = (game, inputList) => {
        const fight = game.activity;
        this.updateAction(fight, inputList);
        const actionData = this.actions[this.action];
        this.updateDirection(fight, actionData);
        this.updateVelocity(fight, inputList, actionData);
        this.updateSize(actionData);
        this.updatePosition(fight);
        this.updateActionElements(fight, actionData);
    }
}