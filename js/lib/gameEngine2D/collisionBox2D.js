class CollisionBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;

        this.collidesWith = collisionBox => {
            return !(
                this.pos.y + this.size.y < collisionBox.pos.y || this.pos.y > collisionBox.pos.y + collisionBox.size.y ||
                this.pos.x + this.size.x < collisionBox.pos.x || this.pos.x > collisionBox.pos.x + collisionBox.size.x
            );
        };
        this.collidingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.collidesWith(collisionBox));

        this.intersects = collisionBox => {
            return !(
                this.pos.y + this.size.y <= collisionBox.pos.y || this.pos.y >= collisionBox.pos.y + collisionBox.size.y ||
                this.pos.x + this.size.x <= collisionBox.pos.x || this.pos.x >= collisionBox.pos.x + collisionBox.size.x
            );
        };
        this.intersectingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.intersects(collisionBox));

        this.isIncludedIn = collisionBox => {
            return !(
                this.pos.y + this.size.y > collisionBox.pos.y + collisionBox.size.y || this.pos.y < collisionBox.pos.y ||
                this.pos.x + this.size.x > collisionBox.pos.x + collisionBox.size.x || this.pos.x < collisionBox.pos.x
            );
        };
        this.includingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.isIncludedIn(collisionBox));
    }
}