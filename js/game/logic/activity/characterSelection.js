class CharacterSelection extends Activity {
    constructor(mode, characters, stages, players) {
        super();
        this.display = CharacterSelectionDisplay;
        this.nextActivity = null;

        this.mode = mode;
        this.characters = characters;
        this.stages = stages;

        this.size = new Vector2D(3, 5);
        this.cursorInitPos = [new Vector2D(0, 2), new Vector2D(2, 2)];
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
                pos: {...this.cursorInitPos[i]},
                infoFrame: this.cursorInfoInitFrame,
                profileFrame: 0
            });
        });

        this.stageCursor = 0;
        this.stageReady = this.mode === 'Training';

        this.stageInitFrame = 6;
        this.stageFrame = this.stageInitFrame;

        this.selectStageInitFrame = 6;
        this.selectStageFrame = 0;

        this.selectCharacter = (pos, id) => (this.characters[pos.x + pos.y * 3] ? new this.characters[pos.x + pos.y * 3](id) : null);

        this.selectStage = (game, cursor) => {
            var id = cursor.player.id;
            var input = game.inputList.get(id);
            var lastInput = game.lastInputList.get(id);

            if (input.a && !lastInput.a) this.stageReady = true;
            else if (input.b && !lastInput.b && !this.stageReady) {
                this.cursors.forEach((cursorObj, index) => {
                    cursorObj.ready = false;
                    cursorObj.pos = {...this.cursorInitPos[index]};
                    cursorObj.infoFrame = this.cursorInfoInitFrame;
                    cursorObj.profileFrame = this.cursorProfileInitFrame;
                });
                this.stageCursor = 0;
                this.stageFrame = this.stageInitFrame;
            } else {
                if (input.up && !lastInput.up && !this.stageReady) {
                    this.stageCursor = (((this.stageCursor - 1) % this.stages.length) + this.stages.length) % this.stages.length;
                    this.selectStageFrame = -this.selectStageInitFrame;
                }
                if (input.down && !lastInput.down) {
                    this.stageCursor = (((this.stageCursor + 1) % this.stages.length) + this.stages.length) % this.stages.length;
                    this.selectStageFrame = this.selectStageInitFrame;
                }
            }
        };

        this.updatePlayer = (game, cursor, readyNow) => {
            var id = cursor.player.id === 'computer' ? this.cursors[0].player.id : cursor.player.id;
            var input = game.inputList.get(id);
            var lastInput = game.lastInputList.get(id);

            if (input.a && !lastInput.a && this.selectCharacter(cursor.pos, id)) {
                if (!cursor.ready && !readyNow.find(otherId => otherId === id)) {
                    cursor.ready = true;
                    cursor.infoFrame = this.cursorInfoInitFrame;
                    readyNow.push(id);
                }
            } else if (input.b && !lastInput.b) {
                if (cursor.player.id === 'computer') {
                    this.cursors[0].ready = false;
                    cursor.infoFrame = this.cursorInfoInitFrame;
                } else {
                    if (cursor.ready) {
                        cursor.ready = false;
                        cursor.infoFrame = this.cursorInfoInitFrame;
                    } else this.nextActivity = new Menu(game.mainMenuOptions, game.mainMenuOptionYCenter, game.mainMenuHandler);
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
        };

        this.update = game => {
            if (this.initAnimFrame) this.initAnimFrame--;
            else if (this.nextActivity) {
                if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
                else this.endAnimFrame++;
            } else if (!this.initAnimFrame && !this.endAnimFrame) {
                if (this.cursors.find(cursor => !cursor.ready || cursor.infoFrame)) {
                    if (this.initInfo3Frame) this.initInfo3Frame--;
                    var readyNow = [];
                    this.cursors.forEach(cursor => {
                        if (cursor.infoFrame) cursor.infoFrame--;
                        if (cursor.profileFrame) cursor.profileFrame--;
                        if (cursor.player.id !== 'computer' || this.cursors[0].ready) this.updatePlayer(game, cursor, readyNow);
                    });
                } else {
                    if (this.stageReady) {
                        this.cursors.forEach(cursor => {
                            cursor.player.character = this.selectCharacter(cursor.pos, cursor.player.id);
                        });
                        this.nextActivity = new Fight(
                            this.cursors.map(cursor => cursor.player),
                            new (this.mode === 'Training' ? TrainingStage : this.stages[this.stageCursor])(),
                            this.mode === 'Training',
                            true,
                            0
                        );
                    } else {
                        if (this.selectStageFrame > 0) this.selectStageFrame--;
                        if (this.selectStageFrame < 0) this.selectStageFrame++;
                        if (this.stageFrame) this.stageFrame--;
                        else {
                            this.cursors.forEach(cursor => {
                                if (cursor.player.id !== 'computer') this.selectStage(game, cursor);
                            });
                        }
                    }
                }
            }
        };
    }
}
