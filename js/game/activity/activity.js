class Activity {
    nextActivity = null;
    animationFrame = 0;

    constructor(initAnimInitFrame, endAnimEndFrame) {
        this.initAnimInitFrame = initAnimInitFrame;
        this.initAnimFrame = initAnimInitFrame;
        this.endAnimFrame = 0;
        this.endAnimEndFrame = endAnimEndFrame;
    }

    handler = game => {
        if (this.initAnimFrame) this.initAnimFrame--;
        if (this.nextActivity) {
            if (this.endAnimFrame >= this.endAnimEndFrame) game.activity = this.nextActivity;
            else this.endAnimFrame++;
        } else if (!this.initAnimFrame && !this.endAnimFrame) this.update(game);
        this.animationFrame++;
    }

    update = game => {}
}

Activity.display = display => {}