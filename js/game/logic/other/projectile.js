class Projectile {
    constructor(collisionBox,launcher,direction,speed,damage) {
        this.collisionBox = collisionBox;// CollisionBox
        this.launcher = launcher; //playerId
        this.direction = direction; //Boolean 
        this.speed = speed;// Vecteur2D
        this.damage = damage; //int

       
        this.update = (game)=>{
            this.collisionBox.pos = this.direction ? this.collisionBox.pos.plus(this.speed) : this.collisionBox.pos.plus(new Vector2D(-this.speed.x,this.speed.y));
            
        }
    }
}