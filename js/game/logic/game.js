class Game {
    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;
        this.lastInputList = new Map();

        this.players = [];

        this.gameStateEnum = {
            MAINMENU: 'mainMenu',
            CHARACTERSELECTION: 'characterSelection',
            FIGHT: 'fight',
            ENDMENU: 'endMenu'
        };
        this.gameState = this.gameStateEnum.MAINMENU;

        this.menuOptionList = ['playerVSplayer', 'playerVScomputer', 'training'];
        this.mainMenuCursor = 0;

        this.endMenuOptionList = ['Rematch', 'Change Characters', 'Return to Menu'];
        this.endMenuCursor = 0;

        this.characterSelection = null;
        this.characters = ['char1', 'char2'];

        this.stages = [new Stage(1, 'forest', new Vector2D(0, 0), new Vector2D(480, 270))];

        this.fight = null;

        this.updateMainMenu = () => {
            var nbMenu = this.menuOptionList.length;
            this.inputList.forEach((input, id) => {
                this.lastInputList.forEach((lastinput, lastid) => {
                    if (id === lastid) {
                        if (input.a && !lastinput.a) {
                            if (this.menuOptionList[this.mainMenuCursor] === 'playerVSplayer' && this.players.length < 2) {
                                console.error('You must connect 2 players');
                            } else {
                                this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                                this.characterSelection = new CharacterSelection(this.characters, this.menuOptionList[this.mainMenuCursor]);
                            }
                        }
                        if (input.up && !lastinput.up) this.mainMenuCursor = (((this.mainMenuCursor - 1) % nbMenu) + nbMenu) % nbMenu;
                        if (input.down && !lastinput.down) this.mainMenuCursor = (this.mainMenuCursor + 1) % nbMenu;
                    }
                });
            });
        };

        this.updateEndMenu = () => {
            this.inputList.forEach((input, id) => {
                this.lastInputList.forEach((lastinput, lastid) => {
                    if (id === lastid) {
                        if (input.a && !lastinput.a) {
                            var currmenu = this.endMenuOptionList[this.endMenuCursor];
                            switch (currmenu) {
                                case 'Rematch':
                                    this.gameState = this.gameStateEnum.FIGHT;
                                    this.fight = new Fight(this.fight.player1, this.fight.player2, this.stages[0]);
                                    break;
                                case 'Change Characters':
                                    this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                                    this.characterSelection = new CharacterSelection(this.characters, this.menuOptionList[this.mainMenuCursor]);
                                    break;
                                case 'Return to Menu':
                                    this.gameState = this.gameStateEnum.MAINMENU;
                                    break;
                            }
                        }
                        if (input.up && !lastinput.up) {
                            this.endMenuCursor = (((this.endMenuCursor - 1) % this.endMenuOptionList.length) + this.endMenuOptionList.length) % this.endMenuOptionList.length;
                        }
                        if (input.down && !lastinput.down) {
                            this.endMenuCursor = (((this.endMenuCursor + 1) % this.endMenuOptionList.length) + this.endMenuOptionList.length) % this.endMenuOptionList.length;
                        }
                    }
                });
            });
        };

        this.manageCharacterSelection = () => {
            if (!this.characterSelection) {
                console.log('ERROR : WRONG GAME STATE');
                this.gameState = this.gameStateEnum.MAINMENU;
            } else this.characterSelection.update(this);
        };

        this.manageFight = () => {
            if (!this.fight) {
                console.log('ERROR : WRONG GAME STATE');
                this.gameState = this.gameStateEnum.MAINMENU;
            } else this.fight.update(this);
        };

        this.managePlayers = () => {
            if (this.inputList.size !== this.players.size) {
                this.inputList.forEach((input, id) => {
                    if (!this.players.find(player => player.id === id)) {
                        this.players.push(new Player(id, input, 'player'));
                        console.log('new player : ' + id);
                    }
                });
            }
        };

        this.update = () => {
            this.managePlayers();

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

            // this.inputList.forEach((input, id) => {
            //     if (input.a) console.log("a : " + id);
            //     if (input.b) console.log("b : " + id);
            //     if (input.up) console.log("up : " + id);
            //     if (input.down) console.log("down : " + id);
            //     if (input.left) console.log("left : " + id);
            //     if (input.right) console.log("right : " + id);
            // });

            this.inputList.forEach((input, id) => {
                this.lastInputList.set(id, JSON.parse(JSON.stringify(input)));
            });

            this.frame++;
        };
    }
}
