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
        if (player.inputList.frame[0].a && !player.inputList.frame[1].a) {
            display.assets.sounds.se14.play();
        } else {
            if (player.inputList.frame[0].stick > 6 &&
                player.inputList.frame[1].stick < 7) display.assets.sounds.select.play();
            if (player.inputList.frame[0].stick < 4 && player.inputList.frame[1].stick > 3) display.assets.sounds.select.play();
        }
    });

    // Music
    if (menu instanceof MainMenu && menu.initAnimFrame === menu.initAnimInitFrame) {
        display.assets.sounds.mainMenu.currentTime = 0;
        display.assets.sounds.mainMenu.play();
    }
    if (menu instanceof MainMenu && menu.nextActivity) {
        display.assets.sounds.mainMenu.pause();
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
        return this.options[this.cursor] === 'Player' && players.length < 2 ? null :
            new CharacterSelection(300, 60, this.options[this.cursor], Game.CHARACTERS, Game.STAGES,
                [players[0], this.options[this.cursor] === 'Player' ? players[1] : game.computer]
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
            this.options[this.cursor] === "MainMenu" ? new MainMenu(10, 120, ['Computer', 'Player', 'Training'], 4) : null;
    }
}

class EndMenu extends AbstractMenu {
    constructor(initAnimInitFrame, endAnimEndFrame, options, optionYCenter) {
        super(initAnimInitFrame, endAnimEndFrame, options, optionYCenter);
    }

    optionHandler = game => (this.options[this.cursor] === 'Rematch' ? new Fight(60, 60, game.lastFight.players, game.lastFight.stage, false) :
        this.options[this.cursor] === 'CharacterSelection' ? new CharacterSelection(300, 60, this.options[this.cursor], Game.CHARACTERS, Game.STAGES, game.lastFight.players) :
        this.options[this.cursor] === 'MainMenu' ? new MainMenu(10, 120, ['Computer', 'Player', 'Training'], 4) : null);
}