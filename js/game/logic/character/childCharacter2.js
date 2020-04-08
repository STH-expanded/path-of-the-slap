class ChildCharacter2 extends Character {
    constructor(playerId) {
        super(playerId);


        //------------------------------------------------------------------------------------------------------------------------------
        // DATA
        //------------------------------------------------------------------------------------------------------------------------------


        this.id = '02';
        this.name = 'ChildCharacter2';

        this.forwardDashFrame = 15;
        this.backDashFrame = 10;

        this.canBackdash = true;
        this.runBackDash = false;
        
        this.canDash = true;
        this.runDash = false;

        this.idleSize = new Vector2D(24, 96);
        this.jumpSize = new Vector2D(24, 64);
        this.crouchSize = new Vector2D(24, 64);

        this.forwardDashSpeed = 8;
        this.backDashSpeed = -8;

        //------------------------------------------------------------------------------------------------------------------------------
        // PHYSIC ENGINE
        //------------------------------------------------------------------------------------------------------------------------------


        // DEFAULT


        //------------------------------------------------------------------------------------------------------------------------------
        // ACTIONS
        //------------------------------------------------------------------------------------------------------------------------------

        this.BACKWARD_DASH = game => {
            this.frame++;
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);
            this.hurtboxes.push(new HurtBox(new Vector2D(center.x, center.y - 4), new Vector2D(50, 106)));
        };

        this.NEUTRAL_HIGH = game => {
            var center = new Vector2D(this.collisionBox.pos.x + this.collisionBox.size.x / 2, this.collisionBox.pos.y + this.collisionBox.size.y / 2);

            this.hurtboxes.push(new HurtBox(
                new Vector2D(center.x - 8, center.y),
                new Vector2D(48, 128)
            ));
        }

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
            }
        };

        this.QCF = game => {
            this.frame++;
        }

        //------------------------------------------------------------------------------------------------------------------------------
        // INPUTS
        //------------------------------------------------------------------------------------------------------------------------------


        // DEFAULT


        //------------------------------------------------------------------------------------------------------------------------------
        // UPDATE
        //------------------------------------------------------------------------------------------------------------------------------


        // DEFAULT
    }
}