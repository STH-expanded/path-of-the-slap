class AbstractMenu extends Activity {
    cursor = 0;

    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame);
        this.options = options;
        this.optionYCenter = optionYCenter;
    }

    update = game => {
        Object.values(game.players).forEach(player => {
            if (player.inputList.frame[0].a && !player.inputList.frame[1].a) this.nextActivity = this.optionHandler(game);
            else {
                if (player.inputList.frame[0].stick > 6 &&
                    player.inputList.frame[1].stick < 7) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (player.inputList.frame[0].stick < 4 && player.inputList.frame[1].stick > 3) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    optionHandler = () => {}
}

AbstractMenu.display = display => {
    const cx = display.cx;
    const activity = display.game.activity;
    const menu = activity instanceof Fight ? activity.pauseMenu : activity;

    // Background
    if (menu instanceof MainMenu) {
        cx.drawImage(display.assets.images.titleScreen, 0, 0, display.width, display.height, 0, Math.sin(menu.animationFrame * 0.02) * 4, display.width, display.height);
    }
    else {
        cx.fillStyle = menu instanceof PauseMenu ? '#0008' : '#000';
        cx.fillRect(0, 0, display.width, display.height);
    }

    // Options
    menu.options.forEach((option, index) => {
        option += option === 'Player' && Object.keys(display.game.players).length < 2 ? 'Disabled' : '';
        AbstractMenu.drawMenuElement(display, menu, display.assets.images['btn' + option], index, 0);
        if (menu.cursor === index) AbstractMenu.drawMenuElement(display, menu, display.assets.images.menucursor, index, Math.sin(menu.animationFrame * 0.1) * 4);
    });

    // Sound
    Object.values(display.game.players).forEach(player => {
        let se14Sound = new Sound(display.assets.sounds.se14, 1);
        let selectSound = new Sound(display.assets.sounds.select, 1);
        if (player.inputList.frame[0].a && !player.inputList.frame[1].a && menu instanceof MainMenu && se14Sound.isPaused() && !(menu.cursor === 1 && Object.keys(display.game.players).length < 2)) {
            se14Sound.play();
        } else if ((player.inputList.frame[0].stick > 6 && player.inputList.frame[1].stick < 7 || player.inputList.frame[0].stick < 4 && player.inputList.frame[1].stick > 3) && selectSound.isPaused()) {
            selectSound.play();
        }
    });

    // Music
    if (menu instanceof MainMenu && menu.initAnimFrame === menu.initAnimInitFrame) {
        display.music = new Sound(display.assets.sounds.mainMenu, 0.25);
        display.music.play();
    }
    if (menu instanceof MainMenu && menu.nextActivity) {
        display.music.pause();
    }
    if (display.music.audio.ended) {
        display.music.reset();
    }

    // Animation
    if (menu instanceof MainMenu && menu.endAnimFrame) display.fadeEffect('#000', menu.endAnimFrame, menu.endAnimEndFrame);
}

AbstractMenu.drawMenuElement = (display, menu, asset, index, offset) => {
    display.cx.drawImage(asset, 0, 0, 128, 32,
        176 + offset, (display.height - display.height / menu.optionYCenter) - menu.options.length / 2 * 32 + 32 * index, 128, 32
    );
}

class MainMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
    }

    optionHandler = game => {
        const players = Object.values(game.players);
        if(this.options[this.cursor] === 'Player' && players.length !== 2) {
            return null
        }  else if (this.options[this.cursor] === 'Online') {
            console.log(game.socket.id)
            game.socket.emit("newUser", {
                id: game.socket.id,
                player: players[0]
            })
            return new WaitingScreen(0, 0, ["MainMenu"], 2, game);
        }
        return new CharacterSelection(300, 60, this.options[this.cursor], Game.CHARACTERS, Game.STAGES,
            this.options[this.cursor] === 'Online' ? game.playersOnline : [players[0], this.options[this.cursor] === 'Player' ? players[1] : game.computer]
        );
    }
}

class PauseMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter, fight) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
        this.fight = fight;
    }

    update = game => {
        this.fight.players.forEach(player => {
            if (player.inputList.frame[0].a && !player.inputList.frame[1].a) this.nextActivity = this.optionHandler(game);
            else if (player.inputList.frame[0].start && !player.inputList.frame[1].start) this.fight.pauseMenu = null;
            else {
                if (player.inputList.frame[0].stick > 6 &&
                    player.inputList.frame[1].stick < 7) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                if (player.inputList.frame[0].stick < 4 && player.inputList.frame[1].stick > 3) this.cursor = (this.cursor + 1) % this.options.length;
            }
        });
    }
    
    optionHandler = game => {
        if (this.options[this.cursor] === "Resume") this.fight.pauseMenu = null;
        return this.options[this.cursor] === "Resume" ? null :
            this.options[this.cursor] === "Rematch" ? new Fight(game.activity.trainingMode ? 0 : 60, 60,
                game.lastFight.players,
                game.lastFight.stage,
                game.activity.trainingMode
            ) :
            this.options[this.cursor] === "CharacterSelection" ? new CharacterSelection(300, 60,
                game.activity.trainingMode ? "Training" : game.activity.players[1] instanceof Computer ? "Computer" : "Player",
                Game.CHARACTERS, Game.STAGES,
                game.lastFight.players
            ) :
            this.options[this.cursor] === "MainMenu" ? new MainMenu(10, 120, ['Computer', 'Player', 'Online', 'Training'], 4) : null;
    }
}

class EndMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
    }

    optionHandler = game => (this.options[this.cursor] === 'Rematch' ? new Fight(60, 60, game.lastFight.players, game.lastFight.stage, false) :
        this.options[this.cursor] === 'CharacterSelection' ? new CharacterSelection(300, 60, this.options[this.cursor], Game.CHARACTERS, Game.STAGES, game.lastFight.players) :
        this.options[this.cursor] === 'MainMenu' ? new MainMenu(10, 120, ['Computer', 'Player', 'Online', 'Training'], 4) : null);
}

class WaitingScreen extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter, game) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter, game);
        


        game.socket.on("readyForOnline",(users)=>{
            const myIndex = users.findIndex((player) => {
                return player.id === game.socket.id
            })
        
            // const onlinePlayerIndex = myIndex === 1 ? 0 : 1
            const players = Object.values(game.players);
            const online = new Online();
            game.players.online = online;
            const playerArray = myIndex === 0 ? [players[0],online] :  [online,players[0]];
            this.nextActivity = new CharacterSelection(300, 60, this.options[this.cursor], Game.CHARACTERS, Game.STAGES, playerArray);
        })  
        
    }



    // To Do: supprimer le player du socket lorsqu'on retourne au Main Menu
    optionHandler = () => (this.options[this.cursor] === 'MainMenu' ? new MainMenu(10, 120, ['Computer', 'Player', 'Online', 'Training'], 4) : null);

}