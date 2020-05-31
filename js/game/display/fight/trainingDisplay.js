class TrainingDisplay {}
TrainingDisplay.update = display => {
    var player = display.game.activity.player1;

    display.cx.fillStyle = "rgba(0, 0, 0, 0.5)";
    display.cx.fillRect(
        0,
        64,
        76,
        (4 + player.inputList.length * 12)
    );

    player.inputList.forEach((inputObject, index) => {
        var arrow = [1, 1];
        if (inputObject.inputs.right && inputObject.inputs.up) arrow = [2, 0];
        else if (inputObject.inputs.right && inputObject.inputs.down) arrow = [2, 2];
        else if (inputObject.inputs.left && inputObject.inputs.down) arrow = [0, 2];
        else if (inputObject.inputs.left && inputObject.inputs.up) arrow = [0, 0];
        else if (inputObject.inputs.up) arrow = [1, 0];
        else if (inputObject.inputs.right) arrow = [2, 1];
        else if (inputObject.inputs.down) arrow = [1, 2];
        else if (inputObject.inputs.left) arrow = [0, 1];

        display.cx.drawImage(display.assets.images.arrows,
            8 * arrow[0], 8 * arrow[1], 8, 8,
            8,
            (68 + 12 * index),
            8,
            8
        );
        display.cx.drawImage(display.assets.images.aBtn,
            8 * (inputObject.inputs.a ? 1 : 0), 0, 8, 8,
            24,
            (68 + 12 * index),
            8,
            8
        );
        display.cx.drawImage(display.assets.images.bBtn,
            8 * (inputObject.inputs.b ? 1 : 0), 0, 8, 8,
            36,
            (68 + 12 * index),
            8,
            8
        );

        var frame = inputObject.frames > 999 ? "999" : inputObject.frames.toString();
        for (let i = 0; i < frame.length; i++) {
            display.cx.drawImage(display.assets.images.trainingNumbers,
                5 * frame[i], 0, 5, 8,
                (52 + i * 5),
                (68 + 12 * index),
                5,
                8
            );
        }
    });
}