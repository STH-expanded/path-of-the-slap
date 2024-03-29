class Character {

    velocity = new Vector2D(0, 0);

    actionIndex = 0;

    hurtboxes = [];
    hitboxes = [];

    hitstunVelocity = new Vector2D(0, 0);
    hitstun = 0;

    ejectionVelocity = new Vector2D(0, 0);
    ejection = 0;
    ennemyLastHitbox;


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

    hurtnotify = enemyhit => null;

    getEnemy = fight => fight.players.find(player => player.character !== this).character;

    getEnemyActors = fight => fight.actors.filter(actor => actor.master !== this);

    getEnemies = fight => [...this.getEnemyActors(fight), this.getEnemy(fight)];

    isHit = fight => this.getEnemies(fight).some(enemy => this.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(enemy.hitboxes).includes(true)));

    isGrounded = fight => this.collisionBox.pos.y + this.collisionBox.size.y === fight.stage.collisionBox.size.y;

    takeDamage = damage => this.health = Math.max(0, Math.min(this.maxHealth, this.health - damage));

    canBlock = fight => this.isHit(fight) && !this.direction === this.getEnemy(fight).direction;

    wallBounce = fight => this.action === 'EJECTED' && (this.collisionBox.pos.x < 1 || this.collisionBox.pos.x + this.collisionBox.size.x >= fight.stage.collisionBox.size.x);

    updateAction = (fight, inputList) => {
        if (this.action === 'GRABBED' && ['FORWARD_THROW', 'BACK_THROW'].includes(this.getEnemy(fight).action)) {
            this.ejection = 1;
            const enemy = this.getEnemy(fight);
            const direction = enemy.direction && enemy.action === "FORWARD_THROW" || !enemy.direction && enemy.action === "BACK_THROW";
            this.takeDamage(enemy.actions[enemy.action].damage);
            this.ejectionVelocity = new Vector2D(16 * (direction ? 1 : -1), -8);
        }
        if ((!['HIT', 'BLOCK', 'AERIAL_BLOCK', 'LOW_BLOCK'].includes(this.action)) && this.isHit(fight)) {
            let hitbox = null;
            this.getEnemies(fight).forEach(enemy =>{ 
                hitbox = hitbox ? hitbox : enemy.hitboxes.find(hitbox => hitbox.intersectingCollisionBoxes(this.hurtboxes).includes(true))
                if (enemy.hitboxes.includes(hitbox)) {
                    enemy.hurtnotify(this)
                }
            });
            if (hitbox) {
                this.hitstun = hitbox.hitstunFrame;

                if (!(this.canBlock(fight) && this.isGrounded(fight) && (this.direction ? inputList.state[0].input.stick === 4 : inputList.state[0].input.stick === 6) && ['AERIAL', 'NORMAL'].includes(hitbox.owner.actions[hitbox.owner.action].attackType) || this.action === 'BLOCK' && this.hitstun)
                    && !(this.canBlock(fight) && !this.isGrounded(fight) && (this.direction ? inputList.state[0].input.stick === 7 : inputList.state[0].input.stick === 9) && ['AERIAL', 'NORMAL'].includes(hitbox.owner.actions[hitbox.owner.action].attackType) || this.action === 'AERIAL_BLOCK' && this.hitstun)
                    && !(this.canBlock(fight) && this.isGrounded(fight) && (this.direction ? inputList.state[0].input.stick === 1 : inputList.state[0].input.stick === 3) && ['LOW', 'NORMAL'].includes(hitbox.owner.actions[hitbox.owner.action].attackType) || this.action === 'LOW_BLOCK' && this.hitstun)) {
                    this.ennemyLastHitbox = hitbox;
                    this.takeDamage(hitbox.damage);
                    if (hitbox.ejectionVelocity) {
                        this.ejection = 1;
                        this.ejectionVelocity = new Vector2D(hitbox.ejectionVelocity.x, hitbox.ejectionVelocity.y);
                    }
                }
                this.hitstunVelocity = hitbox.hitstunVelocity;
            }
        }
        if (['HIT', 'BLOCK', 'AERIAL_BLOCK', 'LOW_BLOCK'].includes(this.action)) {
            this.hitstun--;
        }
        if (this.ejection && this.action === 'EJECTED') {
            if (this.ejection === 1) this.velocity = this.ejectionVelocity;
            if ((this.ejectionVelocity.y === 0 || this.ejection > 1) && this.isGrounded(fight)) this.ejection = 0;
            else this.ejection++;
        }
        if (this.action === "TECH") {
            this.ejection = 0;
        }
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
        if (this.action === 'EJECTED' && this.wallBounce(fight)) this.direction = !this.direction;
    }

    updateVelocity = (fight, inputList, actionData) => {
        const velocity = actionData.velocity[Object.keys(actionData.velocity).reverse().find(index => index <= this.actionIndex)](fight, this, inputList);
        this.velocity = (['HIT', 'BLOCK', 'AERIAL_BLOCK', 'LOW_BLOCK'].includes(this.action)) ? this.hitstunVelocity : velocity;
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
        if (this.wallBounce(fight)) this.velocity.x = -this.velocity.x;
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
        if (this.collisionBox.intersects(enemyCollisionBox) && !this.actions[this.action].collisionBoxDisable) {
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
        ["hitboxes", "hurtboxes", "actors","animationUnlink"].forEach(actionElement => {
            if (actionData[actionElement]) {
                let elements = actionData[actionElement][Object.keys(actionData[actionElement]).reverse().find(index => index <= this.actionIndex)];
                elements = actionData === "animationUnlink" ? elements() : elements;
                elements.forEach(element => {
                    if (actionElement === "actors") fight.actors.push(new Actor(element.data, "IDLE", element.offset, this));
                    else if (actionElement === "animationUnlink") {
                        fight.animationUnlink.push(new Animation(this.collisionBox.center().plus(this.direction? new Vector2D(element(fight, this).offset.x-element(fight, this).size.x,element(fight, this).offset.y):new Vector2D(-element(fight, this).offset.x,element(fight, this).offset.y)), element(fight, this).size,element(fight, this).speed,element(fight, this).frameCount, this.direction,element(fight, this).assetId,element(fight, this).indexCount));
                    }
                    else {
                        const size = new Vector2D(element.size.x, element.size.y);
                        const pos = new Vector2D(
                            this.collisionBox.pos.x + (this.direction ? element.offset.x : this.collisionBox.size.x - element.offset.x - size.x),
                            this.collisionBox.pos.y + element.offset.y
                        );
                        if (actionElement === "hurtboxes") this.hurtboxes.push(new CollisionBox(pos, size));
                        else {
                            this.hitboxes.push(new HitBox(pos, size, element.damage, element.hitstunFrame || element.hitstunFrame === 0 ? element.hitstunFrame : Math.round(element.damage * 0.25),
                                new Vector2D(element.hitstunVelocity.x * (this.direction ? 1 : -1), element.hitstunVelocity.y),
                                element.ejectionVelocity ? new Vector2D(element.ejectionVelocity.x * (this.direction ? 1 : -1), element.ejectionVelocity.y) : null,this
                            ));
                        }
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