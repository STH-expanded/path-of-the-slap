class Display {
  constructor(game) {
    this.frame = 0;
    this.zoom = 1;
    this.debugMode = true;

    this.game = game;

    this.canvas = document.createElement('canvas');
    this.cx = this.canvas.getContext('2d');

    this.update = () => {
      switch (this.game.gameState) {
        case this.game.gameStateEnum.MAINMENU:
          this.displayMainMenu();
          break;
        case this.game.gameStateEnum.CHARACTERSELECTION:
          this.displayCharacterSelection();
          break;
        case this.game.gameStateEnum.FIGHT:
          this.displayFight();
          break;
        case this.game.gameStateEnum.ENDMENU:
          this.displayEndMenu();
          break;
        default:
          break;
      }
      this.frame++;
    };

        this.displayMainMenu = () => {
            this.cx.fillStyle = 'green';
            this.cx.fillRect(
                0 * this.zoom,
                0 * this.zoom,
                480 * this.zoom,
                270 * this.zoom,
            )

            this.cx.fillStyle = 'white';
            this.cx.fillRect(
                224 * this.zoom,
                87 * this.zoom + this.game.mainMenuCursor * 32 * this.zoom,
                32 * this.zoom,
                32 * this.zoom,
            );
        }

    this.displayEndMenu = () => {
      this.cx.fillStyle = 'yellow';
      this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);
    };

    this.displayCharacterSelection = () => {
      this.cx.fillStyle = 'orange';
      this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);

      if (this.game.characterSelection) {
        this.cx.fillStyle = 'white';
        this.cx.fillRect(
          224 * this.zoom,
          87 * this.zoom + this.game.characterSelection.cursor.y * 32 * this.zoom,
          32 * this.zoom,
          32 * this.zoom
        );
      }
    };

    this.displayFight = () => {
      this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.cx.fillStyle = 'red';
      this.cx.fillRect(0 * this.zoom, 0 * this.zoom, 480 * this.zoom, 270 * this.zoom);
      this.cx.fillStyle = 'blue';
      this.cx.fillRect(
        this.game.player1.character.pos.x * this.zoom,
        this.game.player1.character.pos.y * this.zoom,
        this.game.player1.character.size.x * this.zoom,
        this.game.player1.character.size.y * this.zoom
      );
      this.cx.fillStyle = 'green';
      this.cx.fillRect(
        this.game.player2.character.pos.x * this.zoom,
        this.game.player2.character.pos.y * this.zoom,
        this.game.player2.character.size.x * this.zoom,
        this.game.player2.character.size.y * this.zoom
      );
    };

    this.flipHorizontally = around => {
      this.cx.translate(around, 0);
      this.cx.scale(-1, 1);
      this.cx.translate(-around, 0);
    };

    this.resize = () => {
      if (innerWidth >= 1920 && innerHeight >= 1080) {
        this.zoom = 4;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 1920;
        this.canvas.height = 1080;
      } else if (innerWidth >= 1440 && innerHeight >= 810) {
        this.zoom = 3;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 1440;
        this.canvas.height = 810;
      } else if (innerWidth >= 960 && innerHeight >= 540) {
        this.zoom = 2;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 960;
        this.canvas.height = 540;
      } else {
        this.zoom = 1;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 480;
        this.canvas.height = 270;
      }
      this.cx.imageSmoothingEnabled = false;
    };

    this.resize();
    window.addEventListener('resize', this.resize);
    document.body.appendChild(this.canvas);
  }
}
