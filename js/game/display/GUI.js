class GUI {
    constructor (){
        this.update =  (fight, context)=>{
            context.cx.fillStyle = 'white';
            context.cx.strokeStyle = "white";
            // x,y,w,h
            // TIMER 
            context.cx.strokeRect(224* context.zoom, 8* context.zoom , 32* context.zoom, 32* context.zoom);
            context.cx.font = 25* context.zoom+"px serif";
            context.cx.fillStyle = 'white';
            context.cx.textAlign = "center";
            var timer =(fight.timer- (fight.timer % 60))/60;
            context.cx.fillText(timer.toString(),( context.cx.canvas.width/2), 33* context.zoom);
            
            // PV
            // P1
             context.cx.fillStyle = 'black';
             context.cx.drawImage(context.hudmugshot,0, 0 ,64* context.zoom , 64* context.zoom);
            //  context.cx.fillStyle = 'white';
            //  context.cx.fillRect(64* context.zoom, 8* context.zoom , 160* context.zoom , 16* context.zoom);
            //  context.cx.fillStyle = 'orange';
             context.cx.drawImage(context.hudlife,64* context.zoom+(160* context.zoom-(160*(fight.player1.character.health /fight.player1.character.maxHealth)* context.zoom)) , 8* context.zoom ,160*(fight.player1.character.health /fight.player1.character.maxHealth)* context.zoom , 16* context.zoom);
             context.cx.fillStyle = 'black';
             context.cx.font = 10* context.zoom+"px serif";
             context.cx.textAlign = "start";
             context.cx.fillText(fight.player1.character.name,64* context.zoom, 34* context.zoom);
            //P2    
             context.cx.fillStyle = 'black ';
             context.cx.drawImage(context.hudmugshot, context.cx.canvas.width-64* context.zoom, 0 , 64* context.zoom , 64* context.zoom);
            //  context.cx.fillStyle = 'white';
            //  context.cx.fillRect((224+32)* context.zoom, 8* context.zoom , 160* context.zoom , 16* context.zoom);
            //  context.cx.fillStyle = 'purple';
             context.cx.drawImage(context.hudlife,(224+32)* context.zoom, 8* context.zoom , 160*(fight.player1.character.health /fight.player1.character.maxHealth)* context.zoom  , 16* context.zoom);
             context.cx.fillStyle = 'black';
             context.cx.textAlign = "end";
             context.cx.font = 10* context.zoom+"px serif";
             context.cx.fillText(fight.player1.character.name,(context.cx.canvas.width-64)*context.zoom, 34* context.zoom);
        }     
    }
}