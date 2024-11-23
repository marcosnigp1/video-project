//This code was made using help of the following sketch: https://editor.p5js.org/Jaesar/sketches/TGyEC6OYB

//Hello there.

//Variables for video.
let video;
let playing = true;
let img;

//Variables for UI.
let ui;

function preload() {
  video = createVideo("media/richmond.mp4");
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  //Preparing video.
  //video.size(windowWidth, windowHeight);
  video.hide();
  video.hideControls();

  //Preparing UI class.
  ui = new UI(width * 0.45, height * 0.9, 2);
  windowResized();
  video.attribute("preload", "true");
  video.attribute("playsinline", "true");

  video.volume(0);
}

function draw() {
  background(0);

  //Draw movie.
  push();
  img = video.get();
  img.resize(windowWidth, 0);
  image(img, 0, 0); //redraws the video frame by frame in p5js.
  pop();

  //Check if volume slider is pressed
  if (mouseIsPressed) {
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

  //Show UI.
  ui.show();
  //print(video.time());

  //Check if video is in certain seconds to call the decisions. (IF CONDITIONS EVERYWHERE).
  if (video.time() > 19.4 && video.time() < 20.0) {
    ui.decision_moment = 1;
    ui.show_decision(1);
    ui.pause_video();
  } else if (video.time() > 33.0 && video.time() < 40.0) {
    ui.decision_moment = 1;
    ui.show_decision(2);
    ui.pause_video();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img = video.get();
  img.resize(windowWidth, 0);
  //video.size(windowWidth, windowHeight);

  //Update UI position.
  ui.position.x = width * 0.45;
  ui.position.y = height * 0.9;
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
}

function keyPressed() {
  if (key == "c") {
    {
      fullscreen(true);
    }
  }
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
}
