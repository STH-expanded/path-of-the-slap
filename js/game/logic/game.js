class Game {
  constructor(inputList) {
    this.frame = 0;
    this.inputList = inputList;
    this.lastInputList = new Map();

    this.menuOptionList = ['playerVSplayer', 'playerVScomputer', 'training'];

    this.gameStateEnum = {
      MAINMENU: 'mainMenu',
      CHARACTERSELECTION: 'characterSelection',
      FIGHT: 'fight',
      ENDMENU: 'endMenu'
    };

    this.gameState = this.gameStateEnum.FIGHT;
    this.gamemode = null;

    this.player1 = new Player(
      1,
      new Character(1, 'goku', new Vector2D(10, 10), new Vector2D(10, 10), 10, 5, new Vector2D(0, 2)),
      'player'
    );
    this.player2 = new Player(
      2,
      new Character(2, 'vegeta', new Vector2D(30, 30), new Vector2D(10, 10), 10, 5, new Vector2D(0, 1)),
      'bot'
    );

    this.stage = new Stage(1, 'forest', new Vector2D(240, 135), new Vector2D(480, 270));

    this.characterSelection = null;
    this.characters = [];

    this.fight = null;

    this.mainMenuCursor = 0;

    this.updateMainMenu = () => {
      var selectedOption = null;
      var nbMenu = this.menuOptionList.length;
      this.inputList.forEach(input => {
        if (input.a) selectedOption = this.menuOptionList[this.mainMenuCursor];
        if (input.up) this.mainMenuCursor = (((this.mainMenuCursor - 1) % nbMenu) + nbMenu) % nbMenu;
        if (input.down) this.mainMenuCursor = (this.mainMenuCursor + 1) % nbMenu;
      });

      switch (selectedOption) {
        case 'playerVSplayer':
          this.gameState = this.gameStateEnum.CHARACTERSELECTION;
        case 'playerVScomputer':
          this.gameState = this.gameStateEnum.CHARACTERSELECTION;
        case 'training':
          this.gameState = this.gameStateEnum.CHARACTERSELECTION;
        default:
          break;
      }
    };

    this.updateEndMenu = () => {};

    this.manageCharacterSelection = () => {
      if (!this.characterSelection) this.characterSelection = new CharacterSelection(this.characters);
      this.characterSelection.update(this);
    };

    this.manageFight = () => {
      if (this.fight === null) {
        this.fight = new Fight(this.player1, this.player2, this.stage);
      } else {
        this.fight.update(this);
      }
    };

    this.update = () => {
      switch (this.gameState) {
        case this.gameStateEnum.MAINMENU:
          this.updateMainMenu();
          break;
        case this.gameStateEnum.CHARACTERSELECTION:
          this.manageCharacterSelection();
          break;
        case this.gameStateEnum.FIGHT:
          this.manageFight();
          break;
        case this.gameStateEnum.ENDMENU:
          this.updateEndMenu();
          break;
        default:
          break;
      }

      this.inputList.forEach((input, id) => {
        if (input.a) console.log('a : ' + id);
        if (input.b) console.log('b : ' + id);
        if (input.up) console.log('up : ' + id);
        if (input.down) console.log('down : ' + id);
        if (input.left) console.log('left : ' + id);
        if (input.right) console.log('right : ' + id);
      });

      this.inputList.forEach((input, id) => {
        this.lastInputList.set(id, JSON.parse(JSON.stringify(input)));
      });

      this.frame++;
    };
  }
}
