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

        this.gamemode = null;

        this.players = new Map();

        this.fight = null;
        
        this.update = () => {

            if (!this.gamemode) {
                
            }
            else if (!this.fight) {
                    
            }
            else {

            }
            
            this.inputList.forEach((input, id) => {
                if (input.a) console.log("a : " + id);
                if (input.b) console.log("b : " + id);
                if (input.up) console.log("up : " + id);
                if (input.down) console.log("down : " + id);
                if (input.left) console.log("left : " + id);
                if (input.right) console.log("right : " + id);
            });

            this.frame++;
        }
    }
}