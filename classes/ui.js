class UI {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
    this.state = 0; //0 = Playing, 1 = Stopped.
    this.part = 0; //Divide the decisions into parts.
    this.spoon_collected = 0;
    this.decision_moment = 0;
    this.fullscreen_mode = 0; //0 = Not in fullscreen mode, 1 = In fullscreen mode.

    //Text for UI.
    this.text_a = "";
    this.text_b = "";

    //To get the values to jump to specific times.
    this.time_skip_a = 0;
    this.time_skip_b = 0;
    this.spoon = 0;

    //Variables for volume slider.
    this.volume = 1.0;
  }

  show() {
    //Reused code from last project.
    //UI to play and stop video.

    //White bar that highlight the menu.
    push();
    fill(0);
    stroke(229, 9, 20);
    rect(0, height * 0.945, windowWidth + 20, windowHeight);
    pop();

    push();
    fill(0);
    stroke(255);
    strokeWeight(2);

    // -------- Play and stop button --------
    if (this.state == 0 && this.decision_moment != 1) {
      beginShape();
      vertex(this.position.x * 1.1, this.position.y * 1.055);
      vertex(this.position.x * 1.1, this.position.y * 1.11);
      vertex(this.position.x * 1.15, this.position.y * 1.08);
      endShape(CLOSE);
    } else if (this.decision_moment != 1) {
      beginShape();
      vertex(this.position.x * 1.08, this.position.y * 1.055);
      vertex(this.position.x * 1.1, this.position.y * 1.055);
      vertex(this.position.x * 1.1, this.position.y * 1.11);
      vertex(this.position.x * 1.08, this.position.y * 1.11);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.13, this.position.y * 1.055);
      vertex(this.position.x * 1.15, this.position.y * 1.055);
      vertex(this.position.x * 1.15, this.position.y * 1.11);
      vertex(this.position.x * 1.13, this.position.y * 1.11);
      endShape(CLOSE);
    }
    pop();

    if (this.decision_moment == 1) {
      //X sign indicating that the movie can not be started or stopped.
      push();
      stroke(255);
      strokeWeight(2);

      beginShape();
      vertex(this.position.x * 1.08, this.position.y * 1.055);
      vertex(this.position.x * 1.15, this.position.y * 1.11);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.15, this.position.y * 1.055);
      vertex(this.position.x * 1.08, this.position.y * 1.11);
      endShape(CLOSE);
      pop();

      //Decision boxes.

      //Box A.
      push();
      fill(0);
      stroke(229, 9, 20);
      beginShape();
      vertex(this.position.x * 0.3, this.position.y * 0.88);
      vertex(this.position.x * 0.9, this.position.y * 0.88);
      vertex(this.position.x * 0.9, this.position.y * 1);
      vertex(this.position.x * 0.3, this.position.y * 1);
      endShape(CLOSE);

      //Text parameters
      checkFontSize();
      stroke(0);
      fill(255);
      text(this.text_a, this.position.x * 0.49, this.position.y * 0.935);
      pop();

      //Box B.
      push();
      fill(0);
      stroke(229, 9, 20);
      beginShape();
      vertex(this.position.x * 1.3, this.position.y * 0.88);
      vertex(this.position.x * 1.9, this.position.y * 0.88);
      vertex(this.position.x * 1.9, this.position.y * 1);
      vertex(this.position.x * 1.3, this.position.y * 1);
      endShape(CLOSE);

      //Text parameters
      checkFontSize();
      stroke(0);
      fill(255);
      text(this.text_b, this.position.x * 1.49, this.position.y * 0.935);
      pop();
    }

    // -------- Fullscreen icon --------.
    if (this.fullscreen_mode == 0) {
      push();
      strokeWeight(3);
      stroke(255);

      //Left upper part.
      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.06);
      vertex(this.position.x * 1.33, this.position.y * 1.075);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.06);
      vertex(this.position.x * 1.35, this.position.y * 1.06);
      endShape(CLOSE);

      //Left bottom part.
      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.09);
      vertex(this.position.x * 1.33, this.position.y * 1.105);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.105);
      vertex(this.position.x * 1.35, this.position.y * 1.105);
      endShape(CLOSE);

      //Right upper part.
      beginShape();
      vertex(this.position.x * 1.39, this.position.y * 1.06);
      vertex(this.position.x * 1.39, this.position.y * 1.075);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.39, this.position.y * 1.06);
      vertex(this.position.x * 1.37, this.position.y * 1.06);
      endShape(CLOSE);

      //Right bottom part.
      beginShape();
      vertex(this.position.x * 1.39, this.position.y * 1.09);
      vertex(this.position.x * 1.39, this.position.y * 1.105);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.39, this.position.y * 1.105);
      vertex(this.position.x * 1.37, this.position.y * 1.105);
      endShape(CLOSE);
      pop();
    } else if (this.fullscreen_mode == 1) {
      push();
      strokeWeight(3);
      stroke(255);

      //Left upper part.
      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.075);
      vertex(this.position.x * 1.35, this.position.y * 1.075);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.35, this.position.y * 1.06);
      vertex(this.position.x * 1.35, this.position.y * 1.075);
      endShape(CLOSE);

      //Left bottom part.
      beginShape();
      vertex(this.position.x * 1.33, this.position.y * 1.09);
      vertex(this.position.x * 1.35, this.position.y * 1.09);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.35, this.position.y * 1.09);
      vertex(this.position.x * 1.35, this.position.y * 1.105);
      endShape(CLOSE);

      //Right upper part.
      beginShape();
      vertex(this.position.x * 1.37, this.position.y * 1.06);
      vertex(this.position.x * 1.37, this.position.y * 1.075);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.39, this.position.y * 1.075);
      vertex(this.position.x * 1.37, this.position.y * 1.075);
      endShape(CLOSE);

      //Right bottom part.
      beginShape();
      vertex(this.position.x * 1.37, this.position.y * 1.09);
      vertex(this.position.x * 1.39, this.position.y * 1.09);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.37, this.position.y * 1.09);
      vertex(this.position.x * 1.37, this.position.y * 1.105);
      endShape(CLOSE);
      pop();
    }

    // -------- Volume slider --------.
    push();
    stroke(255);
    strokeWeight(2);
    noFill();
    //Bar.
    rect(
      this.position.x * 0.2,
      this.position.y * 1.075,
      this.position.x * 0.65,
      this.position.y * 0.01
    );
    pop();

    //Text, cause there is no time to do something more complex.
    push();
    textSize(10);
    fill(255);
    stroke(255);
    strokeWeight(1);
    text("Volume", this.position.x * 0.5, this.position.y * 1.105);
    pop();

    //Circle to indicate where the volume is.
    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    circle(
      map(
        video.volume(),
        0.0,
        1.0,
        this.position.x * 0.2,
        this.position.x * 0.65 + this.position.x * 0.2
      ),
      this.position.y * 1.08,
      this.position.x * 0.04
    );
    pop();
  }

  show_decision(part) {
    switch (part) {
      case 1:
        this.text_a = "Shake Richmond \n to wake him up";
        this.text_b = "Yell at Richmond \nto get a response";
        this.time_skip_a = 81.6;
        this.time_skip_b = 123.1;
        break;

      case 2:
        this.text_a = " Take a weapon \nto defend yourself";
        this.text_b = "Try to escape \n   the dorm";
        this.time_skip_a = 186.7;
        this.time_skip_b = 193.6;
        break;

      case 3:
        if (this.spoon == 0) {
          this.text_a = "Try to move the \nbox with a shoe";
          this.time_skip_a = 222;
        } else if (this.spoon == 1) {
          this.text_a = " Try to move the \nbox with the spoon";
          this.time_skip_a = 226;
        }
        this.text_b = "Stand up and investigate \n      the box closely";
        this.time_skip_b = 230;
        break;

      case 4:
        print("Lol");
        break;

      default:
        break;
    }
  }

  play_video() {
    video.play();
    this.state = 1;
  }

  jump_to_seconds(s) {
    video.time(s);
  }

  pause_video() {
    video.pause();
    this.state = 0;
  }
}
