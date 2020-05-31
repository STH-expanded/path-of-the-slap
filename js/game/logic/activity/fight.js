class Fight extends Activity {
	constructor(players, stage, trainingMode, winReset) {
		super();
		this.display = FightDisplay;
		this.trainingMode = trainingMode;

		this.stage = stage;
		this.players = players;
		this.players.forEach((player, index) => {
			if (winReset) player.winCount = 0;
			player.character.status = null;
			player.character.action = "NEUTRAL_HIGH";
			player.character.direction = index === 0;
			player.character.health = player.character.maxHealth;
			player.character.enemy = this.players.find(
				p => p.id !== player.id
			).character;
			player.character.collisionBox.size = {
				...player.character.idleSize
			};
			player.character.collisionBox.pos = new Vector2D(
				Math.floor((this.stage.size.x / 3) * (1 + index)) -
				player.character.collisionBox.size.x / 2,
				270 - 16 - player.character.collisionBox.size.y
			);
			player.inputList = [];
			player.character.inputList = null;
			player.character.hitboxes = [];
			player.character.hurtboxes = [];
		});
		this.player1 = this.players[0];
		this.player2 = this.players[1];

		this.projectiles = [];

		this.timer = 5400;

		this.winners = [];
		this.playoff = 2;

		this.roundIsOver = false;
		this.gameIsOver = false;

		this.entranceAnimEndFrame = 60;
		this.entranceAnimFrame =
			this.trainingMode || !winReset ? this.entranceAnimEndFrame : 0;

		this.roundAnimEndFrame = 60;
		this.roundAnimFrame = this.trainingMode ? this.roundAnimEndFrame : 0;

		this.roundEndAnimEndFrame = 60;
		this.roundEndAnimFrame = 0;

		this.endAnimEndFrame = 60;
		this.endAnimFrame = 0;

		this.pauseMenu = null;

		// Pause Menu
		this.pauseMenu = null;
		this.pauseMenuOptions = [
			"Resume",
			"Rematch",
			"CharacterSelection",
			"MainMenu"
		];
		this.pauseMenuOptionYCenter = 2;
		this.pauseMenuHandler = (game, options, cursor) => {
			var nextActivity = null;
			switch (options[cursor]) {
				case "Resume":
					game.activity.pauseMenu = null;
					break;
				case "Rematch":
					nextActivity = new Fight(
						game.lastFight.players,
						game.lastFight.stage,
						game.activity.trainingMode,
						true
					);
					break;
				case "CharacterSelection":
					var mode = game.activity.trainingMode ?
						"Training" :
						game.activity.player2.id !== "computer" ?
						"Player" :
						"Computer";
					nextActivity = new CharacterSelection(
						mode,
						game.characters,
						game.stages,
						game.lastFight.players
					);
					break;
				case "MainMenu":
					nextActivity = new Menu(
						game.mainMenuOptions,
						game.mainMenuOptionYCenter,
						game.mainMenuHandler
					);
					break;
			}
			return nextActivity;
		}
	}

	update = game => {
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
				game.lastFight.stage = this.stage;
				game.activity = this.gameIsOver ?
					new Menu(
						game.endMenuOptions,
						game.endMenuOptionYCenter,
						game.endMenuHandler
					) :
					new Fight(this.players, this.stage, false, false, 1);
			}
		} else {
			if (!this.pauseMenu) {
				this.players.forEach(player => {
					if (player.id !== "computer") {
						if (
							game.inputList.get(player.id).start && !game.lastInputList.get(player.id).start
						) {
							game.lastFight.players = this.players;
							game.lastFight.stage = this.stage;
							this.pauseMenu = new PauseMenu(
								this.pauseMenuOptions,
								this.pauseMenuOptionYCenter,
								this.pauseMenuHandler,
								this
							);
						}
					}
				});

				this.players.forEach(player => player.update(game));
				this.projectiles.forEach((projectile, i) => {
					if (!projectile.active) {
						this.projectiles.splice(i, 1);
					} else {
						projectile.update(game);
					}
				});

				if (!this.trainingMode) {
					this.timer--;

					this.winners = this.checkWinners(
						this.player1.character.health,
						this.player2.character.health,
						this.timer
					);
					if (this.winners.length > 0) {
						this.winners.forEach(winner => winner.winCount++);
						this.roundIsOver = true;
						this.gameIsOver = this.winners.find(
							winner => winner.winCount === this.playoff
						);
						this.endAnimFrame = this.gameIsOver ? 0 : this.endAnimEndFrame;
					}
				}
			} else this.pauseMenu.update(game);
		}
	}

	checkWinners = (p1Health, p2Health, timer) => {
		if (
			(p1Health <= 0 && p2Health <= 0) ||
			(p1Health === p2Health && timer <= 0)
		)
			return this.players;
		else if (p2Health <= 0 || (p1Health > p2Health && timer <= 0))
			return [this.player1];
		else if (p1Health <= 0 || (p1Health < p2Health && timer <= 0))
			return [this.player2];
		return [];
	}
}