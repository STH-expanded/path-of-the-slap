class Character {
    constructor(playerId) {
        this.playerId = playerId;


        //------------------------------------------------------------------------------------------------------------------------------
        // DATA
        //------------------------------------------------------------------------------------------------------------------------------


        this.id = '00';
        this.name = 'ParentCharacter';

        this.HIT_STATUS = ["HIT", "EJECTED", "GROUND"];
        this.INVINCIBLE_STATUS = ["RECOVER", "TECH"];
        this.BLOCK_STATUS = ["BLOCK_AERIAL", "BLOCK_HIGH", "BLOCK_LOW"];

        this.LAG_ACTIONS = ["LAND", "GET_UP"];
        this.DASH_ACTIONS = ["FORWARD_DASH", "BACKWARD_DASH"];

        this.AERIAL_ACTIONS = ["BACKWARD_AERIAL", "NEUTRAL_AERIAL", "FORWARD_AERIAL"];
        this.HIGH_ACTIONS = ["BACKWARD_HIGH", "NEUTRAL_HIGH", "FORWARD_HIGH"];
        this.LOW_ACTIONS = ["BACKWARD_LOW", "NEUTRAL_LOW", "FORWARD_LOW"];

        this.AERIAL_ATTACKS = ["AERIAL_A", "AERIAL_B"];
        this.HIGH_ATTACKS = ["HIGH_A", "HIGH_B"];
        this.LOW_ATTACKS = ["LOW_A", "LOW_B"];

        this.ATTACK_ACTIONS = [...this.LOW_ATTACKS, ...this.HIGH_ATTACKS, ...this.AERIAL_ATTACKS];
        this.GROUND_ACTIONS = [...this.HIGH_ACTIONS, ...this.LOW_ACTIONS, ...this.DASH_ACTIONS];

        this.frame = 0;
        this.status = null;
        this.action = null;
        this.command = null;

        this.collisionBox = new CollisionBox(null, null);
        this.speed = new Vector2D(0, 0);
        this.direction = null;
        // weight ?

        this.hurtboxes = [];
        this.hitboxes = [];

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.highAFrame = 15;
        this.highBFrame = 30;

        // boolean run dash ?
        this.canBackdash = false;

        // attack cancels ?

        this.idleSize = new Vector2D(24, 96);
        this.jumpSize = new Vector2D(24, 64);
        this.crouchSize = new Vector2D(24, 64);

        this.moveForwardSpeed = 1;
        this.moveBackwardSpeed = -2;
        this.forwardDashSpeed = 10;
        this.backDashSpeed = -6;

        this.forwardJumpSpeed = 4;
        this.backJumpSpeed = -4;
        this.jumpHeight = 24;
        this.gravity = new Vector2D(0, 2);


        //------------------------------------------------------------------------------------------------------------------------------
        // PHYSIC ENGINE
        //------------------------------------------------------------------------------------------------------------------------------


        this.moveX = game => {
            var direction = this.direction ? 1 : -1;

            switch (this.action) {
                case "FORWARD_HIGH":
                    this.speed.x = direction * this.moveForwardSpeed;
                    break;
                case "BACKWARD_HIGH":
                    this.speed.x = direction * this.moveBackwardSpeed;
                    break;
                case "FORWARD_DASH":
                    this.speed.x = direction * this.forwardDashSpeed;
                    break;
                case "BACKWARD_DASH":
                    this.speed.x = direction * this.backDashSpeed;
                    break;
                case "FORWARD_AERIAL":
                    this.speed.x = direction * this.forwardJumpSpeed;
                    break;
                case "BACKWARD_AERIAL":
                    this.speed.x = direction * this.backJumpSpeed;
                    break;
                default:
                    this.speed.x = 0;
                    break;
            }

            var newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(this.speed.x, 0)), this.collisionBox.size);
            if (!newCollisionBox.isIncludedIn(game.activity.stage)) newCollisionBox.pos.x = newCollisionBox.pos.x < 0 ? 0 : game.activity.stage.size.x - newCollisionBox.size.x;

            var other = game.activity.players.find(player => player.id !== this.playerId).character;
            if (newCollisionBox.intersects(other.collisionBox)) {
                if (other.collisionBox.pos.x === 0 || other.collisionBox.pos.x === game.activity.stage.size.x - other.collisionBox.size.x) this.speed.x = 0;
                var otherNewCollisionBox = new CollisionBox(other.collisionBox.pos.plus(new Vector2D(this.speed.x, 0)), other.collisionBox.size);

                newCollisionBox.pos.x = (otherNewCollisionBox.pos.x + otherNewCollisionBox.size.x / 2 < newCollisionBox.pos.x + newCollisionBox.size.x / 2 ?
                    otherNewCollisionBox.pos.x + otherNewCollisionBox.size.x : otherNewCollisionBox.pos.x - newCollisionBox.size.x) + other.speed.x;

                [newCollisionBox, otherNewCollisionBox].forEach(collisionBox => {
                    if (!collisionBox.isIncludedIn(game.activity.stage)) collisionBox.pos.x = collisionBox.pos.x < 0 ? 0 : game.activity.stage.size.x - collisionBox.size.x;
                });
                other.collisionBox = otherNewCollisionBox;
            }
            this.collisionBox = newCollisionBox;
        };

        this.moveY = game => {
            if (this.AERIAL_ACTIONS.includes(this.command)) this.speed.y -= this.jumpHeight;
            this.speed.y += this.gravity.y;

            let newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(0, this.speed.y)), this.collisionBox.size);
            if (newCollisionBox.isIncludedIn(game.activity.stage)) this.collisionBox = newCollisionBox;
            else this.speed.y = 0;
        }

        this.updateSize = () => {
            if (this.AERIAL_ACTIONS.includes(this.command) && this.collisionBox.size.y !== this.jumpSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.jumpSize.y;
                this.collisionBox.size.y = this.jumpSize.y;
            } else if (this.LOW_ACTIONS.includes(this.command) && this.collisionBox.size.y !== this.crouchSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.crouchSize.y;
                this.collisionBox.size.y = this.crouchSize.y;
            } else if (![...this.AERIAL_ACTIONS, ...this.LOW_ACTIONS].includes(this.action) && this.collisionBox.size.y !== this.idleSize.y) {
                this.collisionBox.pos.y -= this.idleSize.y - this.collisionBox.size.y;
                this.collisionBox.size.y = this.idleSize.y;
            }
        }

        this.updateDirection = game => {
            var other = game.activity.players.find(player => player.id !== this.playerId).character.collisionBox;
            this.direction = this.collisionBox.pos.x + this.collisionBox.size.x / 2 === other.pos.x + other.size.x / 2 ?
                this.direction : this.collisionBox.pos.x + this.collisionBox.size.x / 2 < other.pos.x + other.size.x / 2;
        }

        this.getNewStatus = game => {
            var newStatus = this.status;
            if (this.status) {
                if (!this.frame) {
                    if (this.status === "HIT") newStatus = null;
                } else this.frame--;
            } else {
                var other = game.activity.players.find(player => player.id !== this.playerId).character;
                var otherHitboxes = other.hitboxes.filter(hitBox => hitBox.intersectingCollisionBoxes(this.hurtboxes).some(hurtBox => hurtBox));
                otherHitboxes.forEach(hitBox => {
                    console.log(hitBox.intersectingCollisionBoxes(this.hurtboxes).some(hurtBox => hurtBox));
                    newStatus = 'HIT';
                    this.health -= hitBox.might;
                    this.frame = hitBox.stun;
                });
            }
            return newStatus;
        }

        //------------------------------------------------------------------------------------------------------------------------------
        // ACTIONS
        //------------------------------------------------------------------------------------------------------------------------------


        this.LAND = game => {}
        this.GET_UP = game => {}

        this.BACKWARD_DASH = game => {}
        this.FORWARD_DASH = game => {}

        this.BACKWARD_LOW = game => {}
        this.NEUTRAL_LOW = game => {}
        this.FORWARD_LOW = game => {}

        this.BACKWARD_HIGH = game => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x, center.y - 8),
                new Vector2D(32, 112)
            ));
        }
        this.NEUTRAL_HIGH = game => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x, center.y - 8),
                new Vector2D(32, 112)
            ));
        }
        this.FORWARD_HIGH = game => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x, center.y - 8),
                new Vector2D(32, 112)
            ));
        }

        this.BACKWARD_AERIAL = game => {}
        this.NEUTRAL_AERIAL = game => {}
        this.FORWARD_AERIAL = game => {}

        this.LOW_A = game => {}
        this.LOW_B = game => {}

        this.AERIAL_A = game => {}
        this.AERIAL_B = game => {}

        this.HIGH_A = game => {
            this.frame++;

            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x, center.y - 8),
                new Vector2D(32, 112)
            ));

            if (this.frame > 6 && this.frame < 9) {
                this.hitboxes.push(new HitBox(
                    new Vector2D(center.x + (this.direction ? 1 : -1) * 32, center.y - 24),
                    new Vector2D(40, 24),
                    50,
                    15
                ));

                this.hurtboxes.push(new HurtBox(
                    new Vector2D(center.x + (this.direction ? 1 : -1) * 32, center.y - 16),
                    new Vector2D(40, 24)
                ));
            }
        };

        this.HIGH_B = game => {
            this.frame++;

            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x, center.y - 8),
                new Vector2D(32, 112)
            ));

            if (this.frame > 11 && this.frame < 18) {
                this.hitboxes.push(new HitBox(
                    new Vector2D(center.x + (this.direction ? 1 : -1) * 48, center.y - 16),
                    new Vector2D(72, 32),
                    75,
                    30
                ));

                this.hurtboxes.push(new HurtBox(
                    new Vector2D(center.x + (this.direction ? 1 : -1) * 32, center.y - 16),
                    new Vector2D(40, 24)
                ));
            }
        };


        //------------------------------------------------------------------------------------------------------------------------------
        // INPUTS
        //------------------------------------------------------------------------------------------------------------------------------


        this.getCommandInput = (game, inputList) => {
            var inputs = inputList[inputList.length - 1].inputs;

            if (this.collisionBox.pos.y + this.collisionBox.size.y >= game.activity.stage.size.y && this.AERIAL_ACTIONS.includes(this.action)) {
                return "LAND";
            } else if (!inputs.down && this.LOW_ACTIONS.includes(this.action)) {
                return "GET_UP";
            } else if ((inputs.a && this.HIGH_ACTIONS.includes(this.action) || this.action === "HIGH_A") && this.frame < this.highAFrame) {
                return "HIGH_A";
            } else if ((inputs.b && this.HIGH_ACTIONS.includes(this.action) || this.action === "HIGH_B") && this.frame < this.highBFrame) {
                return "HIGH_B";
            } else if (inputs.up && this.GROUND_ACTIONS.includes(this.action)) {
                if (inputs.left && !this.direction || inputs.right && this.direction) {
                    return "FORWARD_AERIAL";
                } else if (inputs.left && this.direction || inputs.right && !this.direction) {
                    return "BACKWARD_AERIAL";
                } else {
                    return "NEUTRAL_AERIAL";
                }
            } else if (inputs.down && this.GROUND_ACTIONS.includes(this.action)) {
                if (inputs.left && !this.direction || inputs.right && this.direction) {
                    return "FORWARD_LOW";
                } else if (inputs.left && this.direction || inputs.right && !this.direction) {
                    return "BACKWARD_LOW";
                } else {
                    return "NEUTRAL_LOW";
                }
            } else if (inputs.right && this.direction && (this.action === "FORWARD_DASH" || this.action === "NEUTRAL_HIGH" && inputList.length > 2 &&
                    !inputList[inputList.length - 2].inputs.down && !inputList[inputList.length - 2].inputs.up && !inputList[inputList.length - 2].inputs.a &&
                    !inputList[inputList.length - 2].inputs.b && inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.right)) {
                return "FORWARD_DASH";
            } else if (inputs.left && !this.direction && (this.action === "FORWARD_DASH" || this.action === "NEUTRAL_HIGH" && inputList.length > 2 &&
                    !inputList[inputList.length - 2].inputs.down && !inputList[inputList.length - 2].inputs.up && !inputList[inputList.length - 2].inputs.a &&
                    !inputList[inputList.length - 2].inputs.b && inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.left)) {
                return "FORWARD_DASH";
            } else if (inputs.left && this.direction && (this.action === "BACKWARD_DASH" || this.action === "NEUTRAL_HIGH" && inputList.length > 2 &&
                    !inputList[inputList.length - 2].inputs.down && !inputList[inputList.length - 2].inputs.up && !inputList[inputList.length - 2].inputs.a &&
                    !inputList[inputList.length - 2].inputs.b && inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.left) &&
                    this.canBackdash) {
                return "BACKWARD_DASH";
            } else if (inputs.right && !this.direction && (this.action === "BACKWARD_DASH" || this.action === "NEUTRAL_HIGH" && inputList.length > 2 &&
                    !inputList[inputList.length - 2].inputs.down && !inputList[inputList.length - 2].inputs.up && !inputList[inputList.length - 2].inputs.a &&
                    !inputList[inputList.length - 2].inputs.b && inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.right) &&
                    this.canBackdash) {
                return "BACKWARD_DASH";
            } else if ((inputs.right && this.direction || inputs.left && !this.direction) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                return "FORWARD_HIGH";
            } else if ((inputs.left && this.direction || inputs.right && !this.direction) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                return "BACKWARD_HIGH";
            } else if ([...this.GROUND_ACTIONS, ...this.HIGH_ATTACKS, ...this.LAG_ACTIONS].includes(this.action)) {
                return "NEUTRAL_HIGH";
            } else {
                return null;
            }
        }


        //------------------------------------------------------------------------------------------------------------------------------
        // UPDATE
        //------------------------------------------------------------------------------------------------------------------------------


        this.update = (game, inputList) => {
            this.status = this.getNewStatus(game);

            this.hitboxes = [];
            this.hurtboxes = [];

            this.command = this.getCommandInput(game, inputList);
            if (this.command !== this.action) this.frame = 0;
            this.action = this.command ? this.command : this.action;

            this.updateSize();
            if (!this.AERIAL_ACTIONS.includes(this.action)) this.updateDirection(game);

            if (!this.status) {
                this.moveX(game);
                this.moveY(game);
                if (this.action) this[this.action](game);
            }

            this.command = null;
            if (this.health < 0) this.health = 0;
        };
    }
}