class Game {
    constructor() {
        this.activity = new Opening();
        this.players = {}
        this.lastFight = {
            players: [],
            stage: null
        }
    }

    update = inputList => {
        // Add new player if new input is detected
        Object.keys(inputList).filter(id => !this.players[id]).forEach(id => this.players[id] = new Player());
        // Update players input
        Object.keys(inputList).forEach(id => this.players[id].updateInput(inputList[id]));
        // Update activity
        this.activity.updateTransition(this);
    }
}
Game.TRAINING_STAGE = TrainingStage;
Game.STAGES = [Stage, ChildStage];
Game.CHARACTERS = [
    null, null, null,
    null, ChildCharacter2, null,
    Character, null, ChildCharacter,
    null, ChildCharacter3, null,
    null, null, null
];