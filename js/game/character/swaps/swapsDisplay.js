Fight.drawCharacter02 = (display, player) => {
    const cx = display.cx;

    cx.save();
    if (!player.direction) {
        display.flipHorizontally((player.collisionBox.center().x));
    }

    if (player.status) {
        switch (player.status) {
            case "HIT":
                cx.drawImage(display.assets.images.c02stun,
                    0, 0,
                    91, 192,
                    (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.center().x - 45),
                    (-16 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "EJECTED":
                console.log("EJECTED");
                break;
            case "GROUND":
                console.log("GROUND");
                break;
            case "RECOVER":
                console.log("RECOVER");
                break;
            case "TECH":
                console.log("TECH");
                break;
            case "BLOCK_AERIAL":
                console.log("BLOCK_AERIAL");
                break;
            case "BLOCK_HIGH":
                console.log("BLOCK_HIGH");
                break;
            case "BLOCK_LOW":
                console.log("BLOCK_LOW");
                break;
        }
    } else {
        switch (player.action) {
            case "LAND":
            case "GET_UP":
                cx.drawImage(display.assets.images.c02a0,
                    0, 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_DASH":
                cx.drawImage(display.assets.images.c02df,
                    182 * Math.floor((player.frame / 6) % 6), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_DASH":
                cx.drawImage(display.assets.images.c02db,
                    182 * Math.floor((player.frame / 4) % 4), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_AERIAL":
            case "NEUTRAL_AERIAL":
            case "FORWARD_AERIAL":
                if (player.speed.y <= 0) {
                    cx.drawImage(display.assets.images.c02a1,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (-16 + player.collisionBox.center().y - 96),
                        91, 192
                    );
                } else {
                    cx.drawImage(display.assets.images.c02a2,
                        0, 0,
                        91, 192,
                        (player.collisionBox.center().x - 45),
                        (-16 + player.collisionBox.center().y - 96),
                        91, 192
                    );
                }
                break;
            case "BACKWARD_HIGH":
                cx.drawImage(display.assets.images.c02hb,
                    91 * Math.floor((player.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "NEUTRAL_HIGH":
                cx.drawImage(display.assets.images.c02idle,
                    91 * Math.floor((player.frame / 8) % 6), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-32 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "FORWARD_HIGH":
                cx.drawImage(display.assets.images.c02hf,
                    182 * Math.floor((player.frame / 8) % 9), 0,
                    182, 192,
                    (player.collisionBox.center().x - 91),
                    (-32 + player.collisionBox.center().y - 96),
                    182, 192
                );
                break;
            case "BACKWARD_LOW":
            case "NEUTRAL_LOW":
            case "FORWARD_LOW":
                cx.drawImage(display.assets.images.c02lidle,
                    91 * Math.floor((player.frame / 8) % 5), 0,
                    91, 192,
                    (player.collisionBox.center().x - 45),
                    (-48 + player.collisionBox.center().y - 96),
                    91, 192
                );
                break;
            case "AERIAL_A":
                break;
            case "AERIAL_B":
                break;
            case "HIGH_A":
                break;
            case "HIGH_B":
                break;
            case "LOW_A":
                break;
            case "LOW_B":
                break;
            case "QCF":
                break;
        }
    }

    cx.restore();
}