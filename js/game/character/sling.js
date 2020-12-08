class Sling extends Character {
    constructor(data, action, direction, position) {
        super(data, action, direction, position);

        //------------------------------------------------------------------------------------------------------------------------------
        // DATA
        //------------------------------------------------------------------------------------------------------------------------------

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

        this.collisionBox = new CollisionBox(new Vector2D(position - this.idleSize.x / 2, 270 - 16 - this.idleSize.y), this.idleSize.times(1));
        
        //------------------------------------------------------------------------------------------------------------------------------
        // ACTIONS
        //------------------------------------------------------------------------------------------------------------------------------

        this.LAND = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-25, -53)), new Vector2D(50, 106)));
        };
        this.GET_UP = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center(), new Vector2D(0, 0)));
        };

        this.BACKWARD_DASH = game => { };

        this.FORWARD_DASH = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-40, -60)), new Vector2D(75, 115)));
        };

        this.BACKWARD_LOW = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
        };

        this.BLOCK_LOW = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
        };

        this.NEUTRAL_LOW = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
        };

        this.FORWARD_LOW = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
        };

        this.BACKWARD_HIGH = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(42, 128)));
        };

        this.BLOCK_HIGH = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(42, 128)));
        };

        this.NEUTRAL_HIGH = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-24, -64)), new Vector2D(48, 128)));
        };

        this.FORWARD_HIGH = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(42, 128)));
        };

        this.BACKWARD_AERIAL = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(48, 128)));
        };

        this.BLOCK_AERIAL = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(48, 128)));
        };

        this.NEUTRAL_AERIAL = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(48, 128)));
        };

        this.FORWARD_AERIAL = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-21, -64)), new Vector2D(48, 128)));
        };

        this.LOW_A = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
            if (this.frame > 4 && this.frame < 7) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -26, 24)), new Vector2D(75, 28), 'storke', 20, 10, false, 20, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -26, 24)), new Vector2D(52, 28)));
            }
        };
        this.LOW_B = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -48)), new Vector2D(70, 96)));
            if (this.frame > 15 && this.frame < 23) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -45, 25)), new Vector2D(105, 25), 'storke', 0, 1, true, 15, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -45, 25)), new Vector2D(90, 25)));
            }
        };

        this.AERIAL_A = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-24, -58)), new Vector2D(48, 116)));
            if (this.frame > 5 && this.frame < 9) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -16, 10)), new Vector2D(40, 24), 'storke', 40, 25, false, 40, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -16, 10)), new Vector2D(32, 16)));
            }
        };
        this.AERIAL_B = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-24, -64)), new Vector2D(48, 128)));
            if (this.frame > 3 && this.frame < 15) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -29, 48)), new Vector2D(75, 24), 'storke', 60, 40, false, 60, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -29, 48)), new Vector2D(58, 24)));
            }
        };

        this.HIGH_A = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -64)), new Vector2D(70, 128)));
            if (this.frame > 6 && this.frame < 9) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -30, -48)), new Vector2D(80, 24), 'storke', 30, 15, false, 30, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -30, -48)), new Vector2D(60, 24)));
            }
        };

        this.HIGH_B = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D(-35, -64)), new Vector2D(70, 128)));
            if (this.frame > 11 && this.frame < 18) {
                this.hitboxes.push(new HitBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -40, -48)), new Vector2D(110, 32), 'storke', 75, 30, false, 75, this.direction, 0));
                this.hurtboxes.push(new HurtBox(this.collisionBox.center().plus(new Vector2D((this.direction ? -0.5 : 2.5) * -40, -48)), new Vector2D(80, 32)));
            }
        };

        this.QCF = game => {
            if (this.frame === 13) {
                game.activity.actors.push(new Projectile(new CollisionBox(this.collisionBox.pos.plus(new Vector2D(this.collisionBox.size.x / 2, 16)), new Vector2D(32, 32)), this.playerId, this.direction, new Vector2D(10, 0), 10, 5, false, 5));
            }
        };
        this.QCB = game => { };
        this.DP = game => { };
        this.HCF = game => { };
        this.HIT = game => { };
        this.EJECTED = game => { };
        this.GROUND = game => {
            this.hurtboxes.push(new HurtBox(this.collisionBox.center(), new Vector2D(0, 0)));
        };
        this.RECOVER = game => { };
        this.TECH = game => { };
    }
}
Sling.id = '00';