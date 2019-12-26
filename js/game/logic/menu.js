class Menu {
    constructor(options, handler) {
        this.options = options;
        this.handler = handler;
        this.cursor = 0;

        this.update = game => {
            game.inputList.forEach((input, id) => {
                game.lastInputList.forEach((lastinput, lastid) => {
                    if (id === lastid) {
                        if (input.a && !lastinput.a) this.handler(game, this.options, this.cursor);
                        else {
                            if (input.up && !lastinput.up) this.cursor = (((this.cursor - 1) % this.options.length) + this.options.length) % this.options.length;
                            if (input.down && !lastinput.down) this.cursor = (this.cursor + 1) % this.options.length;
                        }
                    }
                });
            });
        };
    }
}