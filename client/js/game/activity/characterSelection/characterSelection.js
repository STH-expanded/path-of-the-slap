class CharacterSelection extends Activity {
    initInfo3Frame = 16;
    mugshotOrder = [
        [224, 144, 128, 176, 192],
        [208, 160, 112, 160, 208],
        [192, 176, 128, 144, 224]
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

    charSelected = {
        id: null,
        selected: false
    };

    constructor(initAnimInitFrame, endAnimEndFrame, mode, characters, stages, players) {
        super(initAnimInitFrame, endAnimEndFrame);

        this.mode = mode;
        this.characters = characters;
        this.stages = stages;

        console.log(players)

        if(mode === "Online"){
            // var socket = io()
        }

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
        const player = cursor.player;
        // If validate : stage is ready
        if (player.inputList.frame[0].a && !player.inputList.frame[1].a) this.stageReady = true;
        else if (player.inputList.frame[0].b && !player.inputList.frame[1].b && !this.stageReady) {
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
            [{ stick: 8, fixStick: [7, 8, 9], val: -1 }, { stick: 2, fixStick: [1, 2, 3], val: 1 }].forEach(({ stick, fixStick, val }) => {
                if (player.inputList.frame[0].stick === stick && !fixStick.includes(player.inputList.frame[1].stick) && !this.stageReady) {
                    this.stageCursor = (((this.stageCursor + val) % this.stages.length) + this.stages.length) % this.stages.length;
                    this.selectStageFrame = val * this.selectStageInitFrame;
                }
            });
        }
    }

    updateCharacterSelection = cursor => {
        const player = cursor.player instanceof Computer ? this.cursors[0].player : cursor.player;
        this.charSelected.selected = false;
        // If validate cursor position
        if (player.inputList.frame[0].a && !player.inputList.frame[1].a && !cursor.ready &&
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
            this.charSelected.selected = true;
            this.charSelected.id = this.selectCharacter(cursor.pos).id;
            cursor.ready = true;
            cursor.infoFrame = this.cursorInfoInitFrame;
        } else if (player.inputList.frame[0].b && !player.inputList.frame[1].b) {
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
                } else this.nextActivity = new MainMenu(10, 120, ['Computer', 'Player', 'Online', 'Training'], 4);
            }
        } else if (!cursor.ready) {
            // Else if input directions
            [{ stick: 8, fixStick: [7, 8, 9], axis: "y", val: -1 }, { stick: 2, fixStick: [1, 2, 3], axis: "y", val: 1 },
            { stick: 4, fixStick: [1, 4, 7], axis: "x", val: -1 }, { stick: 6, fixStick: [3, 6, 9], axis: "x", val: 1 }].forEach(({ stick, fixStick, axis, val }) => {
                if (player.inputList.frame[0].stick === stick && !fixStick.includes(player.inputList.frame[1].stick)) {
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