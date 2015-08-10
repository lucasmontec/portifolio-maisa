
$(document).ready(function() {
    var T = 0;
    setInterval(function(){ 
        T++;
        
        if(sessionStorage.currentPlate == 'trabalho'){
            //Remove backgradient on job page
            var current = $('#back-gradient').css("opacity");
            //console.log(current);
            if(current > 0){
                $('#back-gradient').css("opacity", current-0.1);
            }
            
            //Remove main menu (filter) on job page
            current = $('#menu').css("opacity");
            if(current > 0){
                $('#menu').css("opacity", current-0.1);
            }
        }else{
            $('#back-gradient').css("opacity", 0.5+((Math.sin(T/40)+1)/4) );
            
            //Restore menu
            if($('#menu').css("opacity") < 1){
                $('#menu').css("opacity", 1);
            }
        }
        
        //Prevent
        if(T> 1000000){
            T=0;
        }
    }, 50);
    
});