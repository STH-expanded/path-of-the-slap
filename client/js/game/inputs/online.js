class Online extends Player {
   

    getInput = activity => {
        const arrayinp=[{
            down: true
        },{}] 

        return arrayinp[Math.round(Math.random())]
         
    }
}



 