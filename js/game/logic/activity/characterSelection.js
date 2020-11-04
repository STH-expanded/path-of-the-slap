class CharacterSelection extends Activity {
    constructor(mode, characters, stages, players) {
        super();
        this.display = CharacterSelectionDisplay;

        this.initAnimInitFrame = 60;
        this.initAnimFrame = this.initAnimInitFrame;
        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;

        this.initInfo3Frame = 16;
        this.mugshotOrder = [
            [56, 36, 32, 44, 48],
            [52, 40, 28, 40, 52],
            [48, 44, 32, 36, 56]
        ];

        this.stageInitFrame = 6;
        this.stageFrame = this.stageInitFrame;
        this.selectStageInitFrame = 6;
        this.selectStageFrame = 0;

        this.size = new Vector2D(3, 5);
        this.cursorInitPos = [new Vector2D(0, 2), new Vector2D(2, 2)];
        this.cursorInfoInitFrame = 16;
        this.cursorProfileInitFrame = 8;

        this.mode = mode;
        this.characters = characters;
        this.stages = stages;

        this.cursors = players.map((player, i) => ({
            player: player,
            ready: false,
            pos: {
                ...this.cursorInitPos[i]
            },
            infoFrame: this.cursorInfoInitFrame,
            profileFrame: 0
        }));

        this.stageCursor = 0;
        this.stageReady = this.mode === 'Training';
    }

    selectStage = () => this.mode === 'Training' ? Game.TRAINING_STAGE : this.stages[this.stageCursor];

    selectCharacter = pos => this.characters[pos.x + pos.y * 3] ? this.characters[pos.x + pos.y * 3] : null;

    updateStageSelection = (game, cursor) => {
        // Get cursor input
        const player = game.players[cursor.player === 'computer' ? this.cursors[0].player : cursor.player];
        const currentInput = player.inputHistory.frame[player.inputHistory.frame.length - 1];
        const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};

        // If validate : stage is ready
        if (currentInput.a && !lastInput.a) this.stageReady = true;
        else if (currentInput.b && !lastInput.b && !this.stageReady) {
            // If cancel and stage is not ready : reset cursors & return to character selection
            this.cursors.forEach((cursor, index) => {
                cursor.ready = false;
                cursor.pos = {
                    ...this.cursorInitPos[index]
                };
                cursor.infoFrame = this.cursorInfoInitFrame;
                cursor.profileFrame = this.cursorProfileInitFrame;
            });
            this.stageCursor = 0;
            this.stageFrame = this.stageInitFrame;
        } else {
            // Else if input directions
            if (currentInput.up && !lastInput.up && !this.stageReady) {
                this.stageCursor = (((this.stageCursor - 1) % this.stages.length) + this.stages.length) % this.stages.length;
                this.selectStageFrame = -this.selectStageInitFrame;
            }
            if (currentInput.down && !lastInput.down) {
                this.stageCursor = (((this.stageCursor + 1) % this.stages.length) + this.stages.length) % this.stages.length;
                this.selectStageFrame = this.selectStageInitFrame;
            }
        }
    }

    updateCharacterSelection = (game, cursor) => {
        // Get cursor input
        const player = cursor.player instanceof Computer ? this.cursors[0].player : cursor.player;
        const currentInput = player.inputHistory.frame[player.inputHistory.frame.length - 1];
        const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};

        // If validate cursor position
        if (currentInput.a && !lastInput.a && !cursor.ready &&
            (this.selectCharacter(cursor.pos) || new Vector2D(cursor.pos.x, cursor.pos.y).equals(new Vector2D(1, 2)))) {
            // If random pick random character
            if (new Vector2D(cursor.pos.x, cursor.pos.y).equals(new Vector2D(1, 2))) {
                do {
                    cursor.pos = new Vector2D(
                        Math.floor(Math.random() * this.size.x),
                        Math.floor(Math.random() * this.size.y)
                    );
                } while (!this.selectCharacter(cursor.pos));
            }
            // Cursor is now ready
            cursor.ready = true;
            cursor.infoFrame = this.cursorInfoInitFrame;
        } else if (currentInput.b && !lastInput.b) {
            // Else if cancel last action
            if (cursor.player === 'computer') {
                // If cancel while choosing computer character : undo player 1 choice
                this.cursors[0].ready = false;
                cursor.infoFrame = this.cursorInfoInitFrame;
            } else {
                if (cursor.ready) {
                    // If cancel after choosing character : undo player choice
                    cursor.ready = false;
                    cursor.infoFrame = this.cursorInfoInitFrame;
                    // If cancel while not having choosed character : return to main menu
                } else this.nextActivity = new MainMenu();
            }
        } else if (!cursor.ready) {
            // Else if input directions
            if (currentInput.up && !lastInput.up) {
                cursor.pos.y = (((cursor.pos.y - 1) % this.size.y) + this.size.y) % this.size.y;
                cursor.profileFrame = this.cursorProfileInitFrame;
            }
            if (currentInput.down && !lastInput.down) {
                cursor.pos.y = (((cursor.pos.y + 1) % this.size.y) + this.size.y) % this.size.y;
                cursor.profileFrame = this.cursorProfileInitFrame;
            }
            if (currentInput.left && !lastInput.left) {
                cursor.pos.x = (((cursor.pos.x - 1) % this.size.x) + this.size.x) % this.size.x;
                cursor.profileFrame = this.cursorProfileInitFrame;
            }
            if (currentInput.right && !lastInput.right) {
                cursor.pos.x = (((cursor.pos.x + 1) % this.size.x) + this.size.x) % this.size.x;
                cursor.profileFrame = this.cursorProfileInitFrame;
            }
        }
    }

    update = game => {
        // If some cursors are not ready or some animations not finished
        if (this.cursors.find(cursor => !cursor.ready || cursor.infoFrame)) {
            // Update player selection related animation
            if (this.initInfo3Frame) this.initInfo3Frame--;
            // Update cursors related animations
            this.cursors.forEach(cursor => {
                if (cursor.infoFrame) cursor.infoFrame--;
                if (cursor.profileFrame) cursor.profileFrame--;
            });
            // Update computer cursors if every player cursor is ready else update them
            if (!this.cursors.some(cursor => cursor.player !== 'computer' && !cursor.ready)) {
                this.cursors.filter(cursor => cursor.player === 'computer').forEach(cursor => this.updateCharacterSelection(game, cursor));
            } else this.cursors.filter(cursor => cursor.player !== 'computer').forEach(cursor => this.updateCharacterSelection(game, cursor));
        } else {
            // Else if stage is not selected
            if (!this.stageReady) {
                // Update stage selection related animations
                if (this.selectStageFrame > 0) this.selectStageFrame--;
                if (this.selectStageFrame < 0) this.selectStageFrame++;
                if (this.stageFrame) this.stageFrame--;
                // Select stage
                else this.cursors.forEach(cursor => this.updateStageSelection(game, cursor));
            } else {
                // Initialize fight
                this.nextActivity = new Fight(
                    this.cursors.map(cursor => {
                        cursor.player.selectedCharacter = this.selectCharacter(cursor.pos);
                        return cursor.player;
                    }),
                    this.selectStage(),
                    this.mode === 'Training',
                    true,
                    0
                );
            }
        }
    }
}