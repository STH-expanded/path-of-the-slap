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
                display.assets.timerNumbers,
                14 * nb[i], 0,
                14, 20,
                display.cx.canvas.width / 2 + (-14 + i * 14) * display.zoom,
                12 * display.zoom,
                14 * display.zoom,
                20 * display.zoom
            );
        }
    }
    else {
        display.cx.drawImage(
            display.assets.infinity,
            0, 0,
            28, 20,
            226 * display.zoom, 12 * display.zoom,
            28 * display.zoom, 20 * display.zoom
        );
    }

    // P1
    display.cx.save();
    display.flipHorizontally(32 * display.zoom);
    display.cx.drawImage(
        display.assets.hudmugshot,
        0, 0,
        64 * display.zoom,
        64 * display.zoom
    );
    display.cx.drawImage(
        display.assets['cm' + fight.player1.character.id],
        6 * display.zoom,
        6 * display.zoom,
        52 * display.zoom,
        52 * display.zoom
    );
    display.cx.restore();

    display.cx.drawImage(
        display.assets.hudlife,
        64 * display.zoom,
        8 * display.zoom,
        160 * display.zoom,
        16 * display.zoom
    );
    display.cx.fillStyle = '#0080ff';
    display.cx.fillRect(
        66 * display.zoom + (156 * display.zoom - (156 * (fight.player1.character.health / fight.player1.character.maxHealth) * display.zoom)),
        10 * display.zoom,
        156 * (fight.player1.character.health / fight.player1.character.maxHealth) * display.zoom,
        12 * display.zoom
    );

    var imgci1 = display.assets['ci' + fight.player1.character.id];
    display.cx.drawImage(
        imgci1,
        64 * display.zoom,
        24 * display.zoom,
        imgci1.naturalWidth * display.zoom,
        16 * display.zoom
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.player1.winCount) {
                display.cx.drawImage(
                    display.assets.winScore,
                    (208 - 16 * i) * display.zoom,
                    24 * display.zoom,
                    16 * display.zoom,
                    16 * display.zoom
                );
            } else {
                display.cx.drawImage(
                    display.assets.scoreImg,
                    (208 - 16 * i) * display.zoom,
                    24 * display.zoom,
                    16 * display.zoom,
                    16 * display.zoom
                );
            }
        }
    }

    //P2
    display.cx.drawImage(
        display.assets.hudmugshot,
        display.cx.canvas.width - 64 * display.zoom,
        0,
        64 * display.zoom,
        64 * display.zoom
    );
    display.cx.drawImage(
        display.assets['cm' + fight.player2.character.id],
        display.cx.canvas.width - 58 * display.zoom,
        6 * display.zoom,
        52 * display.zoom,
        52 * display.zoom
    );

    display.cx.drawImage(
        display.assets.hudlife,
        256 * display.zoom,
        8 * display.zoom,
        160 * display.zoom,
        16 * display.zoom
    );
    display.cx.fillStyle = '#0080ff';
    display.cx.fillRect(
        258 * display.zoom,
        10 * display.zoom,
        156 * (fight.player2.character.health / fight.player2.character.maxHealth) * display.zoom,
        12 * display.zoom
    );
    
    var imgci2 = display.assets['ci' + fight.player2.character.id];
    display.cx.drawImage(
        imgci2,
        (416 - imgci2.naturalWidth) * display.zoom,
        24 * display.zoom,
        imgci2.naturalWidth * display.zoom,
        16 * display.zoom
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.player2.winCount) {
                display.cx.drawImage(
                    display.assets.winScore,
                    (256 + 16 * i) * display.zoom,
                    24 * display.zoom,
                    16 * display.zoom,
                    16 * display.zoom
                );
            } else {
                display.cx.drawImage(
                    display.assets.scoreImg,
                    (256 + 16 * i) * display.zoom,
                    24 * display.zoom,
                    16 * display.zoom,
                    16 * display.zoom
                );
            }
        }
    }

    // Training Display
    if (fight.trainingMode) TrainingDisplay.update(display);
}