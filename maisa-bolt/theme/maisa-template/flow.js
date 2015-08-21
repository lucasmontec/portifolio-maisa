var showGradient = true;

function gradient(val){
    showGradient = val;
}

$(document).ready(function() {
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){ //Web bg
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
                $('#back-gradient').css("opacity", 0.4+((Math.sin(T/40)+1)/4) );

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
    }else{
        setInterval(function(){ 
            //Mobile bg
             if(sessionStorage.currentPlate == 'trabalho' || !showGradient){
                $('#back-gradient').css("opacity", 0);
                //Remove main menu (filter) on job page
                $('#menu').css("display", "none");
            }else{
                $('#back-gradient').css("opacity", 0.2);
                //Restore menu
                $('#menu').css("display", "block");
            }
        }, 100);
    }
});