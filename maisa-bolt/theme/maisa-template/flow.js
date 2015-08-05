
$(document).ready(function() {
    var T = 0;
    setInterval(function(){ 
        T++;
        $('#back-gradient').css("opacity", 0.5+((Math.sin(T/40)+1)/4) );
        /*console.log(0.5+((Math.sin(T/40)+1)/4) );*/
    }, 50);
    
});