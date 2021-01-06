class Game {
    activity = new Opening(90, 60);
    players = {}
    computer = new Computer();
    lastFight = {
        players: [],
        stage: null
    }

    update = inputList => {
        // Add new player if new input is detected
        Object.keys(inputList).filter(id => !this.players[id]).forEach(id => this.players[id] = new Player());
        // Update players input
        if (this.activity instanceof Fight && !this.activity.pauseMenu && this.activity.players[1] instanceof Computer) this.computer.updateInput(this.computer.getInput(this.activity));
        Object.keys(inputList).forEach(id => this.players[id].updateInput(inputList[id]));
        // Update activity
        this.activity.handler(this);
    }
}
Game.TRAINING_STAGE = TrainingStage;
Game.STAGES = [ChruchStage, JungleStage, DesertStage];
Game.CHARACTERS = [
    null, null, null,
    null, SLING, null,
    SLING, null, SWAPS,
    null, SWAPS, null,
    null, null, null
];