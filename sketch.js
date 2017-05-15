"use strict";
var p;
var particles = [];
var canvas, img;
var s;
var grow;
var on;

// Special thanks to Maggie Wlash. Check out her website at http://www.maggiemwalsh.com/

function setup() {
textFont("Questrial");
 canvas = createCanvas(window.innerWidth, window.innerHeight);
  img= loadImage("./assets/logo.png");
  
  for (var i = 0; i<= 100; i++) {
    particles.push(new Particle(150, height));
    particles.push(new Particle2(100,height));
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
    for (var i = 0; i < particles.length; i++) {
    particles[i].modify();
    particles[i].display();
    }
    if(mouseIsPressed){
      window.open("./home.html","_self");
    }
  }
  else{
    on=false;
      for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();

  }
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
  text("Tyler Rhorick's Portfolio",width/2,height/2+200);
}
  image(img,width/2,height/2,200,200);
}
var mouseVec;
var randomVec;

class Particle {
  constructor(x, y) {
    this.dia = random(2, 4);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(1, 0);
    this.accadj = random(0.01, .4);
    this.velReduction = .7;
    

  }

  update() {
    mouseVec = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouseVec, this.pos);
    this.acc.mult(2);
    this.vel.mult(this.velReduction);
    this.acc.mult(this.accadj);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
  }
  modify() {
    this.pos=createVector(random(width/2-150,width/2+150),random(height/2-150,height/2+150));
    this.acc=createVector(-.05,.05);
    this.velocity= createVector(random(-10,10),random(-10,10));
    this.vel.add(this.acc);
    this.pos.add(this.velocity);
    // mouseVec = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouseVec, this.pos);
    // randomVec= p5.Vector.random2D();
    // this.acc=p5.Vector.sub(randomVec,this.pos);
    // this.acc.mult(2);
    // this.vel.mult(this.velReduction);
    // this.acc.mult(this.accadj);
    // this.vel.add(this.acc);
    
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255,random(60,64),random(120,129), random(5,255));
    rect(0, 0, this.dia, this.dia);

    pop();

  }
}
class Particle2 {
  constructor(x, y) {
    this.dia = random(2, 4);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(1, 0);
    this.accadj = random(0.01, 0.4);
    this.velReduction = .7;
    

  }

  update() {
    mouseVec = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouseVec, this.pos);
    this.acc.mult(2);
    this.vel.mult(this.velReduction);
    this.acc.mult(this.accadj);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  

  }
  modify() {
  this.pos=createVector(random(width/2-150,width/2+150),random(height/2-150,height/2+150));
  this.acc=createVector(-.05,.05);
    this.velocity= createVector(random(-10,10),random(-10,10));
    this.vel.add(this.acc);
    this.pos.add(this.velocity);
    
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, random(5,255));
    rect(0, 0, this.dia, this.dia);

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