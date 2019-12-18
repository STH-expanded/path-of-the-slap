class GUI {
    constructor (){
        this.update =  (fight, cx, zoom)=>{
            cx.fillStyle = 'white';
            // x,y,w,h
            // TIMER 
            cx.fillRect((cx.canvas.width/2)-20*zoom, 5*zoom , 40*zoom, 40*zoom);
            cx.fillStyle = 'black';
            cx.font = 25*zoom+"px serif";
            cx.textAlign = "center";
            var timer =(fight.timer- (fight.timer % 60))/60;
            cx.fillText(timer.toString(),(cx.canvas.width/2), 32*zoom);
            
            // PV
            // P1
            cx.fillStyle = 'black';
            cx.fillRect(10, 5 ,20*zoom , 20*zoom);
            cx.fillStyle = 'white';
            cx.fillRect((cx.canvas.width/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3) , 20*zoom);
            cx.fillStyle = 'orange';
            cx.fillRect(((cx.canvas.width/4)-(cx.canvas.width/6))+((cx.canvas.width/3)-((cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth))) , 5 , (cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth) , 20*zoom);
            cx.fillStyle = 'black';
            cx.font = 10*zoom+"px serif";
            cx.textAlign = "start";
            cx.fillText(fight.player1.character.name,(cx.canvas.width/4)-(cx.canvas.width/6), 35*zoom);
            //P2    
            cx.fillStyle = 'black';
            cx.fillRect(cx.canvas.width-30*zoom, 5 , 20*zoom , 20*zoom);
            cx.fillStyle = 'white';
            cx.fillRect(((cx.canvas.width*3)/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3) , 20*zoom);
            cx.fillStyle = 'purple';
            cx.fillRect(((cx.canvas.width*3)/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth)  , 20*zoom);
            cx.fillStyle = 'black';
            cx.textAlign = "end";
            cx.font = 10*zoom+"px serif";
            cx.fillText(fight.player1.character.name,((cx.canvas.width*3)/4)+(cx.canvas.width/6), 35*zoom);
        }     
    }
}