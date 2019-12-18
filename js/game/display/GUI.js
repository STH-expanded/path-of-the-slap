class GUI {
    constructor (){
        this.update =  (fight, cx, zoom)=>{
            cx.fillStyle = 'white';
            // x,y,w,h
            // TIMER 
            cx.fillRect(224*zoom, 8*zoom , 32*zoom, 32*zoom);
            cx.fillStyle = 'black';
            cx.font = 25*zoom+"px serif";
            cx.textAlign = "center";
            var timer =(fight.timer- (fight.timer % 60))/60;
            cx.fillText(timer.toString(),(cx.canvas.width/2), 33*zoom);
            
            // PV
            // P1
            cx.fillStyle = 'black';
            cx.fillRect(0, 0 ,64*zoom , 64*zoom);
            cx.fillStyle = 'white';
            cx.fillRect(64*zoom, 8*zoom , 160*zoom , 16*zoom);
            cx.fillStyle = 'orange';
            cx.fillRect(64*zoom+(160*zoom-(160*(fight.player1.character.health /fight.player1.character.maxHealth)*zoom)) , 8*zoom ,160*(fight.player1.character.health /fight.player1.character.maxHealth)*zoom , 16*zoom);
            cx.fillStyle = 'black';
            cx.font = 10*zoom+"px serif";
            cx.textAlign = "start";
            cx.fillText(fight.player1.character.name,64*zoom, 34*zoom);
            //P2    
            cx.fillStyle = 'black';
            cx.fillRect(cx.canvas.width-64*zoom, 0 , 64*zoom , 64*zoom);
            cx.fillStyle = 'white';
            cx.fillRect((224+32)*zoom, 8*zoom , 160*zoom , 16*zoom);
            cx.fillStyle = 'purple';
            cx.fillRect((224+32)*zoom, 8*zoom , 160*(fight.player1.character.health /fight.player1.character.maxHealth)*zoom  , 16*zoom);
            cx.fillStyle = 'black';
            cx.textAlign = "end";
            cx.font = 10*zoom+"px serif";
            cx.fillText(fight.player1.character.name,((cx.canvas.width*3)/4)+(cx.canvas.width/6), 35*zoom);
            fight.player1.character.health--
        }     
    }
}