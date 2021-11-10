class Game {
    activity = new Opening(90, 60);
    players = {}
    computer = new Computer();
    lastFight = {
        players: [],
        stage: null
    }

    socket = io();
  
    constructor(){ 
    }

    update = inputList => {
        // Add new player if new input is detected
        Object.keys(inputList).filter(id => !this.players[id]).forEach(id => {
            this.players[id] = new Player();
        });
        // Update players input
        if (this.activity instanceof Fight && !this.activity.pauseMenu && online[1] instanceof Computer) this.computer.updateInput(this.computer.getInput(this.activity));
        if ((this.activity instanceof Fight || this.activity instanceof CharacterSelection) && !this.activity.pauseMenu && this.players.online instanceof Online) this.players.online.updateInput(this.players.online.getInput());
        Object.keys(inputList).forEach(id => this.players[id].updateInput(inputList[id]));
        // Update activity
        this.activity.handler(this);
    }
}
Game.TRAINING_STAGE = TrainingStage;
Game.STAGES = [ChruchStage, JungleStage, DesertStage];
Game.CHARACTERS = [
    null, null, null,
    null, null, null,
    SLING, null, SWAPS,
    null, CHAMA, null,
    null, null, null
];