class Game {

    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;
        this.lastInputList = new Map();

        this.menuOptionList = ['playerVSplayer', 'playerVScomputer', 'training'];
        this.endMenuOptionList = ['training', 'settings', 'about'];

        this.gameStateEnum = {
            MAINMENU: 'mainMenu',
            CHARACTERSELECTION: 'characterSelection',
            FIGHT: 'fight',
            ENDMENU: 'endMenu'
        };

        this.gameState = this.gameStateEnum.CHARACTERSELECTION;
        this.gamemode = null;

        this.players = new Map();

        this.characterSelection = null;
        this.characters = ['mario', 'luigi', 'bowser'];

        this.fight = null;

        this.mainMenuCursor = 0;
        this.EndMenuCursor = 0;


        this.updateMainMenu = () => {
            var selectedOption = null;
            var nbMenu = this.menuOptionList.length;
            this.inputList.forEach((input) => {
                if (input.a) {
                    selectedOption = this.menuOptionList[this.mainMenuCursor];
                    this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                    this.characterSelection = new CharacterSelection(this.characters, selectedOption);
                }
                if (input.up) this.mainMenuCursor = ((((this.mainMenuCursor - 1) % nbMenu) + nbMenu) % nbMenu);
                if (input.down) this.mainMenuCursor = (this.mainMenuCursor + 1) % nbMenu;
            });
        };

        this.updateEndMenu = () => {
            var doEnter = () => {
                var currmenu = this.endMenuOptionList[this.EndMenuCursor];
                console.log(currmenu);

            };
            this.inputList.forEach((input, id) => {
                this.lastInputList.forEach((lastinput, lastid) => {
                    if (id = lastid && !lastinput.a && !lastinput.down && !lastinput.up) {
                        if (input.a) {
                            console.log("a : " + id);
                            doEnter();
                        }
                        if (input.up) {
                            this.EndMenuCursor = (((this.EndMenuCursor - 1) % this.endMenuOptionList.length) + this.endMenuOptionList.length) % this.endMenuOptionList.length
                            console.log("up : " + this.EndMenuCursor);
                        }
                        if (input.down) {
                            this.EndMenuCursor = (((this.EndMenuCursor + 1) % this.endMenuOptionList.length) + this.endMenuOptionList.length) % this.endMenuOptionList.length
                            console.log("down : " + this.EndMenuCursor);
                        }
                    }
                })

            }, this);

        };

        this.manageCharacterSelection = () => {
            if (!this.characterSelection) this.characterSelection = new CharacterSelection(this.characters);
            this.characterSelection.update(this);
        }

        this.manageFight = () => {
            if (this.fight === null) {
                this.fight = new Fight();
            } else {
                fight.update(this);
            }
        }

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
        }
    }
}