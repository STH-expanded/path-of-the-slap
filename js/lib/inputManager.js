class KeyboardListener {
    keys = { left: false, up: false, right: false, down: false, a: false, b: false, start: false }
    keyCodes = { q: "left", z: "up", d: "right", s: "down", o: "a", p: "b", Enter: "start" }

    constructor() {
        document.body.onkeydown = event => this.handler(event);
        document.body.onkeyup = event => this.handler(event);
    }

    handler = event => event.key in this.keyCodes ? this.keys[this.keyCodes[event.key]] = event.type === "keydown" : event.preventDefault;
}

class InputManager {
    inputList = new Object();
    keyboardListener = null;

    constructor() {
        document.body.ongamepadconnected = event => this.connectGamepad(event);
        document.body.ongamepaddisconnected = event => this.disconnectGamepad(event);
        document.body.onkeypress = () => this.listenKeyboard();
    }

    update = () => {
        // Update gamepads input
        Array.from(navigator.getGamepads()).filter(gamepad => gamepad).forEach(gamepad => {
            this.inputList[gamepad.id] = {
                left: gamepad.axes[0] < -0.5,
                up: gamepad.axes[1] < -0.5,
                right: gamepad.axes[0] > 0.5,
                down: gamepad.axes[1] > 0.5,
                a: gamepad.buttons[1].value,
                b: gamepad.buttons[0].value,
                start: gamepad.buttons[2].value,
            }
        });
        // Update keyboard input
        if (this.keyboardListener) this.inputList['keyboard'] = this.keyboardListener.keys;
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