(function (){

    var exit = document.getElementById("exit");
    exit.onclick = function(){
        window.location.href = "https://www.facebook.com/Dev.MoeShawky";
    };
// get game mode selection and user name and send it through query string to the next page
     var start = document.getElementById("start").onclick =function(){
        var userchoice = document.getElementById("mode").options[document.getElementById("mode").selectedIndex].value;
        var username = document.getElementById("username").value;
        document.getElementById("secondpagelink").href = document.getElementById("secondpagelink").href 
        +"?mode="+ userchoice+"&name="+username;
     }
        
    //global variables
    window.exit = exit ;
    window.start = start;
}());

//calling functions
exit;
start;
