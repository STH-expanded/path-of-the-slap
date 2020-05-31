class InputManager {
    constructor() {
        this.inputList = new Map();
        addEventListener('gamepadconnected', this.connectGamepad);
        addEventListener('gamepaddisconnected', this.disconnectGamepad);
        addEventListener('keydown', this.listenKeyboard);
    }

    update = () => {
        const gamepads = Array.from(navigator.getGamepads());
        gamepads.forEach(gamepad => {
            if (gamepad) {
                this.inputList.set(gamepad.id, {
                    left: gamepad.axes[0] < -0.5,
                    up: gamepad.axes[1] < -0.5,
                    right: gamepad.axes[0] > 0.5,
                    down: gamepad.axes[1] > 0.5,
                    a: gamepad.buttons[1].value,
                    b: gamepad.buttons[0].value,
                    start: gamepad.buttons[2].value,
                });
            }
        });
    }

    listenKeyboard = event => {
        if (!this.inputList.has('keyboard')) {
            console.log('Keyboard connected');
            this.inputList.set('keyboard', new KeyboardListener().keys);
        }
    }

    connectGamepad = event => {
        console.log('Gamepad connected : ' + event.gamepad.id);
    }

    disconnectGamepad = event => {
        console.log('Gamepad disconnected : ' + event.gamepad.id);
        this.inputList.delete(event.gamepad.id);
    }
}
