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

        this.gameState = this.gameStateEnum.MAINMENU;

        this.players = new Map();

        this.characterSelection = null;

        this.fight = null;
        
        this.mainMenuCursor = 0;

        this.updateMainMenu = () => {

        }

        this.updateEndMenu = () => {

        }
        
        this.manageCharacterSelection = () => {

        }

        this.manageFight = () => {

        }

        this.update = () => {

            switch(this.gameState){
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
        }
    }
}