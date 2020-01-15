class Character {
    constructor(playerID) {
        this.playerID = playerID;
        this.id = '00';
        this.name = 'ParentCharacter';

        this.inputList = null;
        this.opponent = null;
        this.isAttack = false;

        this.hurtbox = new HurtBox(new Vector2D(0, 0), new Vector2D(32, 128));
        this.speed = new Vector2D(0, 0);

        this.maxHealth = 1000;
        this.health = this.maxHealth;

        this.walkSpeed = 6;
        this.jumpSpeed = 24;
        this.gravity = new Vector2D(0, 2);

        this.moveX = game => {
            if (this.inputList[this.inputList.length - 1].inputs.left) {
                this.speed.x = -this.walkSpeed;
            } else if (this.inputList[this.inputList.length - 1].inputs.right) this.speed.x = this.walkSpeed;
            else this.speed.x = 0;

            var newPos = this.hurtbox.playerPos.plus(new Vector2D(this.speed.x, 0));

            if (!this.hurtbox.inBound(newPos, game.activity.stage.pos, game.activity.stage.size) || this.hurtbox.isIntersect(newPos, this.opponent.character.hurtbox.playerPos, this.opponent.character.hurtbox.playerSize)) {
                this.speed.x = 0;
            } else {
                this.hurtbox.playerPos = newPos;
            }
        };

        this.moveY = game => {
            if (this.hurtbox.playerPos.y + this.hurtbox.playerSize.y === game.activity.stage.pos.y + game.activity.stage.size.y && this.inputList[this.inputList.length - 1].inputs.up) this.speed.y = -this.jumpSpeed;
            this.speed.y += this.gravity.y;

            let newPos = this.hurtbox.playerPos.plus(new Vector2D(0, this.speed.y));

            if (!this.hurtbox.inBound(newPos, game.activity.stage.pos, game.activity.stage.size) || this.hurtbox.isIntersect(newPos, this.opponent.character.hurtbox.playerPos, this.opponent.character.hurtbox.playerSize)) {
                this.speed.y = 0;
            } else {
                this.hurtbox.playerPos = newPos;
            }
        };

        this.attack = game => {
            if (this.inputList[this.inputList.length - 1].inputs.a) {
                this.isAttack = true;
            } else this.isAttack = false;
        };

        this.update = (game, inputList) => {
            this.inputList = inputList;
            [game.activity.player1, game.activity.player2].forEach(player => {
                if (player.id !== this.playerID) {
                    this.opponent = player;
                }
            });
            this.moveX(game);
            this.moveY(game);
            this.hitbox = new HitBox(new Vector2D(this.hurtbox.playerPos.x + this.hurtbox.playerSize.x / 2, this.hurtbox.playerPos.y + 10), new Vector2D(this.hurtbox.playerSize.x, 20));
            this.attack(game);
        };
    }
}
