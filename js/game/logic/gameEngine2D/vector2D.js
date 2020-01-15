class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.plus = other => new Vector2D(this.x + other.x, this.y + other.y);
        this.times = factor => new Vector2D(this.x * factor, this.y * factor);
        this.equals = other => this.x === other.x && this.y === other.y;
        this.floor = () => new Vector2D(Math.floor(this.x), Math.floor(this.y));
        this.data = () => new Vector2D(this.x, this.y);
    }
}