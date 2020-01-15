class CollisionBox {
    constructor(pos, size) {
        this.playerPos = pos;
        this.playerSize = size;
        this.isCollide = (wallPos, wallSize) => {
            return !(this.playerPos.y + this.playerSize.y < wallPos.y || this.playerPos.y > wallPos.y + wallSize.y || this.playerPos.x + this.playerSize.x < wallPos.x || this.playerPos.x > wallPos.x + wallSize.x);
        };

        this.isIntersect = (pos, wallPos, wallSize) => {
            return !(pos.y + this.playerSize.y <= wallPos.y || pos.y >= wallPos.y + wallSize.y || pos.x + this.playerSize.x <= wallPos.x || pos.x >= wallPos.x + wallSize.x);
        };

        this.inBound = (pos, boundPos, boundSize) => {
            return !(pos.y + this.playerSize.y > boundPos.y + boundSize.y || pos.y < boundPos.y || pos.x + this.playerSize.x > boundPos.x + boundSize.x || pos.x < boundPos.x);
        };

        this.obstaclesAt = obstacles => {
            var result = [];
            obstacles.forEach(obstacle => {
                if (this.inBound(obstacle.pos, obstacle.size)) {
                    result.push(obstacle);
                }
            });
            return result;
        };
    }
}
