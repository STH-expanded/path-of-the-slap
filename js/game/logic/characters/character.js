class Character {
    constructor() {
        this.id = 0;
        this.name = 'Character';

        this.keys = null;

        this.size = new Vector2D(32, 32);
        this.pos = new Vector2D(0, 0);
        this.speed = new Vector2D(0, 0);

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.walkSpeed = 8;
        this.jumpSpeed = 24;
        this.gravity = new Vector2D(0, 2);
        
        this.moveX = game => {
            if (this.keys.left){
                this.speed.x = -this.walkSpeed;
            } 
            else if (this.keys.right) this.speed.x = this.walkSpeed;
            else this.speed.x = 0;

            var newPos = this.pos.plus(new Vector2D(this.speed.x, 0));

            if (!inBound(newPos, this.size, game.fight.stage.pos, game.fight.stage.size)) {
                this.speed.x = 0;
            } else {
                this.pos = newPos;
            }
        };

        this.moveY = game => {
            if (this.pos.y + this.size.y === game.fight.stage.pos.y + game.fight.stage.size.y && this.keys.up) this.speed.y = -this.jumpSpeed;
            this.speed.y += this.gravity.y;

            let newPos = this.pos.plus(new Vector2D(0, this.speed.y));

            if (!inBound(newPos, this.size, game.fight.stage.pos, game.fight.stage.size)) {
                this.speed.y = 0;
            } else {
                this.pos = newPos;
            }
        };

        this.update = (game, keys) => {
            this.keys = keys;
            this.moveX(game);
            this.moveY(game);
        }
    }
}