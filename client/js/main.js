window.onload = () => {
    // Initialize body
    const loadElem = document.createElement("p");
    loadElem.id = "load";
    document.body.appendChild(loadElem);
    // Load assets then listen to player input to start game
    const assets = new Assets();
    assets.load().then(() => {
        const listenEvent = callback => ["onclick", "onkeypress"].forEach(name => document.body[name] = event => callback(event));
        const startGame = event => {
            // Remove event listeners
            listenEvent(event => event.preventDefault);
            // Initialize game
            const game = new Game();
            const display = new Display(game, assets);
            const inputManager = new InputManager();
            // Game loop
            const animationFrame = () => {
                // Update players input
                inputManager.update();
                // Update game logic
                game.update(inputManager.inputList);
                // Update game display
                display.update();
                requestAnimationFrame(animationFrame);
            }
            requestAnimationFrame(animationFrame);
        }
        // Add event listeners
        listenEvent(startGame);
        loadElem.innerHTML += "<br>Press any key to continue";
        loadElem.style.animation = "3s ease-in-out infinite blink-animation";
    });
}

const urlParams = new URLSearchParams(window.location.search);
let debugMode = {
    fight: urlParams.get('fight'),
    cpu: urlParams.get('cpu'),
    display: urlParams.get('display')
};