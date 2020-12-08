class Player {
    character = null;
    selectedCharacter = null;

    constructor() {
        this.resetInput();
    }

    resetInput = () => {
        this.inputList = {
            frame: new Array(8).fill({}),
            state: new Array(8).fill({
                input: {},
                frameCount: 1
            })
        }
    }

    formatInput = rawKeys => {
        // Arcade stick format
        // -------------
        // | 7 | 8 | 9 |
        // -------------
        // | 4 | 5 | 6 |
        // -------------
        // | 1 | 2 | 3 |
        // -------------
        let stick = 5;
        if (rawKeys.left) stick--;
        if (rawKeys.right) stick++;
        if (rawKeys.up) stick += 3;
        if (rawKeys.down && !rawKeys.up) stick -= 3;
        return {
            stick: stick,
            a: rawKeys.a,
            b: rawKeys.b,
            start: rawKeys.start
        }
    }

    updateInput = rawKeys => {
        const input = this.formatInput({
            ...rawKeys
        });
        // New frame input
        this.inputList.frame.pop();
        this.inputList.frame.unshift(input);
        // Increment frame count if same state input as last frame
        if (this.inputList.state.length > 0 && JSON.stringify(input) === JSON.stringify(this.inputList.state[0].input)) this.inputList.state[0].frameCount++;
        else {
            // New state input
            this.inputList.state.pop();
            this.inputList.state.unshift({
                input: input,
                frameCount: 1
            });
        }
    }
}