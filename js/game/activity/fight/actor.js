class Actor {

    velocity = new Vector2D(0, 0);

    actionIndex = 0;

    hurtboxes = [];
    hitboxes = [];

    constructor(data, action, offset, master) {
        this.data = data;
        this.id = data.id;
        this.maxHealth = data.health;
        this.health = data.health;

        this.actionsBlueprint = data.actionsBlueprint;
        this.actions = data.actions;
        this.action = action;

        this.master = master;
        this.direction = master.direction;
        this.collisionBox = new CollisionBox(
            master.collisionBox.center().plus(new Vector2D(offset.x * (master.direction ? 1 : -1), offset.y)),
            this.actions[action].size
        );
    }

    getEnemy = fight => fight.players.find(player => player.character !== this.master).character;

    getEnemyActors = fight => fight.actors.filter(actor => actor.master !== this);

    getEnemies = fight => [...this.getEnemyActors(fight), this.getEnemy(fight)];

    isHit = fight => this.getEnemies(fight).some(enemy => this.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(enemy.hitboxes).includes(true)));

    hitEnemy = fight => this.getEnemies(fight).some(enemy => enemy.hurtboxes.some(hurtbox => hurtbox.intersectingCollisionBoxes(this.hitboxes).includes(true)));

    takeDamage = damage => this.health = Math.max(0, Math.min(this.maxHealth, this.health - damage));

    isOut = game => !this.collisionBox.includedIn(game.activity.stage.collisionBox);

    updateAction = fight => {
        if (this.action !== 'HIT' && this.isHit(fight)) {
            let hitbox = null;
            //this.getEnemies(fight).forEach(enemy => hitbox = hitbox ? hitbox : enemy.hitboxes.find(hitbox => hitbox.intersectingCollisionBoxes(this.hurtboxes).includes(true)));
            if (hitbox) this.takeDamage(hitbox.damage);
        }
        this.actionIndex++;
        const newAction = this.actionsBlueprint.find(action => action.condition(fight, this)).action || this.action;
        if (newAction !== this.action || this.actionIndex >= this.actions[this.action].duration) {
            this.action = newAction;
            this.actionIndex = 0;
        }
    }

    updateVelocity = (fight, actionData) => {
        if (actionData.velocity) this.velocity = actionData.velocity[Object.keys(actionData.velocity).reverse().find(index => index <= this.actionIndex)](fight, this);
    }

    updateSize = actionData => {
        if (actionData.size && this.actionIndex === 0) {
            const size = actionData.size;
            this.collisionBox.pos.y += this.collisionBox.size.y - size.y;
            this.collisionBox.size = new Vector2D(size.x, size.y);
        }
    }

    updatePosition = fight => {
        this.collisionBox.pos = this.collisionBox.pos.plus(this.velocity);
        // Clip updated position to stage
        if (!this.collisionBox.includedIn(fight.stage.collisionBox)) fight.stage.clipCollisionBox(this.collisionBox);
    }

    updateActionElements = actionData => {
        this.hitboxes = [];
        this.hurtboxes = [];
        ["hitboxes", "hurtboxes"].forEach(actionElement => {
            if (actionData[actionElement]) {
                const elements = actionData[actionElement][Object.keys(actionData[actionElement]).reverse().find(index => index <= this.actionIndex)];
                elements.forEach(element => {
                    const size = new Vector2D(element.size.x, element.size.y);
                    const pos = new Vector2D(
                        this.collisionBox.pos.x + (this.direction ? element.offset.x : this.collisionBox.size.x - element.offset.x - size.x),
                        this.collisionBox.pos.y + element.offset.y
                    );
                    if (actionElement === "hurtboxes") this.hurtboxes.push(new CollisionBox(pos, size));
                    else this.hitboxes.push(new HitBox(pos, size, element.damage, new Vector2D(element.hitstunVelocity.x * (this.direction ? 1 : -1), element.hitstunVelocity.y)));
                });
            }
        });
    }

    update = game => {
        const fight = game.activity;
        this.updateAction(fight);
        const actionData = this.actions[this.action];
        this.updateVelocity(fight, actionData);
        this.updateSize(actionData);
        this.updatePosition(fight);
        this.updateActionElements(actionData);
    }
}