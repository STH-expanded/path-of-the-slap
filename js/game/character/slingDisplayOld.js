
Fight.drawCharacter00 = (display, player) => {
    

    // if (player.status) {
    //     switch (player.status) {
    //         case "HIT":
    //             cx.drawImage(display.assets.images.c00stun,
    //                 0, 0,
    //                 91, 192,
    //                 (Math.floor(Math.random() * player.frame / 2) - player.frame / 4 + player.collisionBox.center().x - 45),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "EJECTED":
    //             console.log("EJECTED");
    //             break;
    //         case "GROUND":
    //             console.log("GROUND");
    //             break;
    //         case "RECOVER":
    //             console.log("RECOVER");
    //             break;
    //         case "TECH":
    //             console.log("TECH");
    //             break;
    //         case "BLOCK_AERIAL":
    //             console.log("BLOCK_AERIAL");
    //             break;
    //         case "BLOCK_HIGH":
    //             console.log("BLOCK_HIGH");
    //             break;
    //         case "BLOCK_LOW":
    //             console.log("BLOCK_LOW");
    //             break;
    //     }
    // } else {
    //     switch (player.action) {
    //         case "LAND":
    //         case "GET_UP":
    //             cx.drawImage(display.assets.images.c00a0,
    //                 0, 0,
    //                 91, 192,
    //                 (player.collisionBox.center().x - 45),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "FORWARD_DASH":
    //             cx.drawImage(display.assets.images.c00df,
    //                 0, 0,
    //                 182, 192,
    //                 (player.collisionBox.center().x - 91),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             cx.drawImage(display.assets.images.dust,
    //                 128 * Math.floor((player.frame / 2) % 20), 0,
    //                 128, 128,
    //                 (-(Math.floor(player.frame / 2) * player.forwardDashSpeed) + player.collisionBox.pos.x - 128),
    //                 (8 + player.collisionBox.pos.y + player.collisionBox.size.y - 128),
    //                 128, 128
    //             );
    //             cx.globalAlpha = 0.25;
    //             cx.drawImage(display.assets.images.dash,
    //                 128 * Math.floor((player.frame / 4) % 20), 0,
    //                 128, 128,
    //                 (player.collisionBox.pos.x + player.collisionBox.size.x),
    //                 (player.collisionBox.pos.y + player.collisionBox.size.y - 128),
    //                 128, 128
    //             );
    //             cx.globalAlpha = 1;
    //             break;
    //         case "BACKWARD_DASH":
    //             console.log("BACKWARD_DASH");
    //             break;
    //         case "BACKWARD_AERIAL":
    //         case "NEUTRAL_AERIAL":
    //         case "FORWARD_AERIAL":
    //             if (player.speed.y <= 0) {
    //                 cx.drawImage(display.assets.images.c00a1,
    //                     0, 0,
    //                     91, 192,
    //                     (player.collisionBox.center().x - 45),
    //                     (player.collisionBox.center().y - 96),
    //                     91, 192
    //                 );
    //             } else {
    //                 cx.drawImage(display.assets.images.c00a2,
    //                     0, 0,
    //                     91, 192,
    //                     (player.collisionBox.center().x - 45),
    //                     (player.collisionBox.center().y - 96),
    //                     91, 192
    //                 );
    //             }
    //             break;
    //         case "BACKWARD_HIGH":
    //             cx.drawImage(display.assets.images.c00hb,
    //                 91 * Math.floor((player.frame / 8) % 6), 0,
    //                 91, 192,
    //                 (player.collisionBox.center().x - 45),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "IDLE":
    //             break;
    //         case "FORWARD_HIGH":
    //             cx.drawImage(display.assets.images.c00hf,
    //                 91 * Math.floor((player.frame / 8) % 6), 0,
    //                 91, 192,
    //                 (player.collisionBox.center().x - 45),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "BACKWARD_LOW":
    //         case "NEUTRAL_LOW":
    //         case "FORWARD_LOW":
    //             cx.drawImage(display.assets.images.c00lidle,
    //                 91 * Math.floor((player.frame / 8) % 6), 0,
    //                 91, 192,
    //                 (player.collisionBox.center().x - 45),
    //                 (-32 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "AERIAL_A":
    //             cx.drawImage(display.assets.images.c00aa,
    //                 91 * Math.floor((player.frame / 5) % 4), 0,
    //                 91, 192,
    //                 (player.collisionBox.center().x - 45),
    //                 (16 + player.collisionBox.center().y - 96),
    //                 91, 192
    //             );
    //             break;
    //         case "AERIAL_B":
    //             cx.drawImage(display.assets.images.c00ab,
    //                 182 * Math.floor((player.frame / 4) % 6), 0,
    //                 182, 192,
    //                 (player.collisionBox.center().x - 91),
    //                 (16 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //         case "HIGH_A":
    //             cx.drawImage(display.assets.images.c00ha,
    //                 182 * Math.floor((player.frame / 4) % 4), 0,
    //                 182, 192,
    //                 (player.collisionBox.center().x - 91),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //         case "HIGH_B":
    //             cx.drawImage(display.assets.images.c00hab,
    //                 182 * Math.floor((player.frame / 5) % 6), 0,
    //                 182, 192,
    //                 (player.collisionBox.center().x - 91),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //         case "LOW_A":
    //             cx.drawImage(display.assets.images.c00la,
    //                 182 * Math.floor((player.frame / 3) % 4), 0,
    //                 182, 192,
    //                 (player.collisionBox.center().x - 91),
    //                 (-32 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //         case "LOW_B":
    //             cx.drawImage(display.assets.images.c00lab,
    //                 182 * Math.floor((player.frame / 5) % 6), 0,
    //                 182, 192,
    //                 (32 + player.collisionBox.center().x - 91),
    //                 (-32 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //         case "QCF":
    //             cx.drawImage(display.assets.images.c00qcf,
    //                 182 * Math.floor((player.frame / 4) % 8), 0,
    //                 182, 192,
    //                 (16 + player.collisionBox.center().x - 91),
    //                 (-16 + player.collisionBox.center().y - 96),
    //                 182, 192
    //             );
    //             break;
    //     }
    // }
}