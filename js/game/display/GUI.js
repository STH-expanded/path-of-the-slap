class GUI {
    constructor() {
        this.update = display => {
            var fight = display.game.fight;

            // TIMER
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

            // P1
            display.cx.save();
            display.flipHorizontally(32 * display.zoom);
            display.cx.drawImage(
                display.assets.hudmugshot,
                0, 0,
                64 * display.zoom,
                64 * display.zoom
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

            for (let i = 0; i < fight.playoff; i++) {
                if (i < fight.player1.winCount) {
                    display.cx.drawImage(
                        display.assets.winScore,
                        (208 - 16 * i) * display.zoom,
                        24 * display.zoom,
                        16 * display.zoom,
                        16 * display.zoom
                    );
                }
                else {
                    display.cx.drawImage(
                        display.assets.scoreImg,
                        (208 - 16 * i) * display.zoom,
                        24 * display.zoom,
                        16 * display.zoom,
                        16 * display.zoom
                    );
                }
            }

            display.cx.fillStyle = 'white';
            display.cx.font = 10 * display.zoom + "px serif";
            display.cx.textAlign = "start";
            display.cx.fillText(
                fight.player1.character.name,
                64 * display.zoom,
                34 * display.zoom
            );

            //P2
            display.cx.drawImage(
                display.assets.hudmugshot,
                display.cx.canvas.width - 64 * display.zoom, 0,
                64 * display.zoom,
                64 * display.zoom
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

            for (let i = 0; i < fight.playoff; i++) {
                if (i < fight.player2.winCount) {
                    display.cx.drawImage(
                        display.assets.winScore,
                        (256 + 16 * i) * display.zoom,
                        24 * display.zoom,
                        16 * display.zoom,
                        16 * display.zoom
                    );
                }
                else {
                    display.cx.drawImage(
                        display.assets.scoreImg,
                        (256 + 16 * i) * display.zoom,
                        24 * display.zoom,
                        16 * display.zoom,
                        16 * display.zoom
                    );
                }
            }

            display.cx.fillStyle = 'white';
            display.cx.font = 10 * display.zoom + "px serif";
            display.cx.textAlign = "end";
            display.cx.fillText(
                fight.player2.character.name,
                display.cx.canvas.width - 64 * display.zoom,
                34 * display.zoom
            );
        }
    }
}