class Online extends Player {
    game;
   lastInputs = {}

   constructor(game){
        super(game)
        game.socket.on('updatePlayer', (playerinfos) => {
            this.lastInputs = playerinfos.inputs
        });
   }
    getInput = activity => {
        return this.lastInputs;
         
    }
}



 