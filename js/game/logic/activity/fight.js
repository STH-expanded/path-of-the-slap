class Fight extends Activity {
	constructor(players, selectedStage, trainingMode, winReset) {
		super();
		this.display = FightDisplay;

		this.entranceAnimEndFrame = 60;
		this.entranceAnimFrame = this.trainingMode || !winReset ? this.entranceAnimEndFrame : 0;
		this.roundAnimEndFrame = 60;
		this.roundAnimFrame = this.trainingMode ? this.roundAnimEndFrame : 0;
		this.roundEndAnimEndFrame = 60;
		this.roundEndAnimFrame = 0;
		this.endAnimEndFrame = 60;
		this.endAnimFrame = 0;

		this.pauseMenu = null;

		this.trainingMode = trainingMode;

		this.selectedStage = selectedStage;
		this.stage = new(this.selectedStage)();

		this.players = players;
		this.players.forEach((player, index) => {
			if (winReset) player.winCount = 0;
			player.inputHistory = {
				frame: [],
				state: []
			}
			player.character = new(player.selectedCharacter)();
			player.character.action = "NEUTRAL_HIGH";
			player.character.direction = index % 2 === 0;
			player.character.collisionBox.size = {
				...player.character.idleSize
			};
			player.character.collisionBox.pos = new Vector2D(
				Math.floor((this.stage.size.x / 3) * (1 + index)) -
				player.character.collisionBox.size.x / 2,
				270 - 16 - player.character.collisionBox.size.y
			);
		});
		this.player1 = this.players[0];
		this.player2 = this.players[1];

		this.projectiles = [];

		this.timer = 5400;

		this.winners = [];
		this.playoff = 2;

		this.roundIsOver = false;
		this.gameIsOver = false;
	}

	updateTransition = game => {
		if (this.entranceAnimFrame < this.entranceAnimEndFrame)
			this.entranceAnimFrame++;
		else if (this.roundAnimFrame < this.roundAnimEndFrame)
			this.roundAnimFrame++;
		else if (this.roundIsOver) {
			if (this.roundEndAnimFrame < this.roundEndAnimEndFrame)
				this.roundEndAnimFrame++;
			else if (this.endAnimFrame < this.endAnimEndFrame) this.endAnimFrame++;
			else {
				game.lastFight.players = this.players;
				game.lastFight.stage = this.selectedStage;
				game.activity = this.gameIsOver ?
					new EndMenu() :
					new Fight(this.players, this.selectedStage, false, false);
			}
		} else this.update(game);
	}

	update = game => {
		if (!this.pauseMenu) {
			this.players.forEach(player => {
				const currentInput = player.inputHistory.frame.length > 0 ? player.inputHistory.frame[player.inputHistory.frame.length - 1] : {};
				const lastInput = player.inputHistory.frame.length > 1 ? player.inputHistory.frame[player.inputHistory.frame.length - 2] : {};
				if (currentInput.start && !lastInput.start) {
					game.lastFight.players = this.players;
					game.lastFight.stage = this.selectedStage;
					this.pauseMenu = new PauseMenu(this);
				}
			});

			this.players.forEach(player => player.character.update(game, player.inputHistory));

			this.projectiles = this.projectiles.filter(projectile => projectile.active);
			this.projectiles.forEach(projectile => projectile.update(game));

			if (!this.trainingMode) {
				this.timer--;

				this.winners = this.checkWinners(this.player1.character.health, this.player2.character.health, this.timer);
				if (this.winners.length > 0) {
					this.winners.forEach(winner => winner.winCount++);
					this.roundIsOver = true;
					this.gameIsOver = this.winners.find(
						winner => winner.winCount === this.playoff
					);
					this.endAnimFrame = this.gameIsOver ? 0 : this.endAnimEndFrame;
				}
			}
		} else this.pauseMenu.updateTransition(game);
	}

	checkWinners = (p1Health, p2Health, timer) => {
		if ((p1Health <= 0 && p2Health <= 0) || (p1Health === p2Health && timer <= 0)) return this.players;
		else if (p2Health <= 0 || (p1Health > p2Health && timer <= 0)) return [this.player1];
		else if (p1Health <= 0 || (p1Health < p2Health && timer <= 0)) return [this.player2];
		return [];
	}
}