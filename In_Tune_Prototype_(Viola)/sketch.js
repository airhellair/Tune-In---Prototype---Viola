let r, g, b;
let button;
let fr = 30;
let permissionGranted = false;
let harmonyTime = 85; // dictates time before being In Tune at the intersection
var counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  timer = createP('timer'); 
  frameRate(fr); // Attempt to refresh at starting FPS
  setInterval(timeIt, 1000);
  

  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    background(255, 0, 0);
    textSize(42);
    text("You are the Viola\nMove…\n\n  in tune with your environment… \n  tune into the intersection… \n  THE HARMONIUS QUARTET...\n  become more than just...\n  1,  2,  3 ........", 90, 280)
    button = createButton("Tune in");
    button.style("font-size", "48px");
    button.center();
    button.mousePressed( requestAccess );

  } else {
    // non ios 13
    background(0, 0, 255);
  }
}
// counter slowing down the readings of the xyz
function timeIt(){
  timer.html(counter);
  counter++;
}

// Requesting permission from the device to use sensor data. Also initiates the experience
function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
    if (response == 'granted') {
      permissionGranted = true;
    }
  })
  .catch(console.error);
  
  button.remove();
}

// optional functionality for screen tap interaction 
function mousePressed(){
    //song.play();
}

// drawing the colours based on device orientation and accelleration
function draw() {
  if (!permissionGranted) return;
  let thresholdPlus = 0.6;
  let thresholdMinus = -0.6;
  var aX;
  var aY;
  var aZ;
  
  
  if (accelerationX >= thresholdPlus) {
    aX = accelerationX * 3;
  }
  else if (accelerationX <= thresholdMinus) {
    aX = accelerationX * 3;
    textSize(42);
    fill(0,255,0);
  }
  else {
    aX = 0;
    textSize(56);
    fill(255,255,255);
  }
  
  if (accelerationY >= thresholdPlus) {
    aY = accelerationY * 3;
  }
  else if (accelerationY <= thresholdMinus) {
    aY = accelerationY * 3;
    textSize(42);
    fill(0,255,0);
  }
  else {
    aY = 0;
    textSize(56);
    fill(255,255,255);
  }
  
  if (accelerationZ >= thresholdPlus) {
    aZ = accelerationZ * 3;
  }
  else if (accelerationZ <= thresholdMinus) {
    aZ = accelerationZ * 3;
    textSize(42);
    fill(0,255,0);
  }
  else {
    aZ = 0;
    textSize(56);
    fill(255,255,255);
  }
  
  // dictates time before being In Tune at the intersection
  if (counter <= harmonyTime)
  background(rotationX+(counter*3), rotationY+(counter*3) , rotationZ+(counter*3));
  
  textSize(56);
  fill(255,255,255);
  
  
  
  //Debug orientation
  
  text("Viola", 400, 65);
  text("X = " + round(rotationX), 90, 100);
  text("Y = " + round(rotationY), 90, 170);
  text("Z = " + round(rotationZ), 90, 240);
  text("aX = " + round(aX), 55, 310);
  text("aY = " + round(aY), 55, 380);
  text("aZ = " + round(aZ), 55, 450);
  
  
}
