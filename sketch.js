const timeStep = 3;
const G = .1;
let bodies = [];
let scaleFactor = .9;

let text1 = "Solar System Simulation";
let text2 = "Simple simulation of Newton's laws. (not in scale)"
let bg;

function preload() {
  bg = loadImage('space.jpg');
}

function setup() {
  let width = windowWidth;
  let height = windowHeight;

  background(bg);
  createCanvas(width, height);

  // Sun
  bodies[0] = new planet(0, 0, 20, 1600);
  bodies[0].color = "#ffc300";

  // Mercury
  bodies[1] = new planet(-100, 0, 3, .0005);
  bodies[1].color = "#78878c";

  // Venus
  bodies[2] = new planet(-220, 0, 5, .002);
  bodies[2].color = "#e0c870";

  // Earth
  bodies[3] = new planet(330, 0, 6, .05);
  bodies[3].color = "#709dd8";

  // Mars
  bodies[4] = new planet(0, 450, 5.5, .0045);
  bodies[4].color = "#bb2020";

  // Moon
  bodies[5] = new planet(335, 0, 1, .005);
  bodies[5].color = "#eee";

  // initial velocities
  bodies[1].velocityY = 1.2;
  bodies[2].velocityY = .8;
  bodies[3].velocityY = -.70;
  bodies[4].velocityX = .6;
  bodies[5].velocityY = -.72;
}

function draw() {
  scale(scaleFactor);
  translate(width/(scaleFactor*2), height/(scaleFactor*2));
  background(bg);
  background(0, 0, 0, 20);
  fill('#26d38e');
  strokeWeight(0);
  textSize(30);
  textStyle(ITALIC);
  text(text1, width/(scaleFactor*2)-400, -(height/(scaleFactor*2))+60);
  textSize(15);
  textStyle(NORMAL);
  text(text2, width/(scaleFactor*2)-370, -(height/(scaleFactor*2))+70, 250, 500);

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].display();
  }

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].forceX = 0;
    bodies[i].forceY = 0;

    for (let j = 0; j < bodies.length; j++) {
      if (i != j) {
        bodies[i].attraction(bodies[j]);
      }
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].update();
  }
}