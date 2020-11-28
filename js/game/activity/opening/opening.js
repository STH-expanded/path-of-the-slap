class Opening extends Activity {
    display = OpeningDisplay;

    constructor(initAnimInitFrame, endAnimEndFrame) {
        super(initAnimInitFrame, endAnimEndFrame);
    }

    update = game => this.nextActivity = new MainMenu(10, 10, ['Computer', 'Player', 'Training'], 4);
}