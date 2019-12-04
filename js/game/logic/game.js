class Game {
    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;

        this.menuOptionList = [
            'playerVSplayer',
            'playerVScomputer',
            'training',
            'settings',
            'about'
        ]

        this.gameStateEnum = {
            MAINMENU: 'mainMenu',
            CHARACTERSELECTION: 'characterSelection',
            FIGHT: 'fight',
            ENDMENU: 'endMenu'
        }

        this.gameState = this.gameStateEnum.CHARACTERSELECTION;

        this.players = new Map();

        this.characterSelection = null;
        this.characters = [];

        this.fight = null;
        
        this.mainMenuCursor = 0;

        this.updateMainMenu = () => {

        }

        this.updateEndMenu = () => {

        }
        
        this.manageCharacterSelection = () => {
            if (!this.characterSelection) this.characterSelection = new CharacterSelection(this.characters);
            this.characterSelection.update(this);
        }

        this.manageFight = () => {

        }

        this.update = () => {

            switch(this.gameState){
                case this.gameStateEnum.MAINMENU:
                    this.updateMainMenu();
                case this.gameStateEnum.CHARACTERSELECTION:
                    this.manageCharacterSelection();
                case this.gameStateEnum.FIGHT:
                    this.manageFight();
                case this.gameStateEnum.ENDMENU:
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
        }
    }
}