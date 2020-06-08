(function (){

    //second page code
    var playing = true;
    var eggtype = 1; // initialize eggcolor in normal mode to white egg
    var objImage= document.getElementById("eggboxpic");
    var url = new URLSearchParams(window.location.search); ////API to read url param
    var counter = 0 , lifecounter = 3; //initialize score and lives
    var username = url.get('name');
    var minutetimer = document.getElementById("minutetime");
    var secondtimer = document.getElementById("secondtime");
    var chickensound  = new sound("../sound/Clucking-chicken.mp3");
    var gamesound ;

    //initial egg basket at the center and welcome msg
    var begine = function init(){				
        objImage.style.position='absolute';
        objImage.style.left='300px';
        objImage.style.bottom='0px';
        objImage.offsetLeft='300px';
        document.getElementById('pause').hidden = true; //hide pause button in beginning
        document.getElementById("welcome").innerHTML = "Welcome " + username + " have fun :) ";

    };

    //to create sound file in game
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    };
    //create new  egg and append it to container
    function new_egg(source, type) { 
        var egg = new Object();
        egg.sourceimg = document.createElement("img");
        egg.sourceimg.src = (source);
        egg.sourceimg.style.position ="absolute";
        egg.sourceimg.style.width = "40px";
        egg.sourceimg.style.top = "-60px";
        egg.type = type;
        egg.divcontainer = document.getElementById("container");
        egg.divcontainer.appendChild(egg.sourceimg);
        egg.divcontainer.appendChild(egg.sourceimg.cloneNode(true));
        return egg;
    };
    
    //start playing button click
    var play = document.getElementById("playgame");
    play.onclick = function (){
        document.getElementById("playgame1").hidden =true; //hide button
        document.getElementById("welcomeuser").hidden =true; //reset welcome msg to null
        document.getElementById('pause').style.display = "inline"; //show pause button after clicking on play button
        //check user clicked pause or not
        document.addEventListener('keydown',keycode); //to move egg basket
        keycode(event); //read key pressed  
        chickensound.play();
        setInterval(koky , 20000);
        function koky(){//add hens sound repeating every 20 seconds
            if (playing) {
                chickensound.play();
            }
            
        };         
        // add timer starts when user clicks start button
            var secondvalue = 60;
            var minutevalue = 1;
            minutetimer.innerHTML = "01" ;
            setInterval(changeValue, 1000);  
            function changeValue() {
                if (playing) { 
                    if (secondvalue > 0) {
                        secondtimer.innerHTML = --secondvalue;
                    }
                    else {
                        minutetimer.innerHTML = "0" + --minutevalue;
                        if (minutevalue <0) {
                            if (confirm("Time ends :( play again ?!")) {
                                counter = 0; lifecounter = 3 ; //reset result and lives
                                document.getElementById("result").innerHTML = counter;
                                minutevalue = 1;
                                minutetimer.innerHTML = "0" + minutevalue;
                                secondvalue = 60;
                            } 
                            else { //pressed cancelled
                                counter = 0; lifecounter = 3 ;
                                window.location.href = "../index.html"; //redirected to home page
                            }
                        }
                         secondvalue = 60;
                    }
                    
                }
            };

        //check game mode selection
        var mode = url.get('mode');
        if (mode ==='easy') {
            //easy mode code here
            setInterval(ff , 1800); //create new egg with random offsetleft value
            function ff() {
                if(playing){ //if it's playing mode
                    var source = '../pic/whiteegg.png' ;
                    var egg =new_egg( source ,1 ); //return obj
                    egg.sourceimg.style.left = randomvalue(5,730) + 'px';
                    fallenegg(egg);
                }
            }
        } else if (mode === 'normal') {
            //normal mode code here
            var egg ;
            setInterval(kk ,1300);
            function kk(){
                if (playing) {
                    var whiteegg_src =  '../pic/whiteegg.png' ;
                    var goldenegg_src = '../pic/goldegg.png' ;
                    var blackegg_src =  '../pic/blackegg.png';
                    eggtype = randomvalue(1 , 3); //create random color of egg
                    if (eggtype === 1) { // it's a white egg score 1
                        egg = new_egg(whiteegg_src,eggtype);

                    } 
                    else if (eggtype === 2) { //it's a golded egg score 3
                        egg = new_egg(goldenegg_src,eggtype);
                    }
                    else{ //eggtype == 3 it's a black egg score -10
                        egg = new_egg (blackegg_src,eggtype);
                    }
                    egg.sourceimg.style.left = randomvalue(5,730) + 'px';
                    fallenegg(egg);
                }
            };


        }  
    };

    //animate egg falling
    function fallenegg(egg){
        var pos = 0;
        var id = setInterval(frame, 5);
        function frame(){ 
            if (playing) { //if user didn't press pause
                if (pos === 450) { //reached floor then it's broken :(
                    gamesound = new sound('../sound/broken.ogg');
                    gamesound.play();
                    egg.sourceimg.src = ('../pic/brokenewhiteegg.png'); // change shape of egg to be broken
                    setTimeout( function(){ //hide broken egg after half second and check of rest lives
                        egg.sourceimg.hidden = true;
                    } , 500 ); //hide broken egg after half second
                    
                    if (egg.type != 3) { 
                            
                        lifecounter--;
                    }
                    if (lifecounter === 0) {
                        if (confirm("You got 0 life left :( play again ?!")) {
                            counter = 0; lifecounter = 3 ; //reset result and lives
                            document.getElementById("result").innerHTML = counter;
                        } else { //pressed cancelled
                            counter = 0; lifecounter = 3 ;
                            window.location.href = "../index.html"; //redirected to home page
                        }
                    }clearInterval(id);
                    
                } 
                else {
                    var val = 0; //it's a variable for point which means that egg in box
                    var resu = document.getElementById("result"); //to show result on a label

                    if (pos === 410) {              //scan if basket and egg overlaping or not at 410 px level
                        var basket_left_distance = objImage.offsetLeft ,
                            val = egg.sourceimg.offsetLeft ;
                        //check if egg is in the box range or not
                        if (val <= (basket_left_distance +100 ) && val >= (basket_left_distance )  ) { 
                            egg.sourceimg.hidden = true; //hide image
                            gamesound = new sound('../sound/score.ogg');
                            gamesound.play();
                            if (egg.type === 1) {
                                counter += 1;
                            } 
                            else if (egg.type === 2 ){
                                counter += 3;
                            }
                            else if(egg.type === 3) {
                                counter = counter - 10 ;
                            }
                            //to set value of new result
                            //wanna check if result less than zero then set it to zero
                            if (counter < 0) {
                                counter = 0 ;
                            }
                            resu.innerHTML = counter; //count new result
                            clearInterval(id); //end interval
                            
                        } 
                        else {
                            pos++; 
                            egg.sourceimg.style.top = pos + 'px';
                        }

                    } else {
                        pos++; 
                        egg.sourceimg.style.top = pos + 'px';
                    }
                } 
            }
        };
        
    };
    //create random value between two numbers
    function randomvalue(min , max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var text = Math.floor(Math.random() * (max - min + 1)) + min ;
        return text;

    }; 
    
    
    //play - pause button change state of the game
    var pause = document.getElementById("pause");
    var switcher =false; //to know if it paused or playing state
    pause.onclick = function (){
        if(!switcher){
            pause.src=('../pic/play.png');
            // pause code here 
            //shall do sleep or smt like that .. after search there is just async await functions
            playing = false;
            chickensound.stop();
            switcher = true;
        }else{
            // resume code
            pause.src=('../pic/pause.png');
            playing = true;
            chickensound.play();
            switcher = false;
        }
    };
    // to Know what arrow that user pressed
      function keycode(e){ 
        var key = e.which || e.keycode; 

		switch(key){
            case 37: //left arrow key
                if (playing) {
                    moveleft ( ) ;
                }
				break;
            case 39: //right arrow key
                if (playing) {
                    moveright();
                }
				break;
					

        }
    };
    // those are obviouse :)
    function moveleft(){
         if (parseInt(objImage.style.left ) > 0 ) { //to make it move only in the container
             objImage.style.left = parseInt(objImage.style.left ) - 20 +'px';
         } 
    };
    function moveright(){
        if (parseInt(objImage.style.left ) < 700 ) {
            objImage.style.left = parseInt(objImage.style.left) + 20 +'px' ;
        }
    };

    



    //global variables
    window.sound = sound;
    window.begine = begine;
    window.keycode = keycode;
    window.fallenegg = fallenegg;
    window.new_egg = new_egg;
}());

//calling functions
window.onload = begine;

