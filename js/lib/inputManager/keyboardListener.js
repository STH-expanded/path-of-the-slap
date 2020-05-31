class KeyboardListener {
    constructor() {
        this.keys = {
            "left": false,
            "up": false,
            "right": false,
            "down": false,
            "a": false,
            "b": false,
            "start": false
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

        document.body.addEventListener("keydown", this.handler);
        document.body.addEventListener("keyup", this.handler);
    }

    handler = event => {
        if (event.key in this.keyCodes) this.keys[this.keyCodes[event.key]] = event.type === "keydown";
    }
}