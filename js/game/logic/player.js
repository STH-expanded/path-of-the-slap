class Player {
  constructor(id, character, type) {
    this.id = id;
    this.character = character;
    this.type = type;
    this.speed = {
      x: 0,
      y: 0
    };
    this.index = null;

    this.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      a: false,
      b: false
    };
    this.keysHistory = [
      {
        keys: this.keys,
        frames: 0
      }
    ];

    this.updateKeysHistory = () => {
      if (this.keysHistory.length > 0 && util.sameKeys(this.keys, this.keysHistory[this.keysHistory.length - 1].keys))
        this.keysHistory[this.keysHistory.length - 1].frames++;
      else {
        if (this.keysHistory.length === 10) this.keysHistory.splice(0, 1);
        this.keysHistory.push({
          keys: this.keys,
          frames: 1
        });
      }
    };

    this.update = game => {
      this.moveX(game);
      this.moveY(game);
    };

    this.moveX = game => {
      if (game.inputList.left) this.speed.x = -this.character.walkSpeed;
      else if (game.inputList.right) this.speed.x = this.character.walkSpeed;
      else this.speed.x = 0;

      var newPos = this.character.pos.plus(new Vector2D(this.speed.x, 0));

      var obstacles = inBound(newPos, this.character.size, game.stage.size);

      if (obstacles.length > 0) {
        this.speed.x = 0;
      } else {
        this.pos = newPos;
      }
    };

    this.moveY = game => {
      var floors = inBound(
        this.character.pos.plus(new Vector2D(0, this.character.size.y)),
        new Vector2D(this.character.size.x, 1),
        game.stage.size
      );

      if (floors.length > 0 && game.inputList.up) this.speed.y = -this.character.jumpSpeed;
      this.speed.y += this.character.gravity.y;

      let newPos = this.character.pos.plus(new Vector2D(0, this.speed.y));

      var obstacles = inBound(newPos, this.character.size, game.stage.size);

      if (obstacles.length > 0) {
        this.speed.y = 0;
      } else {
        this.pos = newPos;
      }
    };
  }
}
