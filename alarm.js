var five = require("johnny-five");
var board = new five.Board({port:"COM3"}); //my port number
var readlineSync = require('readline-sync');


board.on("ready", function() {

  //variable and their pin numbers
    var buzzer = new five.Pin(8);
    var button = new five.Button(5);
    var light = new five.Light("A2");

    var ledArray = new five.Leds([9, 10]); //array storing lights
   
    for(var i =0; i<ledArray.length; i++){  //reads arrays
        ledArray[i].on();
    }
  
    timer();
    

   function timer () {
    //MUST CTRL SHIFT V WHEN PASTING IN TIME.--------------------------------------------------------------
     let usersettime = readlineSync.question("Please enter the date and time you'd like to set using the format: YYYY/MM/DD followed by the time HH:MM:SS.\n");
      console.log(usersettime);
     let today = new Date(); //gets current time from PC
     //console.log(today); for testing
     let alarmtime = new Date(usersettime); //turns userinput into actual time rather than integers
     //console.log(alarmtime); for testing

     let todayms = today.getTime(); //gets time from pc but in milliseconds
     let alarmms = alarmtime.getTime(); //gets time from user input but in milliseconds
    
     let timerTime = alarmms - todayms; //finds out the milliseconds between the time now and user's time
     setTimeout(alarm, timerTime); //goes to sleep 
     console.log(timerTime); //for testing
   }

   
  //  light.on("change", function() {         //--------for testing
  //   console.log(this.level);
  // });

   function alarm () {
     console.log("test");
     buzzer.high();

          ledArray.blink(1000);
          light.on("change", stopAlarm);
          button.once("press", snooze);   //using once so it stops spamming and only just runs once
            
     // }
   }

   function stopAlarm ()  {
    if (this.level > 0.5){
      console.log("covered");
      stopAll();
    }
    };

    function snooze () {
      console.log("button pressed");
      stopAll();
      setTimeout(alarm,3000);
    };

    function stopAll () {
      buzzer.low();
      light.removeAllListeners(); //removing the listener event // stop listening so it stops working 
      button.removeAllListeners();  //https://nodejs.org/api/events.html
      ledArray.stop().off();     //http://johnny-five.io/api/led/
    
    }

});