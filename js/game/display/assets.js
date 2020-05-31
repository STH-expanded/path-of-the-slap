class Assets {
    constructor() {
        this.imageDataList = [
            // Opening
            { id: 'opening', src: 'img/opening.png' },

            // Menu
            { id: 'titleScreen', src: 'img/menu/titleScreen.png' },
            { id: 'menucursor', src: 'img/menu/menucursor.png' },
            { id: 'btnPlayerDisabled', src: 'img/menu/btnvsplayerdisabled.png' },
            { id: 'btnPlayer', src: 'img/menu/btnvsplayer.png' },
            { id: 'btnComputer', src: 'img/menu/btnvscomputer.png' },
            { id: 'btnTraining', src: 'img/menu/btntraining.png' },
            { id: 'btnRematch', src: 'img/menu/btnrematch.png' },
            { id: 'btnResume', src: 'img/menu/btnresume.png' },
            { id: 'btnMainMenu', src: 'img/menu/btnreturntomenu.png' },
            { id: 'btnCharacterSelection', src: 'img/menu/btncharacterselection.png' },

            // Character
            { id: 'ci00', src: 'img/character/ci00.png' },
            { id: 'cp00', src: 'img/character/cp00.png' },
            { id: 'cp00shadow', src: 'img/character/cp00shadow.png' },
            { id: 'cp00active', src: 'img/character/cp00active.png' },
            { id: 'cp00activeShadow', src: 'img/character/cp00activeShadow.png' },
            { id: 'cm00', src: 'img/character/cm00.png' },
            { id: 'cn00', src: 'img/character/cn00.png' },
            { id: 'c00idle', src: 'img/character/c00idle.png' },
            { id: 'c00hf', src: 'img/character/c00hf.png' },
            { id: 'c00hb', src: 'img/character/c00hb.png' },
            { id: 'c00df', src: 'img/character/c00df.png' },
            { id: 'c00ha', src: 'img/character/c00ha.png' },
            { id: 'c00hab', src: 'img/character/c00hab.png' },
            { id: 'c00lidle', src: 'img/character/c00lidle.png' },
            { id: 'c00la', src: 'img/character/c00la.png' },
            { id: 'c00lab', src: 'img/character/c00lab.png' },
            { id: 'c00a0', src: 'img/character/c00a0.png' },
            { id: 'c00a1', src: 'img/character/c00a1.png' },
            { id: 'c00a2', src: 'img/character/c00a2.png' },
            { id: 'c00stun', src: 'img/character/c00stun.png' },
            { id: 'c00aa', src: 'img/character/c00aa.png' },
            { id: 'c00ab', src: 'img/character/c00ab.png' },
            { id: 'c00qcf', src: 'img/character/c00qcf.png' },

            { id: 'ci01', src: 'img/character/ci01.png' },
            { id: 'cp01', src: 'img/character/cp01.png' },
            { id: 'cp01shadow', src: 'img/character/cp01shadow.png' },
            { id: 'cp01active', src: 'img/character/cp01active.png' },
            { id: 'cp01activeShadow', src: 'img/character/cp01activeShadow.png' },
            { id: 'cm01', src: 'img/character/cm01.png' },
            { id: 'cn01', src: 'img/character/cn01.png' },

            { id: 'ci02', src: 'img/character/ci02.png' },
            { id: 'cp02', src: 'img/character/cp02.png' },
            { id: 'cp02shadow', src: 'img/character/cp02shadow.png' },
            { id: 'cp02active', src: 'img/character/cp02active.png' },
            { id: 'cp02activeShadow', src: 'img/character/cp02activeShadow.png' },
            { id: 'cm02', src: 'img/character/cm02.png' },
            { id: 'cn02', src: 'img/character/cn02.png' },
            { id: 'c02idle', src: 'img/character/c02idle.png' },
            { id: 'c02lidle', src: 'img/character/c02lidle.png' },
            { id: 'c02hf', src: 'img/character/c02hf.png' },
            { id: 'c02hb', src: 'img/character/c02hb.png' },
            { id: 'c02df', src: 'img/character/c02df.png' },
            { id: 'c02db', src: 'img/character/c02db.png' },
            { id: 'c02a0', src: 'img/character/c02a0.png' },
            { id: 'c02a1', src: 'img/character/c02a1.png' },
            { id: 'c02a2', src: 'img/character/c02a2.png' },

            { id: 'ci03', src: 'img/character/ci03.png' },
            { id: 'cp03', src: 'img/character/cp03.png' },
            { id: 'cp03shadow', src: 'img/character/cp03shadow.png' },
            { id: 'cp03active', src: 'img/character/cp03active.png' },
            { id: 'cp03activeShadow', src: 'img/character/cp03activeShadow.png' },
            { id: 'cm03', src: 'img/character/cm03.png' },
            { id: 'cn03', src: 'img/character/cn03.png' },

            // Character Selection
            { id: 'characterSelect', src: 'img/characterSelect/characterSelect.png' },
            { id: 'stageSelect', src: 'img/characterSelect/stageSelect.png' },
            { id: 'stageSelectCursor', src: 'img/characterSelect/stageCursor.png' },
            { id: 'characterSelectBackBlue', src: 'img/characterSelect/characterSelectBackBlue.png' },
            { id: 'characterSelectBackRed', src: 'img/characterSelect/characterSelectBackRed.png' },
            { id: 'characterSelectP1', src: 'img/characterSelect/charSelectCursorP1.png' },
            { id: 'characterSelectP2', src: 'img/characterSelect/charSelectCursorP2.png' },
            { id: 'characterSelectInfo', src: 'img/characterSelect/characterSelectInfo.png' },
            { id: 'characterSelectInfo2', src: 'img/characterSelect/characterSelectInfo2.png' },
            { id: 'characterSelectInfo3', src: 'img/characterSelect/characterSelectInfo3.png' },
            { id: 'whiteMugshot', src: 'img/characterSelect/mugshot.png' },
            { id: 'characterSelectKeyboard', src: 'img/characterSelect/keyboard.png' },
            { id: 'characterSelectGamepad', src: 'img/characterSelect/gamepad.png' },
            { id: 'randomImg', src: 'img/characterSelect/random.png' },
            { id: 'random2Img', src: 'img/characterSelect/random2.png' },
            { id: 'lockImg', src: 'img/characterSelect/lock.png' },

            // Stage
            { id: 's0floor', src: 'img/stage/s0floor.png' },
            { id: 's0l0', src: 'img/stage/s0l0.png' },
            { id: 's0l1', src: 'img/stage/s0l1.png' },
            { id: 's0preview', src: 'img/stage/s0preview.png' },

            { id: 's1floor', src: 'img/stage/s1floor.png' },
            { id: 's1l0', src: 'img/stage/s1l0.png' },
            { id: 's1l1', src: 'img/stage/s1l1.png' },
            { id: 's1preview', src: 'img/stage/s1preview.png' },

            { id: 's2floor', src: 'img/stage/s2floor.png' },
            { id: 's2l1', src: 'img/stage/s2l1.png' },
            { id: 's2preview', src: 'img/stage/s2preview.png' },

            // Fight
            { id: 'hudmugshot', src: 'img/fight/hudMugshot.png' },
            { id: 'hudlife', src: 'img/fight/hudLife.png' },
            { id: 'scoreImg', src: 'img/fight/score.png' },
            { id: 'winScore', src: 'img/fight/winScore.png' },
            { id: 'timerNumbers', src: 'img/fight/numbers2.png' },
            { id: 'entranceImg', src: 'img/fight/entrance.png' },
            { id: 'round1', src: 'img/fight/round1.png' },
            { id: 'round2', src: 'img/fight/round2.png' },
            { id: 'round3', src: 'img/fight/round3.png' },
            { id: 'ko', src: 'img/fight/ko.png' },
            { id: 'result1', src: 'img/fight/result1.png' },
            { id: 'result2', src: 'img/fight/result2.png' },
            { id: 'result3', src: 'img/fight/result3.png' },
            { id: 'timeover', src: 'img/fight/timeover.png' },
            { id: 'dust', src: 'img/fight/dust.png' },
            { id: 'dash', src: 'img/fight/dash.png' },
            { id: 'projectile1', src: 'img/fight/projectile1.png' },

            // Fight Training
            { id: 'infinity', src: 'img/training/infinity.png' },
            { id: 'aBtn', src: 'img/training/a-button.png' },
            { id: 'bBtn', src: 'img/training/b-button.png' },
            { id: 'arrows', src: 'img/training/arrows.png' },
            { id: 'trainingNumbers', src: 'img/training/numbers.png' }
        ];
        
        this.images = new Object();
        this.imageDataList.forEach(imageData => {
            this.images[imageData.id] = new Image();
            this.images[imageData.id].src = imageData.src;
        });

        this.loadStep = 20 / Object.keys(this.images).length;
        this.loadPercent = 0;
    }

    load = () => Promise.all(Object.keys(this.images).map(key => new Promise(resolve => this.images[key].onload = () => {
        resolve();
        this.loadPercent += this.loadStep;
        document.getElementById("load").innerHTML = "LOADING: [" + "=".repeat(Math.round(this.loadPercent)) + "] " + (5 * Math.round(this.loadPercent)) + "%";
    })));
}