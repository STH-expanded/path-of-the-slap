class Stage {
    collisionBox = new CollisionBox(new Vector2D(0, 0), new Vector2D(960, 270 - 16));
    
    clipCollisionBox = collisionBox => {
        if (collisionBox.pos.x < this.collisionBox.pos.x) collisionBox.pos.x = this.collisionBox.pos.x;
        else if (collisionBox.pos.x + collisionBox.size.x > this.collisionBox.size.x) collisionBox.pos.x = this.collisionBox.size.x - collisionBox.size.x;
        if (collisionBox.pos.y < this.collisionBox.pos.x) collisionBox.pos.y = this.collisionBox.pos.x;
        else if (collisionBox.pos.y + collisionBox.size.y > this.collisionBox.size.y) collisionBox.pos.y = this.collisionBox.size.y - collisionBox.size.y;
    }

    xClipCollisionBoxes = (collisionBox1, collisionBox2) => {
        if (collisionBox1.pos.x < this.collisionBox.pos.x) {
            collisionBox1.pos.x = this.collisionBox.pos.x;
            collisionBox2.pos.x = collisionBox1.size.x;
        } else if (collisionBox1.pos.x + collisionBox1.size.x > this.collisionBox.size.x) {
            collisionBox1.pos.x = this.collisionBox.size.x - collisionBox1.size.x;
            collisionBox2.pos.x = collisionBox1.pos.x - collisionBox2.size.x;
        }
    }
}

class ChruchStage extends Stage {
    id = 0;
}
ChruchStage.id = 0;

class JungleStage extends Stage {
    id = 1;
}
JungleStage.id = 1;

class TrainingStage extends Stage {
    id = 2;
}
TrainingStage.id = 2;