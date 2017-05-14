var bubbles = [];
var bubblesH = [];
var timer;
var mouseClick;
var trumpSound;
var hillarySound;
var trumpFont;
var hillaryFont;
var counter;
var chosenTime;
var timingElement;
var calendar, heart, retweet;
var donald, clinton, logo, circle;
var pauseoff, pauseon, playon, playoff;
var chosen;
var one, two, four;
var onenew, twonew, fournew;
var trumpSoundnumber;
var hillarySoundnumber;

function preload() {
  trump = loadTable("data/realDonaldTrump_tweets.csv", "csv");
  hillary = loadTable("data/HillaryClinton_tweets.csv", "csv");
  clinton = loadImage("data/Clinton_Circle.png");
  donald = loadImage("data/Trump_Circle.png");
  calendar = loadImage("data/calendar.png");
  circle = loadImage("data/circle.png");
  logo = loadImage("data/logo.png");
  heart = loadImage("data/heart.png");
  retweet = loadImage("data/retweet.png");
  trumpFont = loadFont("data/trump.ttf");
  hillaryFont = loadFont("data/hillary.otf");
  trumpSound = loadSound("data/Input-01.mp3");
  hillarySound = loadSound("data/Input-02.mp3");
  pauseoff = loadImage("data/pauseoff.png");
  pauseon = loadImage("data/pauseon.png");
  playon = loadImage("data/playon.png");
  playoff = loadImage("data/playoff.png");
  one = loadImage("data/1.png");
  two = loadImage("data/2.png");
  four = loadImage("data/4.png");
  onenew = loadImage("data/1new.png");
  twonew = loadImage("data/2new.png");
  fournew = loadImage("data/4new.png");

}

function setup() {
  reverb = new p5.Reverb();
  reverb2 = new p5.Reverb();
  fft = new p5.FFT();
  filter = new p5.BandPass();
  hillarySound.disconnect();
  trumpSound.disconnect();
  trumpSound.connect(filter);
  hillarySound.connect(filter);
  reverb.process(hillarySound, 3, 2);
  reverb2.process(trumpSound, 3, 2);
//  trumpSound.loop();
 // hillarySound.loop();
  chosen = 1;
  counter = 0;
  timingElement = 0;
  mouseClick = true;
  createCanvas(windowWidth, windowHeight);
  background(50);
  rowCountT = trump.getRowCount();
  timer = 17798400;
  rowCountH = hillary.getRowCount();
  for (var t = 1; t < rowCountH - 206; t++) {
    var h = new BubbleH(t);
    bubblesH.push(h);
  }
  for (var i = 1; i < rowCountT - 1793; i++) {
    var b = new BubbleT(i);
    bubbles.push(b);
  }
  print(bubbles.length);
}

function draw() {
  if (90 <= mouseX && mouseX <= 140 && 190 <= mouseY && mouseY <= 240) {
    cursor(HAND);
  } else if (90 <= mouseX && mouseX <= 140 && 125 <= mouseY && mouseY <= 155) {
    cursor(HAND);
  } else if (160 <= mouseX && mouseX <= 210 && 190 <= mouseY && mouseY <= 240) {
    cursor(HAND);
  } else if (20 <= mouseX && mouseX <= 70 && 190 <= mouseY && mouseY <= 240) {
    cursor(HAND);
  } else {
    cursor();
  }
  counter = millis() - timingElement;
  background(50);
  pop();
  fill(255);
  noStroke();
  rect(0, 0, 230, height);
  image(circle, 20, 260, 190, 190);
  push();
  push();
  fill(50);
  // rect(90,height-200,50,50);
  // rect(160,height-200,50,50);
  pop();
  //text(timer, width - 100, 20);
  // text(counter, width - 100, 40);
  for (var i = 0; i < bubbles.length - 1; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
    if (bubbles[i].alpha <= 0) {
      trumpSoundnumber--;
      bubbles.splice(i, 1);
    }
  }
  for (var t = 0; t < bubblesH.length - 1; t++) {
    bubblesH[t].display();
    bubblesH[t].rollover(mouseX, mouseY);
    if (bubblesH[t].alpha <= 0) {
      hillarySoundnumber--;
      bubblesH.splice(t, 1);
    }
  }
  image(calendar, 20, 470);
 // text(hillarySoundnumber,width-50,10);
//  text(trumpSoundnumber,width-50,50);
  image(heart, 90, 470);
  image(retweet, 160, 470);
  image(one, 20, 190, 50, 50);
  image(two, 90, 190, 50, 50);
  image(four, 160, 190, 50, 50);
  image(logo, 20, 20, 190, 100);
  if (mouseClick) {
    image(pauseoff, 115 - 25, 125, 50, 50);
    if (counter >= 1000 / chosen) {
      timer += 3600;
      timingElement = millis();
    }
  } else {
    image(playoff, 115 - 25, 125, 50, 50);
  }

  if (chosen === 1) {
    image(onenew, 20, 190, 50, 50);
  }
  if (chosen === 2) {
    image(twonew, 90, 190, 50, 50);
  }
  if (chosen === 4) {
    image(fournew, 160, 190, 50, 50);
  }
}



function BubbleT(i) {
  this.xPos = random(270, width - 20);
  this.yPos = random(20, height - 20);
  this.timestampT = trump.getRow(i).get(1);
  this.splitStringT = split(this.timestampT, " ");
  this.timeT = split(this.splitStringT[1], ":");
  this.dateT = split(this.splitStringT[0], "-");
  this.objectTimeT = int((this.dateT[1] - 1) * 2592000) + int(this.dateT[2] * 86400) + int(this.timeT[0] * 3600) + int(this.timeT[1] * 60) + int(this.timeT[2]);
  this.wT = trump.getRow(i).get(4);
  this.rT = trump.getRow(i).get(3);
  this.sT = trump.getRow(i).get(2);
  this.alpha = map(this.rT, 700, 100000, 0, 255)
  this.moment = this.objectTimeT;
  this.hover = false;
  this.soundPlaying = true;

  this.rollover = function(px, py) {
    this.d = dist(px, py, this.xPos, this.yPos);
    if (this.d < (this.wT * .001)) {
      this.hover = true;
    } else {
      this.hover = false;
    }

  }


  this.display = function() {
    if (this.moment <= timer) {

      if (this.soundPlaying) {
        trumpSoundnumber++;
        trumpSound.play();
        this.soundPlaying = false;
      }
      // trumpSound.play();
      //print("YES");
      if (this.hover) {
        push();
        textAlign(CENTER);
        textFont(trumpFont);
        //text(this.sT, this.xPos, this.yPos + ((this.wT * .001) / 2) + 20);
        push();
        fill(255);
        rect(0, 0, 230, height);
        pop();
        fill(255, 0, 0);
        text(this.sT, 20, height - 100, 190);
        text(this.timestampT, 20, height - 150, 50, 50);
        text(this.rT, 160, height - 150, 50, 50);
        text(this.wT, 90, height - 150, 50, 50);
        image(donald, 20, 260, 190, 190);
        fill(255);
        stroke(255);
        strokeWeight(5);
        // if (!trumpSound.isPlaying()) {
        //   trumpSound.play();
        // }
      } else {
        push();
        stroke(255);
        strokeWeight(2);
      }
      fill(255, 0, 0, this.alpha);
      ellipse(this.xPos, this.yPos, this.wT * .001, this.wT * .001);
      pop();
      if (this.alpha > 0 && mouseClick && counter >= 1000) {
        //trumpSound.play();
        this.alpha-=2;
      }
      // if (this.wT >= 1000) {
      //   this.wT -= 1000;
      // } else {
      //   this.wT = 0;
      // }
    }
  }
}

function BubbleH(i) {
  this.xPos = random(270, width - 20);
  this.yPos = random(20, height - 20);
  this.timestampH = hillary.getRow(i).get(1);
  this.splitStringH = split(this.timestampH, " ");
  this.timeH = split(this.splitStringH[1], ":");
  this.dateH = split(this.splitStringH[0], "-");
  this.objectTimeH = int((this.dateH[1] - 1) * 2592000) + int(this.dateH[2] * 86400) + int(this.timeH[0] * 3600) + int(this.timeH[1] * 60) + int(this.timeH[2]);
  this.wH = hillary.getRow(i).get(4);
  this.rH = hillary.getRow(i).get(3);
  this.sH = hillary.getRow(i).get(2);
  this.alpha = map(this.rH, 700, 100000, 0, 255)
  this.moment = this.objectTimeH;
  this.hover = false;
  this.soundPlaying = true;

  this.rollover = function(px, py) {
    this.d = dist(px, py, this.xPos, this.yPos);
    if (this.d < (this.wH * .001)) {
      this.hover = true;
    } else {
      this.hover = false;
    }

  }
  this.display = function() {
    if (this.moment <= timer) {
      if (this.soundPlaying) {
        hillarySoundnumber++;
        hillarySound.play();
        this.soundPlaying = false;
      }
        if (this.hover) {
          push();
          textAlign(CENTER);
          textFont(hillaryFont);
          push();
          fill(255);
          rect(0, 0, 230, height);
          pop();
          fill(0, 0, 255);
          push();
          textSize(15);
          text(this.sH, 20, 580, 190);
          pop();
          text(this.timestampH, 20, 525, 50, 50);
          text(this.rH, 160, 525, 50, 50);
          text(this.wH, 90, 525, 50, 50);
          image(clinton, 20, 260, 190, 190);
          fill(255);
          stroke(255);
          strokeWeight(5);
        } else {
          push();
          stroke(255);
          strokeWeight(2);
        }
        fill(0, 0, 255, this.alpha);
        ellipse(this.xPos, this.yPos, this.wH * .001, this.wH * .001);
        pop();
        if (this.alpha > 0 && mouseClick && counter >= 1000) {
          //hillarySound.play();
          this.alpha-=2;
        }

      }
    }
  }

  function mousePressed() {
    if (90 <= mouseX && mouseX <= 140 && 125 <= mouseY && mouseY <= 155) {
      mouseClick = !mouseClick;
      print("hello");
    } else {
      mouseClick = mouseClick;
    }
    if (90 <= mouseX && mouseX <= 140 && 190 <= mouseY && mouseY <= 240) {
      chosen = 2;
    }
    if (20 <= mouseX && mouseX <= 70 && 190 <= mouseY && mouseY <= 240) {
      chosen = 1;
    }
    if (160 <= mouseX && mouseX <= 210 && 190 <= mouseY && mouseY <= 240) {
      chosen = 4;
    }
  }