class KeyboardListener {
    constructor() {
        this.keys = {
            left: false,
            up: false,
            right: false,
            down: false,
            a: false,
            b: false,
            start: false
        }

        this.keyCodes = {
            q: "left",
            z: "up",
            d: "right",
            s: "down",
            o: "a",
            p: "b",
            Enter: "start"
        }

        document.body.onkeydown = event => this.handler(event);
        document.body.onkeyup = event => this.handler(event);
    }

    handler = event => {
        if (event.key in this.keyCodes) this.keys[this.keyCodes[event.key]] = event.type === "keydown";
    }
}