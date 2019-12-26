class Character {
    constructor() {
        this.id = 0;
        this.name = 'ParentCharacter';

        this.mugshotImg = 'cm01';
        this.profileImg = 'cp01';

        this.inputs = null;

        this.pos = null;
        this.size = new Vector2D(32, 128);
        this.speed = new Vector2D(0, 0);

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.walkSpeed = 6;
        this.jumpSpeed = 24;
        this.gravity = new Vector2D(0, 2);
        
        this.moveX = game => {
            if (this.inputs.left){
                this.speed.x = -this.walkSpeed;
            }
            else if (this.inputs.right) this.speed.x = this.walkSpeed;
            else this.speed.x = 0;

            var newPos = this.pos.plus(new Vector2D(this.speed.x, 0));

            if (!inBound(newPos, this.size, game.activity.stage.pos, game.activity.stage.size)) {
                this.speed.x = 0;
            } else {
                this.pos = newPos;
            }
        };

        this.moveY = game => {
            if (this.pos.y + this.size.y === game.activity.stage.pos.y + game.activity.stage.size.y && this.inputs.up) this.speed.y = -this.jumpSpeed;
            this.speed.y += this.gravity.y;

            let newPos = this.pos.plus(new Vector2D(0, this.speed.y));

            if (!inBound(newPos, this.size, game.activity.stage.pos, game.activity.stage.size)) {
                this.speed.y = 0;
            } else {
                this.pos = newPos;
            }
        };

        this.update = (game, inputs) => {
            this.inputs = inputs;
            this.moveX(game);
            this.moveY(game);
        }
    }
}