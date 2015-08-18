"use strict";
// Code
var wall = undefined;

//Calculate cell height
var w_width = 0;
var w_height = 0;
var w_bestCellH = 42;
var sz_tolerance = 250;
var cellHForBrowserSize = [
    {sizew: 1903 , sizeh: 979, cellH: 42},
    {sizew: 1903 , sizeh: 1080, cellH: 42},
    {sizew: 1869 , sizeh: 899, cellH: 20},
    {sizew: 1263 , sizeh: 800, cellH: 20},
    {sizew: 1263 , sizeh: 619, cellH: 20},
    {sizew: 1349 , sizeh: 768, cellH: 42},
    {sizew: 1263 , sizeh: 1024, cellH: 20},
    {sizew: 1423 , sizeh: 900, cellH: 15},
    {sizew: 1583 , sizeh: 900, cellH: 42},
    {sizew: 1663 , sizeh: 1050, cellH: 42},
    {sizew: 1903 , sizeh: 1200, cellH: 42},
    {sizew: 2543 , sizeh: 1440, cellH: 20},
    {sizew: 1148 , sizeh: 415, cellH: 20}
];

function inRange(val, min, max){
    return val >= min && val <= max
}

function toleranceRange(val, near, tolerance){
    return inRange(val, near-tolerance, near+tolerance)
}

function getByValue(arr, ww, wh) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {
        if (
            toleranceRange(arr[i].sizew,ww,sz_tolerance)
            &&
            toleranceRange(arr[i].sizeh,wh,sz_tolerance)
           )
        return arr[i];
    }
}

function calcCellH() {
    w_width = $(window).width();
    w_height = $(window).height();
    var found = getByValue(cellHForBrowserSize, w_width, w_height);
    if (found !== undefined) {
        //console.log(found)
        w_bestCellH = found.cellH;
    }else{
        if(w_width > 1100){
            w_bestCellH = 42;
        }else{
            w_bestCellH = 20; 
        }
    }
    //console.log("screen: "+w_width+" "+w_height+" using cell h: "+w_bestCellH);
}

function buildWall(){

    wall = new freewall("#freewall");

	wall.reset({
		selector: '.brick',
        animate: false,
		cellW: function(width) {
            var cellWidth = 0;
            if ( width > 1100 ) {
                cellWidth = width / 6;
            }else{
                cellWidth = width / 3;
            }
            return cellWidth - 20;
        },
		cellH: w_bestCellH,
		fixSize: null,
		gutterX: 12,
		gutterY: 12,
		onResize: function() {
            wall.fitZone();
		}
    });
    
    $(window).trigger("resize");
    
    makeJobsClickable();
}

function makeJobsClickable(){
    $( ".trab" ).click(
        function(){
            sessionStorage.lastPlate = sessionStorage.currentPlate;
            sessionStorage.currentPlate = 'trabalho';
            sessionStorage.trabalho = $(this).data("ajax-link");
            fetchState();
        }
    );
}

//Store mode
function beginState(){
    if(sessionStorage.currentPlate == undefined){
        sessionStorage.currentPlate = 'all';
        sessionStorage.lastPlate = 'all';
    }
}

function fetchState(){
    $( "#insert" ).hide();
    
    if(sessionStorage.currentPlate == 'all'){
        $.get( location.href+"trabalhos", { filter: "all" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn();
            }, 70);
        });
    }
    if(sessionStorage.currentPlate == 'ilustra'){
        $.get( location.href+"trabalhos", { filter: "ilustra" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn();
            }, 70);
        });
    }
    if(sessionStorage.currentPlate == 'design'){
        $.get( location.href+"trabalhos", { filter: "design" }, function( data ) {
            $( "#insert" ).html( data );
            setTimeout(function(){
                buildWall();
            }, 5);
            setTimeout(function(){
                $( "#insert" ).fadeIn();
            }, 70);
        });
    }
    
    if(sessionStorage.currentPlate == 'trabalho'){
        $.get(sessionStorage.trabalho,
            function( data ) {
                $( "#insert" ).html( data );
                setTimeout(function(){
                    $( "#insert" ).fadeIn("slow","swing");
                }, 70);
            }
        );
    }
}

function changeClass(element, classa, classb){
    element.removeClass(classa).addClass(classb);
}

//Build the wall
$(document).ready(function() {
    //$("body").css("overflow", "hidden");
    
    calcCellH();
        
    buildWall();
    
    beginState();
    fetchState();
    
    /*$(window).bind('resize', function(e)
    {
      if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(function()
      {
        this.location.reload(false);
        //buildWall();
      }, 50);
    });*/
    
    $("#filter-all,#name").click(
        function(){
            sessionStorage.currentPlate = 'all';
            fetchState();
            changeClass($("#filter-design-i"),"menu-design-v", "menu-design");
            changeClass($("#filter-art-i"),"menu-ilustra-v", "menu-ilustra");
            changeClass($("#filter-all-i"),"menu-circulo-v", "menu-circulo");
        }
    );
    
    $("#filter-art").click(
        function(){
            sessionStorage.currentPlate = 'ilustra';
            fetchState();
            changeClass($("#filter-all-i"),"menu-circulo", "menu-circulo-v");
            changeClass($("#filter-design-i"),"menu-design", "menu-design-v");
            changeClass($("#filter-art-i"),"menu-ilustra-v", "menu-ilustra");
        }
    );

    $("#filter-design").click(
        function(){
            sessionStorage.currentPlate = 'design';
            fetchState();
            changeClass($("#filter-all-i"),"menu-circulo", "menu-circulo-v");
            changeClass($("#filter-art-i"),"menu-ilustra", "menu-ilustra-v");
            changeClass($("#filter-design-i"),"menu-design-v", "menu-design");
        }
    );
    
    
    //Hover for top menu
    $( "#filter-art-t" ).hide();
    $( "#filter-design-t" ).hide();
    $("#filter-art").hover(
        function (){
            $( "#filter-art-i" ).hide();
            $( "#filter-art-t" ).show();
        }
    ,
        function (){
            $( "#filter-art-i" ).show();
            $( "#filter-art-t" ).hide();
        }
    );
    
    $("#filter-design").hover(
        function (){
            $( "#filter-design-i" ).hide();
            $( "#filter-design-t" ).show();
        }
    ,
        function (){
            $( "#filter-design-i" ).show();
            $( "#filter-design-t" ).hide();
        }
    );
});


$(function() {
    var $window = $(window);
    var width = $window.width();
    var height = $window.height();

    setInterval(function () {
        if ((width != $window.width()) || (height != $window.height())) {
            width = $window.width();
            height = $window.height();

            if(sessionStorage.currentPlate != 'trabalho'){
                if (window.RT){
                }else{
                    window.RT = setTimeout(function(){
                        calcCellH();
                        fetchState();
                        clearTimeout(window.RT);
                        window.RT = undefined;
                    }, 1000);
                }
            }
            //console.log("resize");
        }
    }, 300);
});


