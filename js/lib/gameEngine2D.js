class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus = other => new Vector2D(this.x + other.x, this.y + other.y);
    times = factor => new Vector2D(this.x * factor, this.y * factor);
    equals = other => this.x === other.x && this.y === other.y;
    floor = () => new Vector2D(Math.floor(this.x), Math.floor(this.y));
    round = () => new Vector2D(Math.round(this.x), Math.round(this.y));
}

class CollisionBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    center = () => new Vector2D(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
    collidesWith = collisionBox => this.collidesWithInAxis(collisionBox, "x") && this.collidesWithInAxis(collisionBox, "y");
    collidesWithInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] < collisionBox.pos[axis] || this.pos[axis] > collisionBox.pos[axis] + collisionBox.size[axis]);
    collidingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.collidesWith(collisionBox));
    intersects = collisionBox => this.intersectsInAxis(collisionBox, "x") && this.intersectsInAxis(collisionBox, "y");
    intersectsInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] <= collisionBox.pos[axis] || this.pos[axis] >= collisionBox.pos[axis] + collisionBox.size[axis]);
    intersectingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.intersects(collisionBox));
    includedIn = collisionBox => this.includedInAxis(collisionBox, "x") && this.includedInAxis(collisionBox, "y");
    includedInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] > collisionBox.pos[axis] + collisionBox.size[axis] || this.pos[axis] < collisionBox.pos[axis]);
    includingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.includedIn(collisionBox));
}