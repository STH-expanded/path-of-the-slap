class Game {
    constructor(inputList) {
        this.frame = 0;
        this.inputList = inputList;
        this.lastInputList = new Map();

        this.menuOptionList = ['playerVSplayer', 'playerVScomputer', 'training', 'settings', 'about'];
        this.endMenuOptionList = [ 'training', 'settings', 'about'];


        this.gameStateEnum = {
            MAINMENU: 'mainMenu',
            CHARACTERSELECTION: 'characterSelection',
            FIGHT: 'fight',
            ENDMENU: 'endMenu'
        };

        this.gameState = this.gameStateEnum.ENDMENU;

        this.players = new Map();

        this.characterSelection = null;

        this.fight = null;

        this.mainMenuCursor = 0;
        this.EndMenuCursor = 0;

        this.updateMainMenu = () => { };

        this.updateEndMenu = () => {
            var doEnter = () => {
                var currmenu = this.endMenuOptionList[this.EndMenuCursor];
                console.log(currmenu);
                
            };
            this.inputList.forEach((input, id) => {
                this.lastInputList.forEach((lastinput,lastid)=>{
                    if (id=lastid && !lastinput.a && !lastinput.down && !lastinput.up) {
                        if (input.a) {
                            console.log("a : " + id);
                            doEnter();
                        }
                        if (input.up) {
                            this.EndMenuCursor = (((this.EndMenuCursor - 1)%this.endMenuOptionList.length)+this.endMenuOptionList.length) % this.endMenuOptionList.length
                            console.log("up : " + this.EndMenuCursor);
                        }
                        if (input.down) {
                            this.EndMenuCursor = (((this.EndMenuCursor + 1)%this.endMenuOptionList.length)+this.endMenuOptionList.length) % this.endMenuOptionList.length
                            console.log("down : " + this.EndMenuCursor);
                        }
                    }
                })
                
            }, this);
            
        };

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
            this.inputList.forEach((input, id) => {
                this.lastInputList.set(id, JSON.parse(JSON.stringify(input)));
            });

            this.frame++;
        };
    }
}
