class Stage {
    pos = new Vector2D(0, 0);
    size = new Vector2D(960, 270 - 16);
}

class ChruchStage extends Stage {
    id = 0;
}
ChruchStage.id = 0;

class JungleStage extends Stage {
    id = 1;
}
JungleStage.id = 1;

class TrainingStage extends Stage {
    id = 2;
}
TrainingStage.id = 2;