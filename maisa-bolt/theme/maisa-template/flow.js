
$(document).ready(function() {
    var T = 0;
    setInterval(function(){ 
        T++;
        
        if(sessionStorage.currentPlate == 'trabalho'){
            var current = $('#back-gradient').css("opacity");
            //console.log(current);
            if(current > 0){
                $('#back-gradient').css("opacity", current-0.1);
            }
        }else{
            $('#back-gradient').css("opacity", 0.5+((Math.sin(T/40)+1)/4) );
        }
        
        //Prevent
        if(T> 1000000){
            T=0;
        }
    }, 50);
    
});