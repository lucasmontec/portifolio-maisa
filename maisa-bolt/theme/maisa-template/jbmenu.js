
function jbmenuCenter(){
    sessionStorage.currentPlate = sessionStorage.lastPlate;
    fetchState();
}

function go(link){
    if(link.length > 0){
        sessionStorage.currentPlate = "trabalho";
        sessionStorage.trabalho = link;
        fetchState();
    }
}