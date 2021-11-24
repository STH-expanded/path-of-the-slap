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
        this.socket.on('returnOtherPlayerToMenu', () => {
            this.players = {}
            this.activity = new MainMenu(10, 120, ['Computer', 'Player', 'Online', 'Training'], 4)
        })
    }

    update = inputList => {
        if(this.players.online){            
            this.socket.emit('updatePlayer',  {id: this.socket.id,inputs:Object.values(inputList)[0]});
        }
        
        // Add new player if new input is detected
        Object.keys(inputList).filter(id => !this.players[id]).forEach(id => {
            this.players[id] = new Player();
        });
        // Update players input
        if (this.activity instanceof Fight && !this.activity.pauseMenu && this.activity.players[1] instanceof Computer) this.computer.updateInput(this.computer.getInput(this.activity));
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