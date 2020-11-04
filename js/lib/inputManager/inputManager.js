class InputManager {
    constructor() {
        this.inputList = new Object();
        this.keyboardListener = null;
        document.body.ongamepadconnected = event => this.connectGamepad(event);
        document.body.ongamepaddisconnected = event => this.disconnectGamepad(event);
        document.body.onkeypress = () => this.listenKeyboard();
    }

    update = () => {
        // Update gamepads input
        Array.from(navigator.getGamepads()).filter(gamepad => gamepad).forEach(gamepad => {
            this.inputList[gamepad.id] = this.socdClean({
                left: gamepad.axes[0] < -0.5,
                up: gamepad.axes[1] < -0.5,
                right: gamepad.axes[0] > 0.5,
                down: gamepad.axes[1] > 0.5,
                a: gamepad.buttons[1].value,
                b: gamepad.buttons[0].value,
                start: gamepad.buttons[2].value,
            });
        });
        // Update keyboard input
        if (this.keyboardListener) this.inputList['keyboard'] = this.socdClean(this.keyboardListener.keys);
    }

    // Simultaneous Opposite Cardinal Directions
    socdClean = input => {
        return {
            left: input.left && !input.right,
            up: input.up && !input.down,
            right: input.right && !input.left,
            down: input.down && !input.up,
            a: input.a,
            b: input.b,
            start: input.start
        }
    }

    listenKeyboard = () => {
        console.log('Keyboard connected');
        this.keyboardListener = new KeyboardListener();
        document.body.onkeypress = event => event.preventDefault();
    }

    connectGamepad = event => {
        console.log('Gamepad connected : ' + event.gamepad.id);
    }

    disconnectGamepad = event => {
        console.log('Gamepad disconnected : ' + event.gamepad.id);
        delete this.inputList[event.gamepad.id];
    }
}