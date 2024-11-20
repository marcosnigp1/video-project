//This code was made using help of the following sketch: https://editor.p5js.org/Jaesar/sketches/TGyEC6OYB

//Hello there.

//Variables for video.
let video;
let playing = true;

//Variables for UI.
let ui;

function preload() {
  video = createVideo("media/steamedhams.mp4");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Preparing video.
  video.size(windowWidth, windowHeight);
  video.hide();
  video.hideControls();

  //Preparing UI class.
  ui = new UI(width * 0.45, height * 0.9, 2);
  windowResized();
  video.attribute("playsinline", "true");
}

function draw() {
  background(0);
  let img = video.get();
  image(img, 0, 0); //redraws the video frame by frame in p5js.

  //Show UI.
  ui.show();
  //print(video.time());

  //Check if video is in certain seconds to call the decisions. (IF CONDITIONS GALORE).
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
  video.size(windowWidth, windowHeight);

  //Update UI position.
  ui.position.x = width * 0.45;
  ui.position.y = height * 0.9;
}

//Can not use isPlaying() cause it seems to be reserved for audio.
function mousePressed() {
  if (playing && ui.decision_moment != 1) {
    ui.pause_video();
  } else if (ui.decision_moment != 1) {
    ui.play_video();
    //video.time(10.3);
  }
  playing = !playing;

  if (
    mouseX > ui.position.x * 0.3 &&
    mouseX < ui.position.x * 0.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.jump_to_seconds(ui.time_skip_a);
    ui.decision_moment = 0;
    ui.play_video();
  } else if (
    mouseX > ui.position.x * 1.3 &&
    mouseX < ui.position.x * 1.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.jump_to_seconds(ui.time_skip_b);
    ui.decision_moment = 0;
    ui.play_video();
  }
}

//Code for touchscreens.
function touchStarted() {
  if (playing && ui.decision_moment != 1) {
    ui.pause_video();
  } else if (ui.decision_moment != 1) {
    ui.play_video();
    //video.time(30.3);
  }
  playing = !playing;

  if (
    mouseX > ui.position.x * 0.3 &&
    mouseX < ui.position.x * 0.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.jump_to_seconds(ui.time_skip_a);
    ui.decision_moment = 0;
    ui.play_video();
  } else if (
    mouseX > ui.position.x * 1.3 &&
    mouseX < ui.position.x * 1.9 &&
    mouseY > ui.position.y * 0.88 &&
    mouseY < ui.position.y * 1 &&
    ui.decision_moment == 1
  ) {
    ui.jump_to_seconds(ui.time_skip_b);
    ui.decision_moment = 0;
    ui.play_video();
  }
}
