class CharacterSelection extends Activity {
    initInfo3Frame = 16;
    mugshotOrder = [
        [56, 36, 32, 44, 48],
        [52, 40, 28, 40, 52],
        [48, 44, 32, 36, 56]
    ];
    
    stageInitFrame = 6;
    stageFrame = this.stageInitFrame;
    selectStageInitFrame = 6;
    selectStageFrame = 0;

    size = new Vector2D(3, 5);
    cursorInitPos = [new Vector2D(0, 2), new Vector2D(2, 2)];
    cursorInfoInitFrame = 16;
    cursorProfileInitFrame = 8;
    
    stageCursor = 0;

    constructor(initAnimInitFrame, endAnimEndFrame, mode, characters, stages, players) {
        super(initAnimInitFrame, endAnimEndFrame);

        this.mode = mode;
        this.characters = characters;
        this.stages = stages;

        this.cursors = players.map((player, i) => ({
            player: player,
            ready: false,
            pos: this.cursorInitPos[i].times(1),
            infoFrame: this.cursorInfoInitFrame,
            profileFrame: 0
        }));

        this.stageReady = this.mode === 'Training';
    }

    selectStage = () => this.mode === 'Training' ? Game.TRAINING_STAGE : this.stages[this.stageCursor];

    selectCharacter = pos => this.characters[pos.x + pos.y * 3] ? this.characters[pos.x + pos.y * 3] : null;

    updateStageSelection = cursor => {
        // Get cursor input
        const player = cursor.player;
        const currentInput = player.inputHistory.frame[player.inputHistory.frame.length - 1];
        const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};

        // If validate : stage is ready
        if (currentInput.a && !lastInput.a) this.stageReady = true;
        else if (currentInput.b && !lastInput.b && !this.stageReady) {
            // If cancel and stage is not ready : reset cursors & return to character selection
            this.cursors.forEach((cursor, index) => {
                cursor.ready = false;
                cursor.pos = this.cursorInitPos[index].times(1);
                cursor.infoFrame = this.cursorInfoInitFrame;
                cursor.profileFrame = this.cursorProfileInitFrame;
            });
            this.stageCursor = 0;
            this.stageFrame = this.stageInitFrame;
        } else {
            // Else if input directions
            [{ input: "up", val: -1}, { input: "down", val: 1}].forEach(({input, val}) => {
                if (currentInput[input] && !lastInput[input] && !this.stageReady) {
                    this.stageCursor = (((this.stageCursor + val) % this.stages.length) + this.stages.length) % this.stages.length;
                    this.selectStageFrame = val * this.selectStageInitFrame;
                }
            });
        }
    }

    updateCharacterSelection = cursor => {
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
            if (cursor.player instanceof Computer) {
                // If cancel while choosing computer character : undo player 1 choice
                this.cursors[0].ready = false;
                cursor.infoFrame = this.cursorInfoInitFrame;
            } else {
                if (cursor.ready) {
                    // If cancel after choosing character : undo player choice
                    cursor.ready = false;
                    cursor.infoFrame = this.cursorInfoInitFrame;
                    // If cancel while not having choosed character : return to main menu
                } else this.nextActivity = new MainMenu(10, 10, ['Computer', 'Player', 'Training'], 4);
            }
        } else if (!cursor.ready) {
            // Else if input directions
            [{ input: "up", axis: "y", val: -1}, { input: "down", axis: "y", val: 1},
            { input: "left", axis: "x", val: -1}, { input: "right", axis: "x", val: 1}].forEach(({input, axis, val}) => {
                if (currentInput[input] && !lastInput[input]) {
                    cursor.pos[axis] = (((cursor.pos[axis] + val) % this.size[axis]) + this.size[axis]) % this.size[axis];
                    cursor.profileFrame = this.cursorProfileInitFrame;
                }
            });
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
            const cursors = this.cursors.filter(cursor => this.cursors.some(cursor => !(cursor.player instanceof Computer) && !cursor.ready) ?
            !(cursor.player instanceof Computer) : cursor.player instanceof Computer);
            cursors.forEach(cursor => this.updateCharacterSelection(cursor));
        } else {
            // Else if stage is not selected
            if (!this.stageReady) {
                // Update stage selection related animations
                if (this.selectStageFrame > 0) this.selectStageFrame--;
                if (this.selectStageFrame < 0) this.selectStageFrame++;
                if (this.stageFrame) this.stageFrame--;
                // Select stage
                else this.cursors.filter(cursor => !(cursor.player instanceof Computer)).forEach(cursor => this.updateStageSelection(cursor));
            } else {
                // Initialize fight
                const players = this.cursors.map(cursor => {
                    cursor.player.selectedCharacter = this.selectCharacter(cursor.pos);
                    return cursor.player;
                });
                game.lastFight.players = players;
                game.lastFight.stage = this.selectStage();
                this.nextActivity = new Fight(this.mode === 'Training' ? 0 : 60, 60,
                    players,
                    this.selectStage(),
                    this.mode === 'Training'
                );
            }
        }
    }
}