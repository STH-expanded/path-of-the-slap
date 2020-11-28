class GUI {}
GUI.update = display => {
    const cx = display.cx;
    const images = display.assets.images;
    const fight = display.game.activity;

    const player1 = fight.players[0];
    const player2 = fight.players[1];

    // TIMER
    if (!fight.trainingMode) {
        const timer = (fight.timer - (fight.timer % 60)) / 60;
        let nb = timer > 99 ? "99" : timer.toString();
        if (nb.length === 1) nb = "0" + nb;
        for (let i = 0; i < nb.length; i++) {
            cx.drawImage(
                images.timerNumbers,
                14 * nb[i], 0,
                14, 20,
                display.width / 2 + (-14 + i * 14),
                12,
                14,
                20
            );
        }
    } else {
        cx.drawImage(
            images.infinity,
            0, 0,
            28, 20,
            226, 12,
            28, 20
        );
    }

    // P1
    cx.save();
    display.flipHorizontally(32);
    cx.drawImage(
        images.hudmugshot,
        0, 0,
        64,
        64
    );
    cx.drawImage(
        images['cm' + player1.selectedCharacter.id],
        6,
        6,
        52,
        52
    );
    cx.restore();

    cx.drawImage(
        images.hudlife,
        64,
        8,
        160,
        16
    );
    cx.fillStyle = '#0080ff';
    cx.fillRect(
        66 + (156 - (156 * (player1.character.health / player1.character.maxHealth))),
        10,
        156 * (player1.character.health / player1.character.maxHealth),
        12
    );

    const imgci1 = images['ci' + player1.selectedCharacter.id];
    cx.drawImage(
        imgci1,
        64,
        24,
        imgci1.naturalWidth,
        16
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.winCount[0]) {
                cx.drawImage(
                    images.winScore,
                    (208 - 16 * i),
                    24,
                    16,
                    16
                );
            } else {
                cx.drawImage(
                    images.scoreImg,
                    (208 - 16 * i),
                    24,
                    16,
                    16
                );
            }
        }
    }

    //P2
    cx.drawImage(
        images.hudmugshot,
        display.width - 64,
        0,
        64,
        64
    );
    cx.drawImage(
        images['cm' + player2.selectedCharacter.id],
        display.width - 58,
        6,
        52,
        52
    );

    cx.drawImage(
        images.hudlife,
        256,
        8,
        160,
        16
    );
    cx.fillStyle = '#0080ff';
    cx.fillRect(
        258,
        10,
        156 * (player2.character.health / player2.character.maxHealth),
        12
    );

    const imgci2 = images['ci' + player2.selectedCharacter.id];
    cx.drawImage(
        imgci2,
        (416 - imgci2.naturalWidth),
        24,
        imgci2.naturalWidth,
        16
    );

    if (!fight.trainingMode) {
        for (let i = 0; i < fight.playoff; i++) {
            if (i < fight.winCount[1]) {
                cx.drawImage(
                    images.winScore,
                    (256 + 16 * i),
                    24,
                    16,
                    16
                );
            } else {
                cx.drawImage(
                    images.scoreImg,
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
        if (fight.initAnimFrame) {
            cx.drawImage(images.entranceImg, 0, 0, display.width, display.height);
        } else if (fight.roundAnimFrame < fight.roundAnimEndFrame) {
            cx.drawImage(images['round' + (1 + fight.winCount[0] + fight.winCount[1])], 0, 0, display.width, display.height);
        }
        if (fight.roundIsOver) {
            if (fight.roundEndAnimFrame < fight.roundEndAnimEndFrame) {
                cx.drawImage(images[fight.timer === 0 ? 'timeover' : 'ko'], 0, 0, display.width, display.height);
            } else if (fight.endAnimFrame < fight.endAnimEndFrame) {
                cx.drawImage(
                    images['result' + (fight.winCount[0] === fight.playoff && fight.winCount[1] === fight.playoff ? 3 :
                    fight.winCount.indexOf(Math.max(...fight.winCount)) + 1)],
                    0, 0, display.width, display.height
                );
            }
        }
    }
}