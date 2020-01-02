class CharacterSelection extends Activity {
    constructor(mode, characters, players) {
        super();
        this.display = CharacterSelectionDisplay;
        this.nextActivity = null;

        this.mode = mode;
        this.characters = characters;

        this.size = new Vector2D(3, 5);
        this.cursorInitPos = [
            new Vector2D(0, 2),
            new Vector2D(2, 2)
        ];
        this.cursorInfoInitFrame = 16;
        this.cursorProfileInitFrame = 8;

        this.initAnimFrame = 60;
        this.mugshotOrder = [
            [56, 36, 32, 44, 48],
            [52, 40, 28, 40, 52],
            [48, 44, 32, 36, 56]
        ];

        this.initInfo3Frame = 16;

        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;

        this.cursors = [];
        players.forEach((player, i) => {
            this.cursors.push({
                player: player,
                ready: false,
                pos: this.cursorInitPos[i],
                infoFrame: this.cursorInfoInitFrame,
                profileFrame: 0
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
                    cursor.infoFrame = this.cursorInfoInitFrame;
                    readyNow.push(id);
                }
            }
            else if (input.b && !lastInput.b) {
                if (cursor.player.id === 'computer') {
                    this.cursors[0].ready = false;
                    cursor.infoFrame = this.cursorInfoInitFrame;
                }
                else {
                    if (cursor.ready) {
                        cursor.ready = false;
                        cursor.infoFrame = this.cursorInfoInitFrame;
                    }
                    else this.nextActivity = new Menu(game.mainMenuOptions, game.mainMenuOptionYCenter, game.mainMenuHandler);
                }
            } else if (!cursor.ready) {
                if (input.up && !lastInput.up) {
                    cursor.pos.y = (((cursor.pos.y - 1) % this.size.y) + this.size.y) % this.size.y;
                    cursor.profileFrame = this.cursorProfileInitFrame;
                }
                if (input.down && !lastInput.down) {
                    cursor.pos.y = (((cursor.pos.y + 1) % this.size.y) + this.size.y) % this.size.y;
                    cursor.profileFrame = this.cursorProfileInitFrame;
                }
                if (input.left && !lastInput.left) {
                    cursor.pos.x = (((cursor.pos.x - 1) % this.size.x) + this.size.x) % this.size.x;
                    cursor.profileFrame = this.cursorProfileInitFrame;
                }
                if (input.right && !lastInput.right) {
                    cursor.pos.x = (((cursor.pos.x + 1) % this.size.x) + this.size.x) % this.size.x;
                    cursor.profileFrame = this.cursorProfileInitFrame;
                }
            }
        }

        this.update = game => {
            if (this.initAnimFrame) this.initAnimFrame--;
            if (this.nextActivity) {
                if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
                else this.endAnimFrame++;
            } else if (!this.initAnimFrame && !this.endAnimFrame) {
                if (this.initInfo3Frame) this.initInfo3Frame--;
                var readyNow = [];
                this.cursors.forEach(cursor => {
                    if (cursor.infoFrame) cursor.infoFrame--;
                    if (cursor.profileFrame) cursor.profileFrame--;
                    if (cursor.player.id !== 'computer' || this.cursors[0].ready) this.updatePlayer(game, cursor, readyNow);
                });
            }

            if (!this.cursors.find(cursor => !cursor.ready)) {
                this.cursors.forEach(cursor => cursor.player.character = this.selectCharacter(cursor.pos));
                this.nextActivity = new Fight(this.cursors.map(cursor => cursor.player), new game.stages[0](), this.mode === 'Training', true);
            }
        }
    }
}