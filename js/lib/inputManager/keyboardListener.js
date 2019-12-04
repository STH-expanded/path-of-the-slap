class KeyboardListener {
    constructor() {
        this.keys = {};

        this.keyCodes = new Map([
            [81, "left"],
            [90, "up"],
            [68, "right"],
            [83, "down"],
            [79, "a"],
            [80, "b"]
        ]);

        this.handler = event => {
            if (this.keyCodes.has(event.keyCode)) {
                this.keys[this.keyCodes.get(event.keyCode)] = event.type === "keydown";
                event.preventDefault();
            }
        }

        addEventListener("keydown", this.handler);
        addEventListener("keyup", this.handler);
    }
}