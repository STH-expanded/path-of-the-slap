class Assets {
    constructor() {
        
        // Menu
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
        this.btnMainMenu = document.createElement('img');
        this.btnMainMenu.src = 'img/menu/btnreturntomenu.png';
        this.btnCharacterSelection = document.createElement('img');
        this.btnCharacterSelection.src = 'img/menu/btncharacterselection.png';

        // Character
        this.cp00 = document.createElement('img');
        this.cp00.src = 'img/character/cp00.png';
        this.cm00 = document.createElement('img');
        this.cm00.src = 'img/character/cm00.png';
        this.cp01 = document.createElement('img');
        this.cp01.src = 'img/character/cp01.png';
        this.cm01 = document.createElement('img');
        this.cm01.src = 'img/character/cm01.png';

        // Character Selection
        this.characterSelect = document.createElement('img');
        this.characterSelect.src = 'img/characterSelect/characterSelect.png';
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

        // Stage
        this.layer0 = document.createElement('img');
        this.layer0.src = 'img/stage/layer0.png';
        this.layer1 = document.createElement('img');
        this.layer1.src = 'img/stage/layer1.png';
        this.layer2 = document.createElement('img');
        this.layer2.src = 'img/stage/layer2.png';
        this.layer3 = document.createElement('img');
        this.layer3.src = 'img/stage/layer3.png';

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
    }
}