"use strict";
var p;
var DEBUG_MODE = true;
var particles = [];
var canvas, img;
var s;
var grow;
var on;



function setup() {
textFont("Questrial");
 canvas = createCanvas(window.innerWidth, window.innerHeight);
  img= loadImage("./assets/logo.png");
  if (DEBUG_MODE) {
    //frameRate(5);
  }
  for (var i = 0; i < 100; i++) {
    particles.push(new Particle(100, height / 2));
  }
  rectMode(CENTER);
  s=0;
  on=false;
}

function draw() {
  background(0,20);
  if(s<20){
    grow=true;
  }
  if(s>=20){
    s=0;
  }
  if(grow==true){
    s+=.25;
  }
  if(mouseX>=((width/2)-100) && mouseX<=(width/2)+100 && mouseY<=(height/2)+100 && mouseY>=(height/2)-100){
    on=true;
    if(mouseIsPressed){
      window.open("./home.html","_self");
    }
  }
  else{
    on=false;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();

  }
  imageMode(CENTER);
  rectMode(CENTER);
  if(on==true){
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(4);
  fill(0);
  rect(width/2,height/2,200+s,200+s);
  pop();
  fill(255);
  textAlign(CENTER);
  textSize(25);
  text("Tyler Rhorick's Portfolio",width/2,height/2+150);
}
  image(img,width/2,height/2,200,200);
}
var DEBUG_MODE = true;
var mouseVec;

class Particle {
  constructor(x, y) {
    this.dia = random(2, 4);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(1, 0);
    this.accadj = random(0.01, 0.4);
    this.velReduction = random(0.7, 0.9);
    

  }

  update() {
    mouseVec = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouseVec, this.pos);
    this.acc.mult(0.7);
    this.vel.mult(this.velReduction);
    this.acc.mult(this.accadj);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    


  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255,random(60,64),random(120,129), random(5,255));
    ellipse(0, 0, this.dia, this.dia);

    if (DEBUG_MODE) {
      //stroke(255, 255, 255);
      //strokeWeight(3);
      //line(0, 0, this.vel.x, this.vel.y);
    }
    pop();

  }
}
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
};