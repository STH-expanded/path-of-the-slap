class Assets {
    images = new Object;
    imageDataList = [
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

        // Actor
        { id: 'ACTOR_00_IDLE', src: 'img/fight/ACTOR_00_IDLE.png' },
        { id: 'ACTOR_00_HIT', src: 'img/fight/ACTOR_00_HIT.png' },

        // Character
        { id: 'CHARACTER_00_NAME', src: 'img/character/CHARACTER_00_NAME.png' },
        { id: 'CHARACTER_00_PROFILE', src: 'img/character/CHARACTER_00_PROFILE.png' },
        { id: 'CHARACTER_00_PROFILE_SHADOW', src: 'img/character/CHARACTER_00_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_00_ACTIVE_PROFILE', src: 'img/character/CHARACTER_00_ACTIVE_PROFILE.png' },
        { id: 'CHARACTER_00_ACTIVE_PROFILE_SHADOW', src: 'img/character/CHARACTER_00_ACTIVE_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_00_MUGSHOT', src: 'img/character/CHARACTER_00_MUGSHOT.png' },
        { id: 'CHARACTER_00_SKEWED_NAME', src: 'img/character/CHARACTER_00_SKEWED_NAME.png' },
        { id: 'CHARACTER_00_IDLE', src: 'img/character/CHARACTER_00_IDLE.png' },
        { id: 'CHARACTER_00_WALK_FORWARD', src: 'img/character/CHARACTER_00_WALK_FORWARD.png' },
        { id: 'CHARACTER_00_WALK_BACK', src: 'img/character/CHARACTER_00_WALK_BACK.png' },
        { id: 'CHARACTER_00_FORWARD_DASH', src: 'img/character/CHARACTER_00_FORWARD_DASH.png' },
        { id: 'CHARACTER_00_LIGHT', src: 'img/character/CHARACTER_00_LIGHT.png' },
        { id: 'CHARACTER_00_HEAVY', src: 'img/character/CHARACTER_00_HEAVY.png' },
        { id: 'CHARACTER_00_CROUCH', src: 'img/character/CHARACTER_00_CROUCH.png' },
        { id: 'CHARACTER_00_LOW_LIGHT', src: 'img/character/CHARACTER_00_LOW_LIGHT.png' },
        { id: 'CHARACTER_00_LOW_HEAVY', src: 'img/character/CHARACTER_00_LOW_HEAVY.png' },
        { id: 'CHARACTER_00_JUMP', src: 'img/character/CHARACTER_00_JUMP.png' },
        { id: 'CHARACTER_00_AERIAL', src: 'img/character/CHARACTER_00_AERIAL.png' },
        { id: 'CHARACTER_00_FALL', src: 'img/character/CHARACTER_00_FALL.png' },
        { id: 'CHARACTER_00_HIT', src: 'img/character/CHARACTER_00_HIT.png' },
        { id: 'CHARACTER_00_AERIAL_LIGHT', src: 'img/character/CHARACTER_00_AERIAL_LIGHT.png' },
        { id: 'CHARACTER_00_AERIAL_HEAVY', src: 'img/character/CHARACTER_00_AERIAL_HEAVY.png' },
        { id: 'CHARACTER_00_QCF', src: 'img/character/CHARACTER_00_QCF.png' },
        { id: 'CHARACTER_00_INTRO', src: 'img/character/CHARACTER_00_INTRO.png' },
        { id: 'CHARACTER_00_BLOCK', src: 'img/character/CHARACTER_00_BLOCK.png' },
        { id: 'CHARACTER_00_AERIAL_BLOCK', src: 'img/character/CHARACTER_00_AERIAL_BLOCK.png' },
        { id: 'CHARACTER_00_LOW_BLOCK', src: 'img/character/CHARACTER_00_LOW_BLOCK.png' },
        { id: 'CHARACTER_00_GROUND', src: 'img/character/CHARACTER_00_GROUND.png' },
        { id: 'CHARACTER_00_GET_UP', src: 'img/character/CHARACTER_00_GET_UP.png' },
        { id: 'CHARACTER_00_WIN', src: 'img/character/CHARACTER_00_WIN.png' },
        { id: 'CHARACTER_00_WIN_WAITING', src: 'img/character/CHARACTER_00_WIN_WAITING.png' },
        { id: 'CHARACTER_00_GRAB', src: 'img/character/CHARACTER_00_GRAB.png' },
        { id: 'CHARACTER_00_FORWARD_THROW', src: 'img/character/CHARACTER_00_FORWARD_THROW.png' },
        { id: 'CHARACTER_00_BACK_THROW', src: 'img/character/CHARACTER_00_BACK_THROW.png' },
        { id: 'CHARACTER_00_DP', src: 'img/character/CHARACTER_00_DP.png' },
        { id: 'CHARACTER_00_HCF', src: 'img/character/CHARACTER_00_HCF.png' },

        { id: 'CHARACTER_01_NAME', src: 'img/character/CHARACTER_01_NAME.png' },
        { id: 'CHARACTER_01_PROFILE', src: 'img/character/CHARACTER_01_PROFILE.png' },
        { id: 'CHARACTER_01_PROFILE_SHADOW', src: 'img/character/CHARACTER_01_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_01_ACTIVE_PROFILE', src: 'img/character/CHARACTER_01_ACTIVE_PROFILE.png' },
        { id: 'CHARACTER_01_ACTIVE_PROFILE_SHADOW', src: 'img/character/CHARACTER_01_ACTIVE_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_01_MUGSHOT', src: 'img/character/CHARACTER_01_MUGSHOT.png' },
        { id: 'CHARACTER_01_SKEWED_NAME', src: 'img/character/CHARACTER_01_SKEWED_NAME.png' },

        { id: 'CHARACTER_02_NAME', src: 'img/character/CHARACTER_02_NAME.png' },
        { id: 'CHARACTER_02_PROFILE', src: 'img/character/CHARACTER_02_PROFILE.png' },
        { id: 'CHARACTER_02_PROFILE_SHADOW', src: 'img/character/CHARACTER_02_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_02_ACTIVE_PROFILE', src: 'img/character/CHARACTER_02_ACTIVE_PROFILE.png' },
        { id: 'CHARACTER_02_ACTIVE_PROFILE_SHADOW', src: 'img/character/CHARACTER_02_ACTIVE_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_02_MUGSHOT', src: 'img/character/CHARACTER_02_MUGSHOT.png' },
        { id: 'CHARACTER_02_SKEWED_NAME', src: 'img/character/CHARACTER_02_SKEWED_NAME.png' },
        { id: 'CHARACTER_02_IDLE', src: 'img/character/CHARACTER_02_IDLE.png' },
        { id: 'CHARACTER_02_CROUCH', src: 'img/character/CHARACTER_02_CROUCH.png' },
        { id: 'CHARACTER_02_LOW_LIGHT', src: 'img/character/CHARACTER_02_LOW_LIGHT.png' },
        { id: 'CHARACTER_02_LOW_HEAVY', src: 'img/character/CHARACTER_02_LOW_HEAVY.png' },
        { id: 'CHARACTER_02_WALK_FORWARD', src: 'img/character/CHARACTER_02_WALK_FORWARD.png' },
        { id: 'CHARACTER_02_WALK_BACK', src: 'img/character/CHARACTER_02_WALK_BACK.png' },
        { id: 'CHARACTER_02_FORWARD_DASH', src: 'img/character/CHARACTER_02_FORWARD_DASH.png' },
        { id: 'CHARACTER_02_LIGHT', src: 'img/character/CHARACTER_02_LIGHT.png' },
        { id: 'CHARACTER_02_HEAVY', src: 'img/character/CHARACTER_02_HEAVY.png' },
        { id: 'CHARACTER_02_BACK_DASH', src: 'img/character/CHARACTER_02_BACK_DASH.png' },
        { id: 'CHARACTER_02_JUMP', src: 'img/character/CHARACTER_02_JUMP.png' },
        { id: 'CHARACTER_02_AERIAL', src: 'img/character/CHARACTER_02_AERIAL.png' },
        { id: 'CHARACTER_02_FALL', src: 'img/character/CHARACTER_02_FALL.png' },
        { id: 'CHARACTER_02_HIT', src: 'img/character/CHARACTER_02_HIT.png' },
        { id: 'CHARACTER_02_AERIAL_LIGHT', src: 'img/character/CHARACTER_02_AERIAL_LIGHT.png' },
        { id: 'CHARACTER_02_AERIAL_HEAVY', src: 'img/character/CHARACTER_02_AERIAL_HEAVY.png' },
        { id: 'CHARACTER_02_QCF', src: 'img/character/CHARACTER_02_QCF.png' },
        { id: 'CHARACTER_02_INTRO', src: 'img/character/CHARACTER_02_INTRO.png' },
        { id: 'CHARACTER_02_BLOCK', src: 'img/character/CHARACTER_02_BLOCK.png' },
        { id: 'CHARACTER_02_AERIAL_BLOCK', src: 'img/character/CHARACTER_02_AERIAL_BLOCK.png' },
        { id: 'CHARACTER_02_LOW_BLOCK', src: 'img/character/CHARACTER_02_LOW_BLOCK.png' },
        { id: 'CHARACTER_02_GROUND', src: 'img/character/CHARACTER_02_GROUND.png' },
        { id: 'CHARACTER_02_GET_UP', src: 'img/character/CHARACTER_02_GET_UP.png' },
        { id: 'CHARACTER_02_GRAB', src: 'img/character/CHARACTER_02_GRAB.png' },
        { id: 'CHARACTER_02_FORWARD_THROW', src: 'img/character/CHARACTER_02_FORWARD_THROW.png' },
        { id: 'CHARACTER_02_BACK_THROW', src: 'img/character/CHARACTER_02_BACK_THROW.png' },
        { id: 'CHARACTER_02_DP', src: 'img/character/CHARACTER_02_DP.png' },
        { id: 'CHARACTER_02_HCF', src: 'img/character/CHARACTER_02_HCF.png' },

        { id: 'CHARACTER_03_NAME', src: 'img/character/CHARACTER_03_NAME.png' },
        { id: 'CHARACTER_03_PROFILE', src: 'img/character/CHARACTER_03_PROFILE.png' },
        { id: 'CHARACTER_03_PROFILE_SHADOW', src: 'img/character/CHARACTER_03_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_03_ACTIVE_PROFILE', src: 'img/character/CHARACTER_03_ACTIVE_PROFILE.png' },
        { id: 'CHARACTER_03_ACTIVE_PROFILE_SHADOW', src: 'img/character/CHARACTER_03_ACTIVE_PROFILE_SHADOW.png' },
        { id: 'CHARACTER_03_MUGSHOT', src: 'img/character/CHARACTER_03_MUGSHOT.png' },
        { id: 'CHARACTER_03_SKEWED_NAME', src: 'img/character/CHARACTER_03_SKEWED_NAME.png' },
        { id: 'CHARACTER_03_IDLE', src: 'img/character/CHARACTER_03_IDLE.png' },
        { id: 'CHARACTER_03_WALK_FORWARD', src: 'img/character/CHARACTER_03_WALK_FORWARD.png' },
        { id: 'CHARACTER_03_WALK_BACK', src: 'img/character/CHARACTER_03_WALK_BACK.png' },
        { id: 'CHARACTER_03_FORWARD_DASH', src: 'img/character/CHARACTER_03_FORWARD_DASH.png' },
        { id: 'CHARACTER_03_BACK_DASH', src: 'img/character/CHARACTER_03_BACK_DASH.png' },
        { id: 'CHARACTER_03_CROUCH', src: 'img/character/CHARACTER_03_CROUCH.png' },
        { id: 'CHARACTER_03_JUMP', src: 'img/character/CHARACTER_03_JUMP.png' },
        { id: 'CHARACTER_03_AERIAL', src: 'img/character/CHARACTER_03_AERIAL.png' },
        { id: 'CHARACTER_03_FALL', src: 'img/character/CHARACTER_03_FALL.png' },
        { id: 'CHARACTER_03_HIT', src: 'img/character/CHARACTER_03_HIT.png' },
        { id: 'CHARACTER_03_BLOCK', src: 'img/character/CHARACTER_03_BLOCK.png' },
        { id: 'CHARACTER_03_AERIAL_BLOCK', src: 'img/character/CHARACTER_03_AERIAL_BLOCK.png' },
        { id: 'CHARACTER_03_LOW_BLOCK', src: 'img/character/CHARACTER_03_LOW_BLOCK.png' },
        { id: 'CHARACTER_03_GROUND', src: 'img/character/CHARACTER_03_GROUND.png' },
        { id: 'CHARACTER_03_GET_UP', src: 'img/character/CHARACTER_03_GET_UP.png' },
        { id: 'CHARACTER_03_WIN', src: 'img/character/CHARACTER_03_WIN.png' },
        { id: 'CHARACTER_03_WIN_WAITING', src: 'img/character/CHARACTER_03_WIN_WAITING.png' },

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

        { id: 's3floor', src: 'img/stage/s3floor.png' },
        { id: 's3l0', src: 'img/stage/s3l0.png' },
        { id: 's3l1', src: 'img/stage/s3l1.png' },
        { id: 's3preview', src: 'img/stage/s3preview.png' },

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
        { id: 'DUST', src: 'img/fight/dust.png' },
        { id: 'DASH', src: 'img/fight/dash.png' },
        { id: 'SLASHUP', src: 'img/fight/slashup.png' },
        { id: 'HIT', src: 'img/fight/hit.png' },
        { id: 'SLASH', src: 'img/fight/slash.png' },

        // Fight Training
        { id: 'infinity', src: 'img/training/infinity.png' },
        { id: 'aBtn', src: 'img/training/a-button.png' },
        { id: 'bBtn', src: 'img/training/b-button.png' },
        { id: 'arrows', src: 'img/training/arrows.png' },
        { id: 'trainingNumbers', src: 'img/training/numbers.png' }
    ];

    sounds = new Object;
    soundDataList = [
        // Opening
        { id: 'coin', url: 'audio/smw_coin.wav' },

        // Menu
        { id: 'mainMenu', url: 'audio/main-menu.mp3' },
        { id: 'select', url: 'audio/select.wav' },
        { id: 'ok', url: 'audio/ok.mp3' },
        { id: 'return', url: 'audio/return.wav' },
        { id: 'se1', url: 'audio/se1.mp3' },
        { id: 'se14', url: 'audio/se14.mp3' },

        // Character Selection
        { id: 'charSelect', url: 'audio/char-select.mp3' },

        // Fight
        { id: 'fightIntro', url: 'audio/fight-intro.wav' },
        { id: 'fight', url: 'audio/fight.mp3' },

        // Character
        { id: 'CHARACTER_02_HIT', url: 'audio/CHARACTER_02_HIT.mp3' },
        { id: 'CHARACTER_00_HIT', url: 'audio/coupSling.mp3' },
        { id: 'CHARACTER_00_ACTIVE_PROFILE', url: "audio/CHARACTER_00_ACTIVE_PROFILE.mp3" },
        { id: 'CHARACTER_02_ACTIVE_PROFILE', url: "audio/CHARACTER_02_ACTIVE_PROFILE.mp3" }
    ];

    loadPercent = 0;

    constructor() {
        this.imageDataList.forEach(imageData => {
            this.images[imageData.id] = new Image;
            this.images[imageData.id].src = imageData.src;
        });

        this.soundDataList.forEach(soundData => {
            this.sounds[soundData.id] = new Audio(soundData.url);
        });

        this.loadStep = 20 / (Object.keys(this.images).length + Object.keys(this.sounds).length);
    }

    load = () => Promise.all([
        ...Object.keys(this.images).map(key => new Promise(resolve => this.images[key].onload = () => {
            resolve();
            this.loadPercent += this.loadStep;
            const percent = "... " + (5 * Math.round(this.loadPercent)) + "%";
            if (document.getElementById("load")) document.getElementById("load").innerHTML = "LOADING" + (percent !== "... 100%" ? percent : " COMPLETE");
        })),
        ...Object.keys(this.sounds).map(key => new Promise(resolve => this.sounds[key].oncanplaythrough = () => {
            resolve();
            this.loadPercent += this.loadStep;
            const percent = "... " + (5 * Math.round(this.loadPercent)) + "%";
            if (document.getElementById("load")) document.getElementById("load").innerHTML = "LOADING" + (percent !== "... 100%" ? percent : " COMPLETE");
        }))
    ]);
}