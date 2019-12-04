window.onload = () => {

    var inputManager = new InputManager();
    var game = new Game(inputManager.inputList);
    var display = new Display(game);

    var frame = () => {
        inputManager.update();
        game.update();
        display.update();
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}