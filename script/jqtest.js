/// <reference path="../typings/globals/jquery/index.d.ts" />

$(document).ready(function(){

    $("#contents").hide();
    $("#username").focus();
    $("#username").attr("autocomplete","off");
    $("#username").keypress(function(e){
        if( e.which === 13 ) {
            if (!$(this).val()) {
                 alert("Please enter your name :) ");
            } else {
                $("#contents").fadeIn(1000);
            }
      }
    });

    $("#pause").click(function(){
        // code to pause game
        // $("#container").stop();
    });

    
});