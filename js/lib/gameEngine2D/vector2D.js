class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus = other => new Vector2D(this.x + other.x, this.y + other.y);
    times = factor => new Vector2D(this.x * factor, this.y * factor);
    equals = other => this.x === other.x && this.y === other.y;
    floor = () => new Vector2D(Math.floor(this.x), Math.floor(this.y));
}