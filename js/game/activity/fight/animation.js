class Animation {
    constructor( pos,size,speed,frameCount,direction,assetId,indexCount) {
        this.pos = pos;
        this.size = size;
        this.speed =speed 
        this.frameCount = frameCount
        this.assetId = assetId
        this.indexCount = indexCount
        this.direction = direction
    }


    update = game => {
        this.indexCount-- 
    }
}