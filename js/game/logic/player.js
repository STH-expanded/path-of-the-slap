class Player {
    constructor() {
        this.inputHistory = {
            frame: [],
            state: []
        }
        this.selectedCharacter = null;
        this.character = null;
        this.winCount = 0;
    }

    updateInput = input => {
        // New frame input
        if (this.inputHistory.frame.length === 10) this.inputHistory.frame.splice(0, 1);
        this.inputHistory.frame.push(input);
        // Increment frame count if same state input as last frame
        if (this.inputHistory.state.length > 0 && JSON.stringify(input) === JSON.stringify(this.inputHistory.state[this.inputHistory.state.length - 1].input)) {
            this.inputHistory.state[this.inputHistory.state.length - 1].frameCount++;
        } else {
            // New state input
            if (this.inputHistory.state.length === 10) this.inputHistory.state.splice(0, 1);
            this.inputHistory.state.push({
                input: input,
                frameCount: 1
            });
        }
    }
}