class Activity {
    constructor() {
        this.display = ActivityDisplay;
        this.nextActivity = null;
        this.update = game => {}
    }
}