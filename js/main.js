window.onload = () => {
    var startGame = () => {
        clearInterval(helpAnimation);
        document.body.innerHTML = '';
        document.body.onclick = null;
        document.body.onkeypress = null;

        var inputManager = new InputManager();
        var game = new Game(inputManager.inputList);
        var display = new Display(game);
    
        var fps = 60;
        var now;
        var then = Date.now();
        var interval = 1000/fps;
        var delta;

        var frame = () => {
            now = Date.now();
            delta = now - then;

            if (delta > interval) {
                inputManager.update();
                game.update();
                display.update();
                
                then = now - (delta % interval);
            }

            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    var help = document.createElement("p");
    help.innerHTML = "Press any key to continue...";
    document.body.appendChild(help);

    document.body.onclick = () => startGame();
    document.body.onkeypress = () => startGame();
    var helpAnimation = setInterval(() => {
        help.innerHTML = help.innerHTML.match(/[a-z|A-Z|0-9]+[^_]+_{1}$/) ? help.innerHTML.slice(0, -1) : help.innerHTML + '_';
    }, 1000);
}