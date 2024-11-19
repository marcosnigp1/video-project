class UI {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
    this.state = 0; //0 = Playing, 1 = Stopped.
    this.part = 0; //Divide the decisions into parts.
    this.spoon_collected = 0;
    this.decision_moment = 0;

    //Text for UI.
    this.text_a = "";
    this.text_b = "";

    //To get the values to jump to specific times.
    this.time_skip_a = 0;
    this.time_skip_b = 0;
  }

  show() {
    //Reused code from last project.
    //UI to play and stop video.
    push();
    fill(0);
    stroke(255);
    strokeWeight(2);
    if (this.state == 0 && this.decision_moment != 1) {
      beginShape();
      vertex(this.position.x * 1.15, this.position.y * 0.87);
      vertex(this.position.x * 1.15, this.position.y * 0.94);
      vertex(this.position.x * 1.2, this.position.y * 0.903);
      endShape(CLOSE);
    } else if (this.decision_moment != 1) {
      beginShape();
      vertex(this.position.x * 1.14, this.position.y * 0.88);
      vertex(this.position.x * 1.16, this.position.y * 0.88);
      vertex(this.position.x * 1.16, this.position.y * 0.93);
      vertex(this.position.x * 1.14, this.position.y * 0.93);
      endShape(CLOSE);

      beginShape();
      vertex(this.position.x * 1.18, this.position.y * 0.88);
      vertex(this.position.x * 1.2, this.position.y * 0.88);
      vertex(this.position.x * 1.2, this.position.y * 0.93);
      vertex(this.position.x * 1.18, this.position.y * 0.93);
      endShape(CLOSE);
    }
    pop();

    if (this.decision_moment == 1) {
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
