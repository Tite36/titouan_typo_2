var mic;
var button;
var sampleVol = [];
var volHistory = [];
var time = 0;
var listenState = true;
var slider;

var htmlTextDisplay;
var htmlVolDisplay;

var phrases = [
  "Bienvenue !<br>Veuillez lire les extraits qui vont suivre quand ils s'afficheront<br>Cliquez sur le bouton pour commencer",
  "Demain dès l'aube",
  "à l'heure où blanchit la campagne",
  "je partirai",
]

function setup() {
  createCanvas(1200, 200);
  mic = new p5.AudioIn();
  button = createButton('⏺');
  button.mousePressed(toggleMic);

  htmlTextDisplay = document.getElementById('textDisplay');
  htmlVolDisplay = document.getElementById('volDisplay');
}


function draw() {
  background(0);
  

  var vol = mic.getLevel();

  if(listenState){
    slider = 1000-time;
    fill('red');
    noStroke();
    rect(100,10,slider,2);

    if (mic.enabled) {
      time = time + 1;
      sampleVol.push(vol);
    }

    beginShape();
      fill('red');
      stroke(255);
      for (var i = 0; i < sampleVol.length; i++) {
      var y = map(sampleVol[i], 0, 1, height, 0);
      vertex(i, y);
    }
    endShape();

    if (sampleVol.length > width) {
      sampleVol.splice(0, 1);
    }



    if (time == 0) {
      //let toShow = document.querySelector("ul li:nth-child(1)");
      htmlTextDisplay.innerHTML = phrases[0];
      console.log(time);
    } 

    else if (time == 200) {
      //let toHide = document.querySelector("ul li:nth-child(1)");
      //let toShow = document.querySelector("ul li:nth-child(2)");
      htmlTextDisplay.innerHTML = phrases[1];
      volHistory.push(sampleVol);
      console.log(volHistory);
      console.log(time);
    } 
    
    else if (time == 400) {
      //let toHide = document.querySelector("ul li:nth-child(2)");
      //let toShow = document.querySelector("ul li:nth-child(3)");
      htmlTextDisplay.innerHTML = phrases[2];
      volHistory.push(sampleVol);
      console.log(volHistory);
      console.log(time);
    } 
    
    else if (time == 600) {
    //let toHide = document.querySelector("ul li:nth-child(3)");
    //let toShow = document.querySelector("ul li:nth-child(4)");
    htmlTextDisplay.innerHTML = phrases[3];
    volHistory.push(sampleVol);
    console.log(volHistory);
    console.log(time);
    }
    
    else if (time == 800) {
    //let toHide = document.querySelector("ul li:nth-child(4)");
    //let toShow = document.querySelector("ul li:nth-child(5)");
    htmlTextDisplay.innerHTML = phrases[4];
    volHistory.push(sampleVol);
    console.log(volHistory);
    console.log(time);
    } 
    
    else if (time == 1000) {
    listenState = false;
    console.log('end');
    }
  }

  else{
    htmlTextDisplay.innerHTML = phrases[1];
    htmlVolDisplay.innerHTML = volHistory[1];
  }

}


function toggleMic() {

  if (!mic.enabled) {
    mic.enabled = true;
    mic.start();
    console.log('mic enabled');
    button.html("⏸");
  } else {
    mic.enabled = false;
    console.log('mic disabled');
    button.html("⏺");
  }
}

