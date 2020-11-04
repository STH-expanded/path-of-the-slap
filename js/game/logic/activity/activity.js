class Activity {
    constructor() {
        this.display = ActivityDisplay;
        this.nextActivity = null;
        
        this.initAnimInitFrame = 0;
        this.initAnimFrame = this.initAnimInitFrame;
        this.endAnimFrame = 0;
        this.endAnimEndFrame = 0;
    }

    updateTransition = game => {
        if (this.initAnimFrame) this.initAnimFrame--;
        if (this.nextActivity) {
            if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
            else this.endAnimFrame++;
        } else if (!this.initAnimFrame && !this.endAnimFrame) this.update(game);
    }

    update = game => {}
}