class Fight extends Activity {
	pauseMenu = null;
	isOver = false;

	roundDuration = 5400;
	winCount = [0, 0];
	playoff = 2;

	constructor(initAnimInitFrame, endAnimEndFrame, players, selectedStage, trainingMode) {
		super(initAnimInitFrame, endAnimEndFrame);
		this.selectedStage = selectedStage;
		this.trainingMode = trainingMode;
		this.players = players;

		// Init stage
		this.stage = new(selectedStage)();

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
			player.inputHistory = {
				frame: [],
				state: []
			}
			player.character = new(player.selectedCharacter)("NEUTRAL_HIGH", index % 2 === 0, Math.floor((this.stage.size.x / 3) * (1 + index)));
		});

		// Init projectiles
		this.projectiles = [];

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
	}

	roundHandler = game => {
		// Update players
		this.players.forEach(player => {
			// Update characters
			player.character.update(game, player.inputHistory);
			// Check pause menu
			if (player !== game.computer) {
				const currentInput = player.inputHistory.frame.length > 0 ? player.inputHistory.frame[player.inputHistory.frame.length - 1] : {};
				const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
				this.pauseMenu = currentInput.start && !lastInput.start ? new PauseMenu(0, 0, ["Resume", "Rematch", "CharacterSelection", "MainMenu"], 2, this) : this.pauseMenu;	
			}
		});
		// Update projectiles
		this.projectiles = this.projectiles.filter(projectile => projectile.active);
		this.projectiles.forEach(projectile => projectile.update(game));
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