class Fight extends Activity {
	pauseMenu = null;
	isOver = false;

	roundDuration = 5400;
	winCount = [0, 0];
	playoff = 2;

	constructor(initAnimInitFrame, endAnimEndFrame, players, stage, trainingMode) {
		super(initAnimInitFrame, endAnimEndFrame);
		this.stage = stage;
		this.trainingMode = trainingMode;
		this.players = players;

		// Init stage
		this.stage = new(stage)();

		// Init round
		this.initRound();
	}

	initRound = () => {
		this.roundIsOver = false;
		// Round animation
		this.roundAnimEndFrame = this.trainingMode ? 0 : 60;
		this.roundAnimFrame = 0;
		this.roundEndAnimEndFrame = 60;
		this.roundEndAnimFrame = 0;
		
		// Init characters
		this.players.forEach((player, index) => {
			player.resetInput();
			player.character = new Character(player.selectedCharacter, this.winCount.filter((element)=>element == 0).length == 2  ? "ENTERMATCH" : "IDLE", !index % 2, new Vector2D(Math.floor((this.stage.collisionBox.size.x / 3) * (1 + index)), this.stage.collisionBox.size.y));
		});

		// Init actors
		this.actors = [];

		// Init timer
		this.timer = this.roundDuration;
	}
	
	update = game => {
		if (this.roundAnimFrame < this.roundAnimEndFrame) this.roundAnimFrame++;
		else if (this.isOver) this.nextActivity = new EndMenu(10, 10, ['Rematch', 'CharacterSelection', 'MainMenu'], 2);
		else if (this.roundIsOver) {
			if (this.roundEndAnimFrame < this.roundEndAnimEndFrame) this.roundEndAnimFrame++;
			else if (this.winCount.some(winner => winner >= this.playoff)) this.isOver = true;
			else this.initRound();
		} else if (this.pauseMenu) this.pauseMenu.handler(game);
		else this.roundHandler(game);
		// Update players
		this.players.forEach((player,index) => {
				// Update characters
				if (!this.pauseMenu) {
					player.character.update(game, player.inputList);
				}
				// Check pause menu
				if (player !== game.computer  && !player.character.actions[player.character.action].disableMenu===true) {
					const currentInput = player.inputList.frame.length > 0 ? player.inputList.frame[player.inputList.frame.length - 1] : {};
					const lastInput = player.inputList.frame.length > 1 ? player.inputList.frame[player.inputList.frame.length - 2] : {};
					this.pauseMenu = currentInput.start && !lastInput.start ? new PauseMenu(0, 0, ["Resume", "Rematch", "CharacterSelection", "MainMenu"], 2, this) : this.pauseMenu;	
				}
		});
		// Update actors
		this.actors = this.actors.filter(actor => actor.action !== "BREAK");
		this.actors.forEach(actor => actor.update(game));
	}

	roundHandler = game => {
		
		// Check win conditions
		if (!this.trainingMode) {
			const p1Health = this.players[0].character.health;
			const p2Health = this.players[1].character.health;
			const tie = (p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && this.timer <= 0);
			const p1Wins = p2Health <= 0 || (p1Health > p2Health && this.timer <= 0);
			const p2Wins = p1Health <= 0 || (p2Health > p1Health && this.timer <= 0)
			if (p1Wins || tie) this.winCount[0]++;
			if (p2Wins || tie) this.winCount[1]++;
			if (p1Wins || p2Wins || tie) this.roundIsOver = true;
			this.timer--;
		}
	}
}