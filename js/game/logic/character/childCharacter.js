class ChildCharacter extends Character {
    constructor(playerId) {
        super(playerId);


        //------------------------------------------------------------------------------------------------------------------------------
        // DATA
        //------------------------------------------------------------------------------------------------------------------------------


        this.id = '01';
        this.name = 'ChildCharacter';

        this.idleSize = new Vector2D(24, 96);
        this.jumpSize = new Vector2D(24, 64);
        this.crouchSize = new Vector2D(24, 64);


        //------------------------------------------------------------------------------------------------------------------------------
        // PHYSIC ENGINE
        //------------------------------------------------------------------------------------------------------------------------------


        // DEFAULT


        //------------------------------------------------------------------------------------------------------------------------------
        // ACTIONS
        //------------------------------------------------------------------------------------------------------------------------------


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