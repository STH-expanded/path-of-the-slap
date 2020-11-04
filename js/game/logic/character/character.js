class Character {
    constructor() {

        //------------------------------------------------------------------------------------------------------------------------------
        // DATA
        //------------------------------------------------------------------------------------------------------------------------------

        this.HIT_STATUS = ['HIT', 'EJECTED', 'GROUND'];
        this.INVINCIBLE_STATUS = ['RECOVER', 'TECH'];
        this.BLOCK_STATUS = ['BLOCK_AERIAL', 'BLOCK_HIGH', 'BLOCK_LOW'];

        this.LAG_ACTIONS = ['LAND', 'GET_UP'];
        this.DASH_ACTIONS = ['FORWARD_DASH', 'BACKWARD_DASH'];

        this.AERIAL_ATTACKS = ['AERIAL_A', 'AERIAL_B'];
        this.HIGH_ATTACKS = ['HIGH_A', 'HIGH_B'];
        this.LOW_ATTACKS = ['LOW_A', 'LOW_B'];
        this.COMMAND_ATTACKS = ['QCF'];

        this.AERIAL_ACTIONS = ['BACKWARD_AERIAL', 'NEUTRAL_AERIAL', 'FORWARD_AERIAL'];
        this.HIGH_ACTIONS = ['BACKWARD_HIGH', 'NEUTRAL_HIGH', 'FORWARD_HIGH', ...this.HIGH_ATTACKS];
        this.LOW_ACTIONS = ['BACKWARD_LOW', 'NEUTRAL_LOW', 'FORWARD_LOW', ...this.LOW_ATTACKS];

        this.AERIAL_FULL = [...this.AERIAL_ATTACKS, ...this.AERIAL_ACTIONS, 'BLOCK_AERIAL'];
        this.ATTACK_ACTIONS = [...this.LOW_ATTACKS, ...this.HIGH_ATTACKS, ...this.AERIAL_ATTACKS, ...this.COMMAND_ATTACKS];
        this.GROUND_ACTIONS = [...this.HIGH_ACTIONS, ...this.LOW_ACTIONS, ...this.DASH_ACTIONS, 'BLOCK_HIGH', 'BLOCK_LOW'];

        this.frame = 0;
        this.status = null;
        this.isEjected = false;
        this.action = null;
        this.command = null;
        this.lastAction = null;

        this.collisionBox = new CollisionBox(null, null);
        this.speed = new Vector2D(0, 0);
        this.direction = null;
        // weight ?

        this.hurtboxes = [];
        this.hitboxes = [];
        this.knockbacks = [];

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.highAFrame = 15;
        this.highBFrame = 30;

        this.lowAFrame = 12;
        this.lowBFrame = 30;

        this.getUpFrame = 20;

        this.aerialAFrame = 20;
        this.aerialBFrame = 24;

        this.forwardDashFrame = 20;

        this.qcfFrame = 32;

        this.canBackdash = false;
        this.runBackDash = true;

        this.canDash = true;
        this.runDash = false;

        // attack cancels ?

        this.idleSize = new Vector2D(32, 128);
        this.jumpSize = new Vector2D(32, 96);
        this.crouchSize = new Vector2D(32, 96);

        this.moveForwardSpeed = 1;
        this.moveBackwardSpeed = -2;
        this.forwardDashSpeed = 8;
        this.backDashSpeed = -6;

        this.forwardJumpSpeed = 6;
        this.backJumpSpeed = -4;
        this.jumpHeight = 16;
        this.gravity = new Vector2D(0, 1);

        //------------------------------------------------------------------------------------------------------------------------------
        // PHYSIC ENGINE
        //------------------------------------------------------------------------------------------------------------------------------

        this.moveX = (game) => {
            var direction = this.direction ? 1 : -1;

            switch (this.action) {
                case 'FORWARD_HIGH':
                    this.speed.x = direction * this.moveForwardSpeed;
                    break;
                case 'BACKWARD_HIGH':
                    this.speed.x = direction * this.moveBackwardSpeed;
                    break;
                case 'FORWARD_DASH':
                    this.speed.x = direction * this.forwardDashSpeed;
                    break;
                case 'BACKWARD_DASH':
                    this.speed.x = direction * this.backDashSpeed;
                    break;
                case 'FORWARD_AERIAL':
                    this.speed.x = direction * this.forwardJumpSpeed;
                    break;
                case 'AERIAL_A':
                    if (this.lastAction === 'FORWARD_AERIAL') {
                        this.speed.x = direction * this.forwardJumpSpeed;
                    } else if (this.lastAction === 'BACKWARD_AERIAL') {
                        this.speed.x = direction * this.backJumpSpeed;
                    }
                    break;
                case 'AERIAL_B':
                    if (this.lastAction === 'FORWARD_AERIAL') {
                        this.speed.x = direction * this.forwardJumpSpeed;
                    } else if (this.lastAction === 'BACKWARD_AERIAL') {
                        this.speed.x = direction * this.backJumpSpeed;
                    }
                    break;
                case 'BACKWARD_AERIAL':
                    this.speed.x = direction * this.backJumpSpeed;
                    break;
                default:
                    this.speed.x = 0;
                    break;
            }

            var newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(this.speed.x, 0)), this.collisionBox.size);
            if (!newCollisionBox.isIncludedIn(game.activity.stage)) newCollisionBox.pos.x = newCollisionBox.pos.x < 0 ? 0 : game.activity.stage.size.x - newCollisionBox.size.x;

            var other = game.activity.players.find(player => player.character !== this).character;
            if (newCollisionBox.intersects(other.collisionBox)) {
                if (other.collisionBox.pos.x === 0 || other.collisionBox.pos.x === game.activity.stage.size.x - other.collisionBox.size.x) this.speed.x = 0;
                var otherNewCollisionBox = new CollisionBox(other.collisionBox.pos.plus(new Vector2D(this.speed.x, 0)), other.collisionBox.size);

                newCollisionBox.pos.x = (otherNewCollisionBox.pos.x + otherNewCollisionBox.size.x / 2 < newCollisionBox.pos.x + newCollisionBox.size.x / 2 ? otherNewCollisionBox.pos.x + otherNewCollisionBox.size.x : otherNewCollisionBox.pos.x - newCollisionBox.size.x) + other.speed.x;

                [newCollisionBox, otherNewCollisionBox].forEach((collisionBox) => {
                    if (!collisionBox.isIncludedIn(game.activity.stage)) collisionBox.pos.x = collisionBox.pos.x < 0 ? 0 : game.activity.stage.size.x - collisionBox.size.x;
                });
                other.collisionBox = otherNewCollisionBox;
            }
            this.collisionBox = newCollisionBox;
        };

        this.moveY = (game) => {
            if (this.AERIAL_ACTIONS.includes(this.command) && !this.AERIAL_ATTACKS.includes(this.lastAction)) this.speed.y -= this.jumpHeight;
            this.speed.y += this.gravity.y;

            let newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(0, this.speed.y)), this.collisionBox.size);
            if (newCollisionBox.isIncludedIn(game.activity.stage)) this.collisionBox = newCollisionBox;
            else this.speed.y = 0;
        };

        this.updateSize = () => {
            if (this.AERIAL_FULL.includes(this.command) && this.collisionBox.size.y !== this.jumpSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.jumpSize.y;
                this.collisionBox.size.y = this.jumpSize.y;
            } else if (this.LOW_ACTIONS.includes(this.command) && this.collisionBox.size.y !== this.crouchSize.y) {
                this.collisionBox.pos.y += this.collisionBox.size.y - this.crouchSize.y;
                this.collisionBox.size.y = this.crouchSize.y;
            } else if (![...this.AERIAL_FULL, ...this.LOW_ACTIONS].includes(this.action) && this.collisionBox.size.y !== this.idleSize.y) {
                this.collisionBox.pos.y -= this.idleSize.y - this.collisionBox.size.y;
                this.collisionBox.size.y = this.idleSize.y;
            }
        };

        this.updateDirection = (game) => {
            var other = game.activity.players.find(player => player.character !== this).character.collisionBox;
            this.direction = this.collisionBox.pos.x + this.collisionBox.size.x / 2 === other.pos.x + other.size.x / 2 ? this.direction : this.collisionBox.pos.x + this.collisionBox.size.x / 2 < other.pos.x + other.size.x / 2;
        };

        this.getNewStatus = (game, inputList) => {
            var newStatus = this.status;
            var inputs = inputList.length > 0 ? inputList[inputList.length - 1].input : {};
            if (this.status) {
                if (!this.frame) {
                    if (this.status === 'HIT') {
                        newStatus = null;
                        this.knockbacks = [];
                    }
                    if (this.status === 'BLOCK' && this.BLOCK_STATUS.includes(this.action) && this.status !== 'HIT') {
                        var other = game.activity.players.find(player => player.character !== this).character;
                        var otherHitboxes = other.hitboxes.filter((hitBox) => hitBox.intersectingCollisionBoxes(this.hurtboxes).some((hurtBox) => hurtBox));
                        otherHitboxes.forEach((hitBox) => {
                            if ((!other.HIGH_ATTACKS.includes(other.action) && this.action === 'BLOCK_HIGH') || (!other.LOW_ATTACKS.includes(other.action) && this.action === 'BLOCK_LOW')) {
                                this.health -= hitBox.might;
                                if (hitBox.status === false) {
                                    newStatus = 'HIT';
                                    this.frame = hitBox.stun;
                                    this.knockbacks.push({
                                        affection: (this.collisionBox.pos.x <= 0 || this.collisionBox.pos.x + this.collisionBox.size.x >= game.activity.stage.size.x) && hitBox.type === 'storke' ? 'launcher' : 'self',
                                        direction: hitBox.direction,
                                        deplacement: hitBox.might,
                                        nbframe: hitBox.stun,
                                    });
                                } else if (hitBox.status === true) {
                                    newStatus = 'EJECTED';
                                    this.knockbacks = [];
                                    this.frame = hitBox.stun;
                                    this.knockbacks.push({
                                        affection: 'self',
                                        direction: hitBox.direction,
                                        deplacement: hitBox.might,
                                        nbframe: hitBox.stun,
                                        ejection: true
                                    });
                                }
                            }
                        });
                    }
                    if (this.status === 'BLOCK' && !this.BLOCK_STATUS.includes(this.action)) newStatus = null;
                    if (this.status === 'EJECTED' && this.collisionBox.pos.y + this.collisionBox.size.y === game.activity.stage.size.y) {
                        newStatus = 'GROUND';
                        this.frame = 1;
                    }
                    if (this.status === 'GROUND') newStatus = null;
                } else if (this.status !== 'GROUND') {
                    this.knockbacks.forEach((knockback) => {
                        var direction = knockback.direction ? 1 : -1;
                        if (knockback.affection === 'launcher') {
                            var other = game.activity.players.find(player => player.character !== this).character;
                            var otherNewCollisionBox = new CollisionBox(other.collisionBox.pos.plus(new Vector2D(-1 * direction * (knockback.deplacement / knockback.nbframe), 0)), other.collisionBox.size);
                            other.collisionBox = otherNewCollisionBox;
                        } else if (knockback.affection === 'self') {
                            var newCollisionBox = new CollisionBox(this.collisionBox.pos.plus(new Vector2D(direction * (knockback.deplacement / knockback.nbframe), knockback.ejection ? -10 : 0)), this.collisionBox.size);
                            if (!newCollisionBox.isIncludedIn(game.activity.stage)) {
                                if (newCollisionBox.pos.x < 0) {
                                    newCollisionBox.pos.x = 0;
                                } else {
                                    newCollisionBox.pos.x = game.activity.stage.size.x - newCollisionBox.size.x;
                                }
                            }
                            this.collisionBox = newCollisionBox;
                        }
                    });
                    this.frame--;
                }
            } else {
                var other = game.activity.players.find(player => player.character !== this).character;
                var otherHitboxes = other.hitboxes.filter((hitBox) => hitBox.intersectingCollisionBoxes(this.hurtboxes).some((hurtBox) => hurtBox));
                var projectilesHitboxes = [];
                game.activity.projectiles.forEach((projectile) => {
                    projectilesHitboxes = projectile.hitboxes.filter((hitBox) => hitBox.intersectingCollisionBoxes(this.hurtboxes).some((hurtBox) => hurtBox));
                    if (projectilesHitboxes.length) {
                        projectile.istouchHurt();
                    }
                });
                var allHitboxes = [...otherHitboxes, ...projectilesHitboxes];
                allHitboxes.forEach((hitBox) => {
                    const blockActions = [...this.AERIAL_ACTIONS, 'BACKWARD_HIGH', 'BACKWARD_LOW'];
                    if (((inputs.left && this.direction) || (inputs.right && !this.direction)) && (blockActions.includes(this.action) || hitBox.type === 'projectile')) {
                        newStatus = 'BLOCK';
                    } else {
                        newStatus = 'HIT';
                        this.health -= hitBox.might;
                        if (hitBox.status === false) {
                            newStatus = 'HIT';
                            this.frame = hitBox.stun;
                            this.knockbacks.push({
                                affection: (this.collisionBox.pos.x <= 0 || this.collisionBox.pos.x + this.collisionBox.size.x >= game.activity.stage.size.x) && hitBox.type === 'storke' ? 'launcher' : 'self',
                                direction: hitBox.direction,
                                deplacement: hitBox.might,
                                nbframe: hitBox.stun,
                            });
                        } else if (hitBox.status === true) {
                            newStatus = 'EJECTED';
                            this.knockbacks = [];
                            this.frame = hitBox.stun;
                            this.knockbacks.push({
                                affection: 'self',
                                direction: hitBox.direction,
                                deplacement: hitBox.might,
                                nbframe: hitBox.stun,
                                ejection: true
                            });
                        }
                    }
                });
            }

            return newStatus;
        };
        //------------------------------------------------------------------------------------------------------------------------------
        // ACTIONS
        //------------------------------------------------------------------------------------------------------------------------------

        this.LAND = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y - 4), new Vector2D(50, 106)));
        };
        this.GET_UP = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(0, 0)));
        };

        this.BACKWARD_DASH = (game) => {};

        this.FORWARD_DASH = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y + 8), new Vector2D(75, 115)));
        };

        this.BACKWARD_LOW = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x - (this.direction ? 1 : -1) * 4, center.y), new Vector2D(70, 96)));
        };

        this.BLOCK_LOW = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(70, 96)));
        };

        this.NEUTRAL_LOW = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(70, 96)));
        };

        this.FORWARD_LOW = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 4, center.y), new Vector2D(70, 96)));
        };

        this.BACKWARD_HIGH = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x - (this.direction ? 1 : -1) * 5, center.y), new Vector2D(42, 128)));
        };

        this.BLOCK_HIGH = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(42, 128)));
        };

        this.NEUTRAL_HIGH = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 7, center.y), new Vector2D(47, 128)));
        };

        this.FORWARD_HIGH = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(42, 128)));
        };

        this.BACKWARD_AERIAL = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 128)));
        };

        this.BLOCK_AERIAL = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 128)));
        };

        this.NEUTRAL_AERIAL = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 128)));
        };

        this.FORWARD_AERIAL = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 128)));
        };

        this.LOW_A = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(70, 96)));
            if (this.frame > 4 && this.frame < 7) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y + 35), new Vector2D(75, 28), 20, 10, false, 0, this.direction));
                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y + 35), new Vector2D(52, 28)));
            }
        };
        this.LOW_B = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(70, 96)));
            if (this.frame > 15 && this.frame < 23) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 50, center.y + 36), new Vector2D(105, 25), 50, 15, true, 15, this.direction));
                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 40, center.y + 36), new Vector2D(90, 25)));
            }
        };

        this.AERIAL_A = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 116)));
            if (this.frame > 5 && this.frame < 9) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y), new Vector2D(40, 24), 40, 25, false, 0, this.direction));
                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y), new Vector2D(32, 16)));
            }
        };
        this.AERIAL_B = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(48, 128)));
            if (this.frame > 3 && this.frame < 15) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y + 44), new Vector2D(75, 24), 60, 40, false, 0, this.direction));
                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 30, center.y + 40), new Vector2D(58, 24)));
            }
        };

        this.HIGH_A = (game) => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y), new Vector2D(70, 128)));
            if (this.frame > 6 && this.frame < 9) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 32, center.y - 34), new Vector2D(80, 24), 30, 15, false, 0, this.direction));

                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 32, center.y - 34), new Vector2D(60, 24)));
            }
        };

        this.HIGH_B = (game) => {
            this.frame++;

            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(new Vector2D(center.x + 15, center.y), new Vector2D(70, 128)));

            if (this.frame > 11 && this.frame < 18) {
                this.hitboxes.push(new HitBox('storke', new Vector2D(center.x + (this.direction ? 1 : -1) * 48, center.y - 28), new Vector2D(110, 32), 75, 30, false, 0, this.direction));

                this.hurtboxes.push(new HurtBox(new Vector2D(center.x + (this.direction ? 1 : -1) * 48, center.y - 28), new Vector2D(80, 32)));
            }
        };

        this.QCF = (game) => {
            this.frame++;
            if (this.frame === 13) {
                game.activity.projectiles.push(new Projectile(new CollisionBox(this.collisionBox.pos, new Vector2D(32, 32)), this.playerId, this.direction, new Vector2D(10, 0), 10, 5));
            }
        };
        this.QCB = (game) => {};
        this.DP = (game) => {};
        this.HCF = (game) => {};
        this.HIT = (game) => {};
        this.EJECTED = (game) => {};
        this.GROUND = (game) => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x + 7, center.y), new Vector2D(0, 0)));
        };
        this.RECOVER = (game) => {};
        this.TECH = (game) => {};
        //------------------------------------------------------------------------------------------------------------------------------
        // INPUTS
        //------------------------------------------------------------------------------------------------------------------------------

        this.getCommandInput = (game, inputList) => {
            var inputs = inputList.length > 0 ? inputList[inputList.length - 1].input : {};

            if (this.status === 'HIT') return null;
            if (this.status === 'GROUND' && (inputs.left || inputs.right || inputs.down || inputs.up || inputs.a || inputs.b)) {
                this.status = null;
                return 'GET_UP';
            }
            if (this.action === 'GET_UP') {
                if(this.frame > 10) return 'NEUTRAL_HIGH'
                else return 'GET_UP'
            }

            if (!this.runDash && this.action === 'FORWARD_DASH' && this.frame < this.forwardDashFrame) return 'FORWARD_DASH';
            if (!this.runBackDash && this.action === 'BACKWARD_DASH' && this.frame < this.backDashFrame) return 'BACKWARD_DASH';

            if (this.collisionBox.pos.y + this.collisionBox.size.y >= game.activity.stage.size.y && this.AERIAL_FULL.includes(this.action)) {
                return 'LAND';
            } else if (((inputs.a && this.direction && !inputs.down && !inputs.left && inputList.length > 2 && inputList[inputList.length - 2].frameCount < 8 && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action) && ((inputList[inputList.length - 2].input.right && !inputList[inputList.length - 2].input.down && inputList[inputList.length - 3].input.down) || (inputs.right && inputList[inputList.length - 2].input.right && inputList[inputList.length - 3].input.down) || (inputs.right && !inputList[inputList.length - 2].input.right && inputList[inputList.length - 2].input.down))) || this.action === 'QCF') && this.frame < this.qcfFrame) {
                return 'QCF';
            } else if (((inputs.a && !this.direction && !inputs.down && !inputs.right && inputList.length > 2 && inputList[inputList.length - 2].frameCount < 8 && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action) && ((inputList[inputList.length - 2].input.left && !inputList[inputList.length - 2].input.down && inputList[inputList.length - 3].input.down) || (inputs.left && inputList[inputList.length - 2].input.left && inputList[inputList.length - 3].input.down) || (inputs.left && !inputList[inputList.length - 2].input.left && inputList[inputList.length - 2].input.down))) || this.action === 'QCF') && this.frame < this.qcfFrame) {
                return 'QCF';
            } else if (((inputs.a && this.HIGH_ACTIONS.includes(this.action)) || this.action === 'HIGH_A') && this.frame < this.highAFrame) {
                return 'HIGH_A';
            } else if (((inputs.b && this.HIGH_ACTIONS.includes(this.action)) || this.action === 'HIGH_B') && this.frame < this.highBFrame) {
                return 'HIGH_B';
            } else if (((inputs.a && this.LOW_ACTIONS.includes(this.action)) || this.action === 'LOW_A') && this.frame < this.lowAFrame) {
                return 'LOW_A';
            } else if (((inputs.b && this.LOW_ACTIONS.includes(this.action)) || this.action === 'LOW_B') && this.frame < this.lowBFrame) {
                return 'LOW_B';
            } else if (((inputs.a && this.AERIAL_ACTIONS.includes(this.action)) || this.action === 'AERIAL_A') && this.frame < this.aerialAFrame) {
                return 'AERIAL_A';
            } else if (((inputs.b && this.AERIAL_ACTIONS.includes(this.action)) || this.action === 'AERIAL_B') && this.frame < this.aerialBFrame) {
                return 'AERIAL_B';
            } else if ((inputs.up && this.GROUND_ACTIONS.includes(this.action)) || this.AERIAL_ATTACKS.includes(this.action)) {
                if ((inputs.left && !this.direction) || (inputs.right && this.direction) || (this.AERIAL_ATTACKS.includes(this.action) && this.lastAction === 'FORWARD_AERIAL')) {
                    return 'FORWARD_AERIAL';
                } else if ((inputs.left && this.direction && this.AERIAL_FULL.includes(this.action)) || (inputs.right && !this.direction && this.AERIAL_FULL.includes(this.action))) {
                    if (this.status === 'BLOCK') {
                        return 'BLOCK_AERIAL';
                    }
                } else if ((inputs.left && this.direction) || (inputs.right && !this.direction) || (this.AERIAL_ATTACKS.includes(this.action) && this.lastAction === 'BACKWARD_AERIAL')) {
                    return 'BACKWARD_AERIAL';
                } else {
                    return 'NEUTRAL_AERIAL';
                }
            } else if (inputs.down && this.GROUND_ACTIONS.includes(this.action)) {
                if ((inputs.left && !this.direction) || (inputs.right && this.direction)) {
                    return 'FORWARD_LOW';
                } else if ((inputs.left && this.direction) || (inputs.right && !this.direction)) {
                    if (this.status === 'BLOCK') {
                        return 'BLOCK_LOW';
                    } else {
                        return 'BACKWARD_LOW';
                    }
                } else {
                    return 'NEUTRAL_LOW';
                }
            } else if (((this.runDash && inputs.right) || (!this.runDash && inputs.right && this.lastAction !== 'FORWARD_DASH' && this.action !== 'FORWARD_DASH')) && this.direction && (this.action === 'FORWARD_DASH' || (this.action === 'NEUTRAL_HIGH' && inputList.length > 2 && !inputList[inputList.length - 2].input.down && !inputList[inputList.length - 2].input.up && !inputList[inputList.length - 2].input.a && !inputList[inputList.length - 2].input.b && inputList[inputList.length - 2].frameCount < 8 && inputList[inputList.length - 3].input.right)) && this.canDash) {
                return 'FORWARD_DASH';
            } else if (((this.runDash && inputs.left) || (!this.runDash && inputs.left && this.lastAction !== 'FORWARD_DASH' && this.action !== 'FORWARD_DASH')) && !this.direction && (this.action === 'FORWARD_DASH' || (this.action === 'NEUTRAL_HIGH' && inputList.length > 2 && !inputList[inputList.length - 2].input.down && !inputList[inputList.length - 2].input.up && !inputList[inputList.length - 2].input.a && !inputList[inputList.length - 2].input.b && inputList[inputList.length - 2].frameCount < 8 && inputList[inputList.length - 3].input.left)) && this.canDash) {
                return 'FORWARD_DASH';
            } else if (((this.runBackDash && inputs.left) || (!this.runBackDash && inputs.left && this.lastAction !== 'BACKWARD_DASH' && this.action !== 'BACKWARD_DASH')) && this.direction && (this.action === 'BACKWARD_DASH' || (this.action === 'NEUTRAL_HIGH' && inputList.length > 2 && !inputList[inputList.length - 2].input.down && !inputList[inputList.length - 2].input.up && !inputList[inputList.length - 2].input.a && !inputList[inputList.length - 2].input.b && inputList[inputList.length - 2].frameCount < 8 && inputList[inputList.length - 3].input.left)) && this.canBackdash) {
                return 'BACKWARD_DASH';
            } else if (((this.runBackDash && inputs.right) || (!this.runBackDash && inputs.right && this.lastAction !== 'BACKWARD_DASH' && this.action !== 'BACKWARD_DASH')) && !this.direction && (this.action === 'BACKWARD_DASH' || (this.action === 'NEUTRAL_HIGH' && inputList.length > 2 && !inputList[inputList.length - 2].input.down && !inputList[inputList.length - 2].input.up && !inputList[inputList.length - 2].input.a && !inputList[inputList.length - 2].input.b && inputList[inputList.length - 2].frameCount < 8 && inputList[inputList.length - 3].input.right)) && this.canBackdash) {
                return 'BACKWARD_DASH';
            } else if (((inputs.right && this.direction) || (inputs.left && !this.direction)) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                return 'FORWARD_HIGH';
            } else if (((inputs.left && this.direction) || (inputs.right && !this.direction)) && this.GROUND_ACTIONS.includes(this.action) && !this.DASH_ACTIONS.includes(this.action)) {
                if (this.status === 'BLOCK') {
                    return 'BLOCK_HIGH';
                } else {
                    return 'BACKWARD_HIGH';
                }
            } else if ([...this.GROUND_ACTIONS, ...this.ATTACK_ACTIONS, ...this.LAG_ACTIONS].includes(this.action)) {
                return 'NEUTRAL_HIGH';
            } else {
                return null;
            }
        };

        //------------------------------------------------------------------------------------------------------------------------------
        // UPDATE
        //------------------------------------------------------------------------------------------------------------------------------

        this.update = (game, inputList) => {
            this.status = this.getNewStatus(game, inputList.state);

            this.hitboxes = [];
            this.hurtboxes = [];

            this.command = this.getCommandInput(game, inputList.state);
            if (this.command !== this.action && this.status !== 'HIT') {
                this.lastAction = this.action;
                this.frame = 0;
            }
            if (this.command) this.action = this.command;

            this.updateSize();
            if (!this.AERIAL_FULL.includes(this.action) && !this.LAG_ACTIONS.includes(this.action)) this.updateDirection(game);

            if (!this.status || this.status === 'BLOCK' || this.status === 'EJECTED') {
                this.moveX(game);
                this.moveY(game);
                if (this.action) this[this.action](game);
            } else {
                this[this.status](game);
            }

            this.command = null;
            if (this.health < 0) this.health = 0;
        };
    }
}
Character.id = '00';