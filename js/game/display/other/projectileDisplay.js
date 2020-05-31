class ProjectileDisplay {}

ProjectileDisplay.update = display => {
    display.cx.fillStyle = '#00f4';
    
    var fight = display.game.activity;

    fight.projectiles.forEach((element) => {
        display.cx.fillRect(
            element.collisionBox.pos.x, element.collisionBox.pos.y,
            element.collisionBox.size.x, element.collisionBox.size.y
        );
    });

}