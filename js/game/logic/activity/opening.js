class Opening extends Activity {
    constructor() {
        super();
        this.display = OpeningDisplay;
        this.nextActivity = null;

        this.initAnimInitFrame = 10;
        this.initAnimFrame = this.initAnimInitFrame;
        
        this.endAnimFrame = 0;
        this.endAnimEndFrame = 10;

        this.update = game => {
            if (this.initAnimFrame) this.initAnimFrame--;
            if (this.nextActivity) {
                if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
                else this.endAnimFrame++;
            } else if (!this.initAnimFrame && !this.endAnimFrame) {

            }
        }
    }
}