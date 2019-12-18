class GUI {
    constructor (){
        this.update =  (fight, cx, zoom)=>{
            cx.fillStyle = 'white';
            // x,y,w,h
            // TIMER
            cx.fillRect((cx.canvas.width/2)-50, 5 , 100, 100);
            cx.fillStyle = 'black';
            cx.font = "55px serif";
            cx.textAlign = "center";
            var timer =(fight.timer- (fight.timer % 60))/60;
            cx.fillText(timer.toString(),(cx.canvas.width/2), 70);
            
            // PV
            // P1
            cx.fillStyle = 'black';
            cx.fillRect(10, 5 ,50 , 50);
            cx.fillStyle = 'white';
            cx.fillRect((cx.canvas.width/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3) , 45);
            cx.fillStyle = 'orange';
            cx.fillRect(((cx.canvas.width/4)-(cx.canvas.width/6))+((cx.canvas.width/3)-((cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth))) , 5 , (cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth) , 45);
            cx.fillStyle = 'black';
            cx.font = "18px serif";
            cx.textAlign = "start";
            cx.fillText(fight.player1.character.name,(cx.canvas.width/4)-(cx.canvas.width/6), 70);
            //P2    
            cx.fillStyle = 'black';
            cx.fillRect(cx.canvas.width-60, 5 , 50 , 50);
            cx.fillStyle = 'white';
            cx.fillRect(((cx.canvas.width*3)/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3) , 45);
            cx.fillStyle = 'purple';
            cx.textAlign = "end";
            cx.fillRect(((cx.canvas.width*3)/4)-(cx.canvas.width/6), 5 , (cx.canvas.width/3)*(fight.player1.character.health /fight.player1.character.maxHealth)  , 45);
            cx.fillText(fight.player1.character.name,((cx.canvas.width*3)/4)+(cx.canvas.width/6), 70);
        }     
    }
}