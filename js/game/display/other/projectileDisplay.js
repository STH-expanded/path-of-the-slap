class ProjectileDisplay {}

ProjectileDisplay.update = display => {
    display.cx.fillStyle = '#00f4';
    
    var fight = display.game.activity;

    fight.projectiles.forEach((element) => {
        display.cx.fillRect(
            element.collisionBox.pos.x * display.zoom, element.collisionBox.pos.y * display.zoom,
            element.collisionBox.size.x * display.zoom, element.collisionBox.size.y * display.zoom
        );
    });

}