window.onload = () => {
    // Initialize game
    const inputManager = new InputManager();
    const game = new Game(inputManager.inputList);
    const display = new Display(game);

    // Initialize body
    const loadElem = document.createElement("p");
    loadElem.id = "load";
    document.body.appendChild(loadElem);
    document.body.oncontextmenu = () => false;

    // Load assets then start game
    display.assets.load().then(() => {
        loadElem.innerHTML += "<br>Press any key to continue";

        const startGame = () => {
            document.body.innerHTML = "";
            document.body.onclick = () => false;
            document.body.onkeypress = () => false;
            document.body.appendChild(display.canvas);
    
            // Game loop
            const animationFrame = () => {
                inputManager.update();
                game.update();
                display.update();            
                requestAnimationFrame(animationFrame);
            }
            requestAnimationFrame(animationFrame);
        }
        document.body.onclick = () => startGame();
        document.body.onkeypress = () => startGame();
    });
}