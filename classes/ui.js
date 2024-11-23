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

    //Variables for volume slider.
    this.volume = 1.0;
  }

  show() {
    //Reused code from last project.
    //UI to play and stop video.

    //White bar that highlight the menu.
    push();
    fill(255);
    rect(0, height * 0.945, windowWidth, windowHeight);
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
      stroke(0);
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
      push();

      //Box A.
      beginShape();
      vertex(this.position.x * 0.3, this.position.y * 0.88);
      vertex(this.position.x * 0.9, this.position.y * 0.88);
      vertex(this.position.x * 0.9, this.position.y * 1);
      vertex(this.position.x * 0.3, this.position.y * 1);
      endShape();

      //Text parameters
      textSize(20);
      fill(0);
      text(this.text_a, this.position.x * 0.45, this.position.y * 0.94);
      pop();

      //Box B.
      push();
      beginShape();
      vertex(this.position.x * 1.3, this.position.y * 0.88);
      vertex(this.position.x * 1.9, this.position.y * 0.88);
      vertex(this.position.x * 1.9, this.position.y * 1);
      vertex(this.position.x * 1.3, this.position.y * 1);
      endShape();

      //Text parameters
      textSize(20);
      fill(0);
      text(this.text_b, this.position.x * 1.45, this.position.y * 0.94);

      pop();
    }

    // -------- Fullscreen icon --------.
    if (this.fullscreen_mode == 0) {
      push();
      strokeWeight(3);
      stroke(0);

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
      stroke(0);

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
    stroke(0);
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

    push();
    //Circle for progress.
    fill(30);
    circle(
      this.position.x * 0.2,
      this.position.y * 1.08,
      this.position.x * 0.04
    );
    pop();
  }

  show_decision(part) {
    switch (part) {
      case 1:
        this.text_a = "Check oven again";
        this.text_b = "Check Window";
        this.time_skip_a = 15;
        this.time_skip_b = 21;
        break;

      case 2:
        this.text_a = "Explain";
        this.text_b = "Run";
        this.time_skip_a = 49;
        this.time_skip_b = 67;
        break;

      case 3:
        this.text_a = "'Yes'";
        this.text_b = "'Its an expression'";
        this.time_skip_a = 85;
        this.time_skip_b = 95;
        break;

      case 4:
        print("Lol");
        break;

      default:
        break;
    }
  }

  //Updates the value of the volume slider.
  update_volume_values(x, y) {
    //Update values, such as position and audio time

    this.song_time_total = round(audio.duration(), 0);
    this.song_time_left = round(audio.currentTime(), 0);

    if (audio.isPlaying()) {
      this.play = 1;
    } else {
      this.play = 0;
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
