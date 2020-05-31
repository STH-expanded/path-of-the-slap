class GUI {}
GUI.update = display => {
    var fight = display.game.activity;

    // TIMER
    if (!fight.trainingMode) {
        var timer = (fight.timer - (fight.timer % 60)) / 60;
        var nb = timer > 99 ? "99" : timer.toString();
        if (nb.length === 1) nb = "0" + nb;
        for (let i = 0; i < nb.length; i++) {
            display.cx.drawImage(
                display.assets.images.timerNumbers,
                14 * nb[i], 0,
                14, 20,
                display.width / 2 + (-14 + i * 14),
                12,
                14,
                20
            );
        }
    } else {
        display.cx.drawImage(
            display.assets.images.infinity,
            0, 0,
            28, 20,
            226, 12,
            28, 20
        );
    }

    // P1
    display.cx.save();
    display.flipHorizontally(32);
    display.cx.drawImage(
        display.assets.images.hudmugshot,
        0, 0,
        64,
        64
    );
    display.cx.drawImage(
        display.assets.images['cm' + fight.player1.character.id],
        6,
        6,
        52,
        52
    );
    display.cx.restore();

    display.cx.drawImage(
        display.assets.images.hudlife,
        64,
        8,
        160,
        16
    );
    display.cx.fillStyle = '#0080ff';
    display.cx.fillRect(
        66 + (156 - (156 * (fight.player1.character.health / fight.player1.character.maxHealth))),
        10,
        156 * (fight.player1.character.health / fight.player1.character.maxHealth),
        12
    );

    var imgci1 = display.assets.images['ci' + fight.player1.character.id];
    display.cx.drawImage(
        imgci1,
        64,
        24,
        imgci1.naturalWidth,
        16
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.player1.winCount) {
                display.cx.drawImage(
                    display.assets.images.winScore,
                    (208 - 16 * i),
                    24,
                    16,
                    16
                );
            } else {
                display.cx.drawImage(
                    display.assets.images.scoreImg,
                    (208 - 16 * i),
                    24,
                    16,
                    16
                );
            }
        }
    }

    //P2
    display.cx.drawImage(
        display.assets.images.hudmugshot,
        display.width - 64,
        0,
        64,
        64
    );
    display.cx.drawImage(
        display.assets.images['cm' + fight.player2.character.id],
        display.width - 58,
        6,
        52,
        52
    );

    display.cx.drawImage(
        display.assets.images.hudlife,
        256,
        8,
        160,
        16
    );
    display.cx.fillStyle = '#0080ff';
    display.cx.fillRect(
        258,
        10,
        156 * (fight.player2.character.health / fight.player2.character.maxHealth),
        12
    );

    var imgci2 = display.assets.images['ci' + fight.player2.character.id];
    display.cx.drawImage(
        imgci2,
        (416 - imgci2.naturalWidth),
        24,
        imgci2.naturalWidth,
        16
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.player2.winCount) {
                display.cx.drawImage(
                    display.assets.images.winScore,
                    (256 + 16 * i),
                    24,
                    16,
                    16
                );
            } else {
                display.cx.drawImage(
                    display.assets.images.scoreImg,
                    (256 + 16 * i),
                    24,
                    16,
                    16
                );
            }
        }
    }

    // Training or Fight Animation Display
    if (fight.trainingMode) TrainingDisplay.update(display);
    else {
        if (fight.entranceAnimFrame < fight.entranceAnimEndFrame) {
            display.cx.drawImage(display.assets.images.entranceImg, 0, 0, 480, 270);
        } else if (fight.roundAnimFrame < fight.roundAnimEndFrame) {
            display.cx.drawImage(display.assets.images['round' + (1 + fight.player1.winCount + fight.player2.winCount)], 0, 0, 480, 270);
        }
        if (fight.roundIsOver) {
            if (fight.roundEndAnimFrame < fight.roundEndAnimEndFrame) {
                display.cx.drawImage(display.assets.images[fight.timer === 0 ? 'timeover' : 'ko'], 0, 0, 480, 270);
            } else if (fight.endAnimFrame < fight.endAnimEndFrame) {
                display.cx.drawImage(
                    display.assets.images['result' + (fight.player1.winCount === fight.player2.winCount && fight.player1.winCount === fight.playoff ? 3 :
                    (fight.players.findIndex(player => player.winCount === fight.playoff) + 1))],
                    0, 0, 480, 270
                );
            }
        }
    }
}