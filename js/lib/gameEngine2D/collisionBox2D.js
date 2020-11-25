class CollisionBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    
    collidesWith = collisionBox => {
        return !(
            this.pos.y + this.size.y < collisionBox.pos.y || this.pos.y > collisionBox.pos.y + collisionBox.size.y ||
            this.pos.x + this.size.x < collisionBox.pos.x || this.pos.x > collisionBox.pos.x + collisionBox.size.x
        );
    }
    collidingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.collidesWith(collisionBox));

    intersects = collisionBox => {
        return !(
            this.pos.y + this.size.y <= collisionBox.pos.y || this.pos.y >= collisionBox.pos.y + collisionBox.size.y ||
            this.pos.x + this.size.x <= collisionBox.pos.x || this.pos.x >= collisionBox.pos.x + collisionBox.size.x
        );
    }
    intersectingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.intersects(collisionBox));

    isIncludedIn = collisionBox => {
        return !(
            this.pos.y + this.size.y > collisionBox.pos.y + collisionBox.size.y || this.pos.y < collisionBox.pos.y ||
            this.pos.x + this.size.x > collisionBox.pos.x + collisionBox.size.x || this.pos.x < collisionBox.pos.x
        );
    }

    isIncludedInX = collisionBox => {
        return !(
            this.pos.x + this.size.x > collisionBox.pos.x + collisionBox.size.x || this.pos.x < collisionBox.pos.x
        );
    }

    isIncludedInY = collisionBox => {
        return (
            this.pos.y + this.size.y <= collisionBox.pos.y + collisionBox.size.y 
        );
    }

    includingCollisionBoxes = collisionBoxList => collisionBoxList.map(collisionBox => this.isIncludedIn(collisionBox));
}