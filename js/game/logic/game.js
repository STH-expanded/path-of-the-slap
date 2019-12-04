class Game {
  constructor(inputList) {
    this.frame = 0;
    this.inputList = inputList;

    this.menuOptionList = ['playerVSplayer', 'playerVScomputer', 'training'];

    this.gameStateEnum = {
      MAINMENU: 'mainMenu',
      CHARACTERSELECTION: 'characterSelection',
      FIGHT: 'fight',
      ENDMENU: 'endMenu'
    };

    this.gameState = this.gameStateEnum.MAINMENU;

    this.players = new Map();

    this.characterSelection = null;

    this.fight = null;

    this.mainMenuCursor = 0;

    this.updateMainMenu = () => {
      var selectedOption = null;
      var nbMenu = this.menuOptionList.length;
      this.inputList.forEach((input) => {
        if (input.a) selectedOption = this.menuOptionList[this.mainMenuCursor];
        if (input.up) this.mainMenuCursor = ((((this.mainMenuCursor - 1) % nbMenu) + nbMenu) % nbMenu);
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

    this.updateEndMenu = () => { };

    this.manageCharacterSelection = () => { };

    this.manageFight = () => {
      if (this.fight === null) {
        this.fight = new Fight();
      } else {
        fight.update(this);
      }
    };

    this.update = () => {
      switch (this.gameState) {
        case gameStateEnum.MAINMENU:
          this.updateMainMenu();
        case gameStateEnum.CHARACTERSELECTION:
          this.manageCharacterSelection();
        case gameStateEnum.FIGHT:
          this.manageFight();
        case gameStateEnum.ENDMENU:
          this.updateEndMenu();
      }

      // this.inputList.forEach((input, id) => {
      //     if (input.a) console.log("a : " + id);
      //     if (input.b) console.log("b : " + id);
      //     if (input.up) console.log("up : " + id);
      //     if (input.down) console.log("down : " + id);
      //     if (input.left) console.log("left : " + id);
      //     if (input.right) console.log("right : " + id);
      // });

      this.frame++;
    };
  }
}
