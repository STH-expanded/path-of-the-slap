class Opening extends Activity {
    constructor() {
        super();
        this.display = OpeningDisplay;

        this.initAnimInitFrame = 90;
        this.initAnimFrame = this.initAnimInitFrame;
        this.endAnimFrame = 0;
        this.endAnimEndFrame = 30;
    }

    update = game => this.nextActivity = new MainMenu();
}