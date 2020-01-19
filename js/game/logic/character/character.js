class Character {
    constructor(playerId) {
        this.playerId = playerId;

        this.id = '00';
        this.name = 'ParentCharacter';

        this.LAG_ACTIONS = ["LAND", "GET_UP"];
        this.DASH_ACTIONS = ["FORWARD_DASH", "BACK_DASH"];
        this.JUMP_ACTIONS = ["NEUTRAL_JUMP", "FORWARD_JUMP", "BACK_JUMP"];
        this.CROUCH_ACTIONS = ["FORWARD_CROUCH", "BACKWARD_CROUCH", "NAUTRAL_CROUCH"];
        this.GROUND_ACTIONS = ["IDLE", "MOVE_FORWARD", "MOVE_BACKWARD", ...this.CROUCH_ACTIONS, ...this.DASH_ACTIONS];

        this.status = null;
        this.action = null;
        this.command = null;

        this.collisionBox = new CollisionBox(null, null);
        this.speed = new Vector2D(0, 0);
        this.direction = null;
        // this.weight ?

        this.hurtboxes = [];
        this.hitboxes = [];

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.idleSize = new Vector2D(48, 96);
        this.jumpSize = new Vector2D(48, 64);
        this.crouchSize = new Vector2D(48, 64);

        this.moveForwardSpeed = 2;
        this.moveBackwardSpeed = -2;
        this.forwardDashSpeed = 6;
        this.backDashSpeed = -6;

        this.forwardJumpSpeed = 4;
        this.backJumpSpeed = -4;
        this.jumpHeight = 24;
        this.gravity = new Vector2D(0, 2);

        this.moveX = game => {
            var direction = this.direction ? 1 : -1;

            switch (this.action) {
                case "MOVE_FORWARD":
                    this.speed.x = direction * this.moveForwardSpeed;
                    break;
                case "MOVE_BACKWARD":
                    this.speed.x = direction * this.moveBackwardSpeed;
                    break;
                case "FORWARD_DASH":
                    this.speed.x = direction * this.forwardDashSpeed;
                    break;
                case "BACK_DASH":
                    this.speed.x = direction * this.backDashSpeed;
                    break;
                case "FORWARD_JUMP":
                    this.speed.x = direction * this.forwardJumpSpeed;
                    break;
                case "BACK_JUMP":
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
            if (this.JUMP_ACTIONS.includes(this.command)) this.speed.y -= this.jumpHeight;
            this.speed.y += this.gravity.y;

            let newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(0, this.speed.y)), this.collisionBox.size);
            if (newCollisionBox.isIncludedIn(game.activity.stage)) this.collisionBox = newCollisionBox;
            else this.speed.y = 0;
        }

        // this.attack = game => {
        //     if (inputList[inputList.length - 1].inputs.a) {
        //         const dir = this.direction ? this.hurtbox.playerPos.x + this.hurtbox.playerSize.x / 2 : this.hurtbox.playerPos.x + this.hurtbox.playerSize.x / 2 - this.hurtbox.playerSize.x;
        //         this.hitbox = new HitBox(new Vector2D(dir, this.hurtbox.playerPos.y + 10), new Vector2D(this.hurtbox.playerSize.x, 20));
        //         this.isAttack = true;
        //         if (this.hitbox.isIntersect(this.hitbox.playerPos, this.opponent.character.hurtbox.playerPos, this.opponent.character.hurtbox.playerSize)) {
        //             this.opponent.character.health -= 5;
        //         } else {
        //             console.log('Missed');
        //         }
        //     } else this.isAttack = false;
        // };

        this.updateSize = () => {
            if (this.JUMP_ACTIONS.includes(this.command) && this.collisionBox.size.y !== this.jumpSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.jumpSize.y;
                this.collisionBox.size.y = this.jumpSize.y;
            } else if (this.CROUCH_ACTIONS.includes(this.command) && this.collisionBox.size.y !== this.crouchSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.crouchSize.y;
                this.collisionBox.size.y = this.crouchSize.y;
            } else if (![...this.JUMP_ACTIONS, ...this.CROUCH_ACTIONS].includes(this.action) && this.collisionBox.size.y !== this.idleSize.y) {
                this.collisionBox.pos.y -= this.idleSize.y - this.collisionBox.size.y;
                this.collisionBox.size.y = this.idleSize.y;
            }
        }

        this.updateDirection = game => {
            var other = game.activity.players.find(player => player.id !== this.playerId).character.collisionBox;
            this.direction = this.collisionBox.pos.x + this.collisionBox.size.x / 2 === other.pos.x + other.size.x / 2 ?
                this.direction : this.collisionBox.pos.x + this.collisionBox.size.x / 2 < other.pos.x + other.size.x / 2;
        }

        this.getCommandInput = (game, inputList) => {
            var inputs = inputList[inputList.length - 1].inputs;

            if (this.collisionBox.pos.y + this.collisionBox.size.y >= game.activity.stage.size.y && this.JUMP_ACTIONS.includes(this.action)) {
                return "LAND";
            } else if (!inputs.down && this.CROUCH_ACTIONS.includes(this.action)) {
                return "GET_UP";
            } else if (inputs.up && this.GROUND_ACTIONS.includes(this.action)) {
                return (inputs.left && !this.direction || inputs.right && this.direction) ? "FORWARD_JUMP" :
                    (inputs.left && this.direction || inputs.right && !this.direction) ? "BACK_JUMP" :
                    "NEUTRAL_JUMP";
            } else if (inputs.down && this.GROUND_ACTIONS.includes(this.action)) {
                return (inputs.left && !this.direction || inputs.right && this.direction) ? "FORWARD_CROUCH" :
                    (inputs.left && this.direction || inputs.right && !this.direction) ? "BACKWARD_CROUCH" :
                    "NAUTRAL_CROUCH";
            } else if (inputs.right && (this.DASH_ACTIONS.includes(this.action) || this.action === "IDLE" && inputList.length > 2 &&
                    inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.right)) {
                return this.direction ? "FORWARD_DASH" :
                    "BACK_DASH";
            } else if (inputs.left && (this.DASH_ACTIONS.includes(this.action) || this.action === "IDLE" && inputList.length > 2 &&
                    inputList[inputList.length - 2].frames < 8 && inputList[inputList.length - 3].inputs.left)) {
                return this.direction ? "BACK_DASH" :
                    "FORWARD_DASH";
            } else if ((inputs.right && this.direction || inputs.left && !this.direction) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                return "MOVE_FORWARD";
            } else if ((inputs.left && this.direction || inputs.right && !this.direction) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                return "MOVE_BACKWARD";
            } else if ([...this.GROUND_ACTIONS, ...this.LAG_ACTIONS].includes(this.action)) {
                return "IDLE";
            } else {
                return null;
            }
        }

        this.update = (game, inputList) => {
            this.command = this.getCommandInput(game, inputList);
            this.action = this.command ? this.command : this.action;

            this.updateSize();
            if (!this.JUMP_ACTIONS.includes(this.action)) this.updateDirection(game);

            if (!this.status) {
                this.moveX(game);
                this.moveY(game);
                // this.attack(game);
            }

            this.command = null;
        };
    }
}