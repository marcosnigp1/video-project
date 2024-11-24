//This code was made using help of the following sketch: https://editor.p5js.org/Jaesar/sketches/TGyEC6OYB

//Hello there.

//Variables for video.
let video;
let playing = true;
let img;

//Variables for UI.
let ui;
let reset;

function preload() {
  video = createVideo("media/richmond.mp4");
  reset = loadImage("media/reset.png");
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  // Preparing video
  video.hide(); // Hide the default video element initially
  video.hideControls(); // Hide default controls
  video.addClass("video-style"); // Add custom class for styling
  video.attribute("preload", "true"); // Preload the video
  video.attribute("playsinline", "true"); // Ensure the video plays inline on mobile browsers

  // Preparing UI class
  ui = new UI(width * 0.45, height * 0.9, 2);

  // Handle resizing
  windowResized();
}


function draw() {
  background(0);

  //Draw movie.
  push();
  img = video.get();
  img.resize(windowWidth, 0);

  checkWindowWidth(); //This function helps to position the video.

  pop();

  //Check if volume slider is pressed
  if (mouseIsPressed) {
    //Audio slider.
    ///If mouse is clicked inside the bar, check current position and then adjust the volume.
    if (
      mouseX > ui.position.x * 0.2 &&
      mouseX < ui.position.x * 0.65 + ui.position.x * 0.2 &&
      mouseY > ui.position.y * 1.065 &&
      mouseY < ui.position.y * 1.072 + ui.position.y * 0.03
    ) {
      let volume_value = map(
        mouseX,
        ui.position.x * 0.2,
        ui.position.x * 0.65 + ui.position.x * 0.2,
        0,
        1.0
      );
      video.volume(volume_value);
    }
  }

  //Show UI.
  ui.show();
  //print(video.time());

  //Check if video is in certain seconds to call the decisions. (IF CONDITIONS EVERYWHERE IN THIS FUNCTION).
  checkDecision();
  checkSkipper(); //Skips video in certain scene to the correct time stamp.
}

function checkDecision() {
  //Warning, there is a lot of if conditions here.
  if (video.time() > 81.0 && video.time() < 81.5) {
    ui.decision_moment = 1;
    ui.show_decision(1);
    ui.pause_video();
  } else if (video.time() > 186.3 && video.time() < 186.6) {
    ui.decision_moment = 1;
    ui.show_decision(2);
    ui.pause_video();
  } else if (video.time() > 221.0 && video.time() < 221.5) {
    ui.decision_moment = 1;
    ui.show_decision(3);
    ui.pause_video();
  } else if (video.time() > 271) {
    ui.state = 0;
    filter(GRAY);
  }
}

//The spoon will also be checked here.
function checkSkipper() {
  if (video.time() > 122.5 && video.time() < 123.0) {
    video.time(161);
  } else if (video.time() > 192.4 && video.time() < 192.95) {
    ui.spoon = 1; //Spoon will be registered as taken.
    video.time(206.35);
  } else if (video.time() > 225 && video.time() < 225.5) {
    video.time(232);
  }
}

//Can not use isPlaying() cause it seems to be reserved for audio.
function mousePressed() {
  //Play and stop button.
  if (
    playing &&
    ui.decision_moment != 1 &&
    mouseX > ui.position.x * 1.08 &&
    mouseX < ui.position.x * 1.15 &&
    mouseY > ui.position.y * 1.055 &&
    mouseY < ui.position.y * 1.11
  ) {
    if (video.time() > 271) {
      video.time(0);
      video.play();
      ui.state = 1;
    } else {
      ui.pause_video();
    }
  } else if (
    ui.decision_moment != 1 &&
    mouseX > ui.position.x * 1.08 &&
    mouseX < ui.position.x * 1.15 &&
    mouseY > ui.position.y * 1.055 &&
    mouseY < ui.position.y * 1.11
  ) {
    ui.play_video();
    //video.time(10.3);
  }
  playing = !playing;

  //Decision boxes.
  if (
    mouseX > ui.position.x * 0.3 &&
    mouseX < ui.position.x * 0.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.play_video(); //First play the video, THEN JUMP to the seconds. Chrome has troubles understanding what to do if the time skip is done first...
    ui.jump_to_seconds(ui.time_skip_a);
    ui.decision_moment = 0;
  } else if (
    mouseX > ui.position.x * 1.3 &&
    mouseX < ui.position.x * 1.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.play_video();
    ui.jump_to_seconds(ui.time_skip_b);
    ui.decision_moment = 0;
  }

  //Fullscreen button.
  if (
    ui.fullscreen_mode == 0 &&
    mouseX > ui.position.x * 1.33 &&
    mouseX < ui.position.x * 1.39 &&
    mouseY > ui.position.y * 1.06 &&
    mouseY < ui.position.y * 1.103
  ) {
    fullscreen(true);
    ui.fullscreen_mode = 1;
  } else if (
    ui.fullscreen_mode == 1 &&
    mouseX > ui.position.x * 1.33 &&
    mouseX < ui.position.x * 1.39 &&
    mouseY > ui.position.y * 1.06 &&
    mouseY < ui.position.y * 1.103
  ) {
    fullscreen(false);
    ui.fullscreen_mode = 0;
  }
}

function keyPressed() {
  if (key == "f" || key == "F") {
    {
      if (ui.fullscreen_mode == 0) {
        fullscreen(true);
        ui.fullscreen_mode = 1;
      } else if (ui.fullscreen_mode == 1) {
        fullscreen(false);
        ui.fullscreen_mode = 0;
      }
    }
  }
  //For testing purposes.
  /*   if (key == "1") {
    video.time(79);
  } else if (key == "2") {
    video.time(121);
  } else if (key == "3") {
    video.time(185);
  } else if (key == "4") {
    video.time(219);
  } else if (key == "5") {
    ui.spoon = 1;
    video.time(219);
  } else if (key == "6") {
    ui.spoon = 1;
    video.time(269);
  } */
}

//Code for touchscreens.
function touchStarted() {
  //Play and stop button.
  if (
    playing &&
    ui.decision_moment != 1 &&
    mouseX > ui.position.x * 1.08 &&
    mouseX < ui.position.x * 1.15 &&
    mouseY > ui.position.y * 1.055 &&
    mouseY < ui.position.y * 1.11
  ) {
    ui.pause_video();
  } else if (
    ui.decision_moment != 1 &&
    mouseX > ui.position.x * 1.08 &&
    mouseX < ui.position.x * 1.15 &&
    mouseY > ui.position.y * 1.055 &&
    mouseY < ui.position.y * 1.11
  ) {
    ui.play_video();
    //video.time(10.3);
  }
  playing = !playing;

  //Decision boxes.
  if (
    mouseX > ui.position.x * 0.3 &&
    mouseX < ui.position.x * 0.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.play_video(); //First play the video, THEN JUMP to the seconds. Chrome has troubles understanding what to do if the time skip is done first...
    ui.jump_to_seconds(ui.time_skip_a);
    ui.decision_moment = 0;
  } else if (
    mouseX > ui.position.x * 1.3 &&
    mouseX < ui.position.x * 1.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.play_video();
    ui.jump_to_seconds(ui.time_skip_b);
    ui.decision_moment = 0;
  }

  //Fullscreen button.
  if (
    ui.fullscreen_mode == 0 &&
    mouseX > ui.position.x * 1.33 &&
    mouseX < ui.position.x * 1.39 &&
    mouseY > ui.position.y * 1.06 &&
    mouseY < ui.position.y * 1.103
  ) {
    fullscreen(true);
    ui.fullscreen_mode = 1;
  } else if (
    ui.fullscreen_mode == 1 &&
    mouseX > ui.position.x * 1.33 &&
    mouseX < ui.position.x * 1.39 &&
    mouseY > ui.position.y * 1.06 &&
    mouseY < ui.position.y * 1.103
  ) {
    fullscreen(false);
    ui.fullscreen_mode = 0;
  }

  //Audio slider.
  ///If mouse is clicked inside the bar, check current position and then adjust the volume.
  if (
    mouseX > ui.position.x * 0.2 &&
    mouseX < ui.position.x * 0.65 + ui.position.x * 0.2 &&
    mouseY > ui.position.y * 1.075 &&
    mouseY < ui.position.y * 1.075 + ui.position.y * 0.01
  ) {
    let volume_value = map(
      mouseX,
      ui.position.x * 0.2,
      ui.position.x * 0.65 + ui.position.x * 0.2,
      0,
      1.0
    );
    video.volume(volume_value);
  }
}

//This is mostly used for responsiveness.

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img = video.get();
  img.resize(windowWidth, 0);
  //video.size(windowWidth, windowHeight);

  //Update UI position.
  ui.position.x = width * 0.45;
  ui.position.y = height * 0.9;
}

//Used mostly for responsiveness on phones.
function checkWindowWidth() {
  if (windowWidth <= 428) {
    // For very small screens (e.g., phones)
    image(img, 0, height * 0.3); // Adjust position for phones
    img.resize(windowWidth, 0); // Ensure it fits the screen width
  } else if (windowWidth <= 800) {
    // For mid-sized screens (e.g., tablets or smaller laptops)
    image(img, 0, height * 0.1); // Slight vertical offset
    img.resize(windowWidth * 0.9, 0); // Reduce size slightly for better fit
  } else if (windowWidth <= 1200) {
    // For larger mid-sized screens (e.g., standard laptops)
    image(img, width * 0.05, height * 0.05); // Center slightly
    img.resize(windowWidth * 0.85, 0); // Scale video to fit
  } else {
    // For large screens
    image(img, 0, 0); // Full canvas display
    img.resize(windowWidth, 0); // Keep full width
  }
}


function checkFontSize() {
  if (windowWidth <= 428) {
    textSize(6);
  } else if (windowWidth <= 500) {
    textSize(7);
  } else if (windowWidth <= 900) {
    textSize(12);
  } else {
    textSize(19);
  }
}
