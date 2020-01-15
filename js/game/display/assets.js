class Assets {
    constructor() {
        // Opening
        this.openingImg = document.createElement('img');
        this.openingImg.src = 'img/opening.png';

        // Menu
        this.titleScreen = document.createElement('img');
        this.titleScreen.src = 'img/menu/titleScreen.png';
        this.menucursor = document.createElement('img');
        this.menucursor.src = 'img/menu/menucursor.png';
        this.btnPlayerDisabled = document.createElement('img');
        this.btnPlayerDisabled.src = 'img/menu/btnvsplayerdisabled.png';
        this.btnPlayer = document.createElement('img');
        this.btnPlayer.src = 'img/menu/btnvsplayer.png';
        this.btnComputer = document.createElement('img');
        this.btnComputer.src = 'img/menu/btnvscomputer.png';
        this.btnTraining = document.createElement('img');
        this.btnTraining.src = 'img/menu/btntraining.png';
        this.btnRematch = document.createElement('img');
        this.btnRematch.src = 'img/menu/btnrematch.png';
        this.btnResume = document.createElement('img');
        this.btnResume.src = 'img/menu/btnresume.png';
        this.btnMainMenu = document.createElement('img');
        this.btnMainMenu.src = 'img/menu/btnreturntomenu.png';
        this.btnCharacterSelection = document.createElement('img');
        this.btnCharacterSelection.src = 'img/menu/btncharacterselection.png';

        // Character
        this.ci00 = document.createElement('img');
        this.ci00.src = 'img/character/ci00.png';
        this.cp00 = document.createElement('img');
        this.cp00.src = 'img/character/cp00.png';
        this.cp00shadow = document.createElement('img');
        this.cp00shadow.src = 'img/character/cp00shadow.png';
        this.cp00active = document.createElement('img');
        this.cp00active.src = 'img/character/cp00active.png';
        this.cp00activeShadow = document.createElement('img');
        this.cp00activeShadow.src = 'img/character/cp00activeShadow.png';
        this.cm00 = document.createElement('img');
        this.cm00.src = 'img/character/cm00.png';
        this.cn00 = document.createElement('img');
        this.cn00.src = 'img/character/cn00.png';

        this.ci01 = document.createElement('img');
        this.ci01.src = 'img/character/ci01.png';
        this.cp01 = document.createElement('img');
        this.cp01.src = 'img/character/cp01.png';
        this.cp01shadow = document.createElement('img');
        this.cp01shadow.src = 'img/character/cp01shadow.png';
        this.cp01active = document.createElement('img');
        this.cp01active.src = 'img/character/cp01active.png';
        this.cp01activeShadow = document.createElement('img');
        this.cp01activeShadow.src = 'img/character/cp01activeShadow.png';
        this.cm01 = document.createElement('img');
        this.cm01.src = 'img/character/cm01.png';
        this.cn01 = document.createElement('img');
        this.cn01.src = 'img/character/cn01.png';

        // Character Selection
        this.characterSelect = document.createElement('img');
        this.characterSelect.src = 'img/characterSelect/characterSelect.png';
        this.stageSelect = document.createElement('img');
        this.stageSelect.src = 'img/characterSelect/stageSelect.png';
        this.stageSelectCursor = document.createElement('img');
        this.stageSelectCursor.src = 'img/characterSelect/stageCursor.png';
        this.characterSelectBackBlue = document.createElement('img');
        this.characterSelectBackBlue.src = 'img/characterSelect/characterSelectBackBlue.png';
        this.characterSelectBackRed = document.createElement('img');
        this.characterSelectBackRed.src = 'img/characterSelect/characterSelectBackRed.png';
        this.characterSelectP1 = document.createElement('img');
        this.characterSelectP1.src = 'img/characterSelect/charSelectCursorP1.png';
        this.characterSelectP2 = document.createElement('img');
        this.characterSelectP2.src = 'img/characterSelect/charSelectCursorP2.png';
        this.characterSelectInfo = document.createElement('img');
        this.characterSelectInfo.src = 'img/characterSelect/characterSelectInfo.png';
        this.characterSelectInfo2 = document.createElement('img');
        this.characterSelectInfo2.src = 'img/characterSelect/characterSelectInfo2.png';
        this.characterSelectInfo3 = document.createElement('img');
        this.characterSelectInfo3.src = 'img/characterSelect/characterSelectInfo3.png';
        this.whiteMugshot = document.createElement('img');
        this.whiteMugshot.src = 'img/characterSelect/mugshot.png';
        this.characterSelectKeyboard = document.createElement('img');
        this.characterSelectKeyboard.src = 'img/characterSelect/keyboard.png';
        this.characterSelectGamepad = document.createElement('img');
        this.characterSelectGamepad.src = 'img/characterSelect/gamepad.png';

        // Stage
        this.s0floor = document.createElement('img');
        this.s0floor.src = 'img/stage/s0floor.png';
        this.s0l0 = document.createElement('img');
        this.s0l0.src = 'img/stage/s0l0.png';
        this.s0l1 = document.createElement('img');
        this.s0l1.src = 'img/stage/s0l1.png';
        this.s0l2 = document.createElement('img');
        this.s0l2.src = 'img/stage/s0l2.png';
        this.s0l3 = document.createElement('img');
        this.s0l3.src = 'img/stage/s0l3.png';
        this.s0preview = document.createElement('img');
        this.s0preview.src = 'img/stage/s0preview.png';

        this.s1floor = document.createElement('img');
        this.s1floor.src = 'img/stage/s1floor.png';
        this.s1l0 = document.createElement('img');
        this.s1l0.src = 'img/stage/s1l0.png';
        this.s1l1 = document.createElement('img');
        this.s1l1.src = 'img/stage/s1l1.png';
        this.s1l2 = document.createElement('img');
        this.s1l2.src = 'img/stage/s1l2.png';
        this.s1preview = document.createElement('img');
        this.s1preview.src = 'img/stage/s1preview.png';

        this.s2floor = document.createElement('img');
        this.s2floor.src = 'img/stage/s2floor.png';
        this.s2l1 = document.createElement('img');
        this.s2l1.src = 'img/stage/s2l1.png';
        this.s2preview = document.createElement('img');
        this.s2preview.src = 'img/stage/s2preview.png';

        // Fight
        this.hudmugshot = document.createElement('img');
        this.hudmugshot.src = 'img/fight/hudMugshot.png';
        this.hudlife = document.createElement('img');
        this.hudlife.src = 'img/fight/hudLife.png';
        this.scoreImg = document.createElement('img');
        this.scoreImg.src = 'img/fight/score.png';
        this.winScore = document.createElement('img');
        this.winScore.src = 'img/fight/winScore.png';
        this.timerNumbers = document.createElement('img');
        this.timerNumbers.src = 'img/fight/numbers2.png';
        this.fightTitle = document.createElement('img');
        this.fightTitle.src = 'img/fight/fight.png';
        this.victory = document.createElement('img');
        this.victory.src = 'img/fight/Victory.png';

        // Fight Training
        this.infinity = document.createElement('img');
        this.infinity.src = 'img/training/infinity.png';
        this.aBtn = document.createElement('img');
        this.aBtn.src = 'img/training/a-button.png';
        this.bBtn = document.createElement('img');
        this.bBtn.src = 'img/training/b-button.png';
        this.arrows = document.createElement('img');
        this.arrows.src = 'img/training/arrows.png';
        this.trainingNumbers = document.createElement('img');
        this.trainingNumbers.src = 'img/training/numbers.png';
    }
}