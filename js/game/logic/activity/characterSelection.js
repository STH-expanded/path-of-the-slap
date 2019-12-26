class CharacterSelection extends Activity {
    constructor(mode, characters, players) {
        super();
        this.mode = mode;
        this.characters = characters;

        this.size = new Vector2D(3, 5);
        this.cursorInitPos = [
            new Vector2D(0, 2),
            new Vector2D(2, 2)
        ];

        this.initAnimFrame = 60;
        this.mugshotOrder = [
            [56, 36, 32, 44, 48],
            [52, 40, 28, 40, 52],
            [48, 44, 32, 36, 56]
        ];

        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;
        
        this.nextActivity = null;

        this.cursors = [];
        players.forEach((player, i) => {
            this.cursors.push({
                player: player,
                ready: false,
                pos: this.cursorInitPos[i]
            });
        });

        this.selectCharacter = pos => this.characters[pos.x + pos.y * 3] ? new this.characters[pos.x + pos.y * 3]() : null;

        this.updatePlayer = (game, cursor, readyNow) => {
            var id = cursor.player.id === 'computer' ? this.cursors[0].player.id : cursor.player.id;
            var input = game.inputList.get(id);
            var lastInput = game.lastInputList.get(id);

            if (input.a && !lastInput.a && this.selectCharacter(cursor.pos)) {
                if (!cursor.ready && !readyNow.find(otherId => otherId === id)) {
                    cursor.ready = true;
                    readyNow.push(id);
                }
            }
            else if (input.b && !lastInput.b) {
                if (cursor.player.id === 'computer') this.cursors[0].ready = false;
                else {
                    if (cursor.ready) cursor.ready = false;
                    else this.nextActivity = new Menu(game.mainMenuOptions, game.mainMenuHandler);
                }
            } else if (!cursor.ready) {
                if (input.up && !lastInput.up) cursor.pos.y = (((cursor.pos.y - 1) % this.size.y) + this.size.y) % this.size.y;
                if (input.down && !lastInput.down) cursor.pos.y = (((cursor.pos.y + 1) % this.size.y) + this.size.y) % this.size.y;
                if (input.left && !lastInput.left) cursor.pos.x = (((cursor.pos.x - 1) % this.size.x) + this.size.x) % this.size.x;
                if (input.right && !lastInput.right) cursor.pos.x = (((cursor.pos.x + 1) % this.size.x) + this.size.x) % this.size.x;
            }
        }

        this.update = game => {
            if (this.initAnimFrame) this.initAnimFrame--;
            if (this.nextActivity) {
                if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
                else this.endAnimFrame++;
            } else if (!this.initAnimFrame && !this.endAnimFrame) {
                var readyNow = [];
                this.cursors.forEach(cursor => {
                    if (cursor.player.id !== 'computer' || this.cursors[0].ready) this.updatePlayer(game, cursor, readyNow);
                });
            }

            if (!this.cursors.find(cursor => !cursor.ready)) {
                this.cursors.forEach(cursor => cursor.player.character = this.selectCharacter(cursor.pos));
                this.nextActivity = new Fight(this.cursors.map(cursor => cursor.player), new game.stages[0](), true);
            }
        }
    }
}