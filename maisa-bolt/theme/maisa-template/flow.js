var showGradient = true;

function gradient(val){
    showGradient = val;
}

$(document).ready(function() {
    var T = 0;
    setInterval(function(){ 
        T++;
        var current;
        
        if(sessionStorage.currentPlate == 'trabalho' || !showGradient){
            //Remove backgradient on job page
            current = $('#back-gradient').css("opacity");
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
            //current = $('#menu').css("opacity");
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