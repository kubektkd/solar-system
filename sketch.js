let bodies = [];
const timeStep = 3;
const G = .1;

let text1 = "Solar System Simulation";
let text2 = "Simple simulation of Newton's laws."

function setup() {
  let width = windowWidth;
  let height = windowHeight;

  createCanvas(width, height);
  background(0);

  // Sun
  bodies[0] = new planet(width/2, height/2, 20, 1600);
  bodies[0].color = "#ffc300";

  // Mercury
  bodies[1] = new planet(width/2-100, height/2, 3, .0005);
  bodies[1].color = "#78878c";

  // Venus
  bodies[2] = new planet(width/2-220, height/2, 5, .002);
  bodies[2].color = "#e0c870";

  // Earth
  bodies[3] = new planet(width/2+330, height/2, 6, .05);
  bodies[3].color = "#709dd8";

  // Mars
  bodies[4] = new planet(width/2, height/2+450, 5.5, .0045);
  bodies[4].color = "#bb2020";

  // Moon
  bodies[5] = new planet(width/2+335, height/2, .2, .005);
  bodies[5].color = "#eee";

  // initial velocities
  bodies[1].velocityY = 1.2;
  bodies[2].velocityY = .8;
  bodies[3].velocityY = -.70;
  bodies[4].velocityX = .6;
  bodies[5].velocityY = -.72;
}

function draw() {
  background(0, 0, 0, 30);
  fill('#26d38e');
  strokeWeight(0);
  textSize(30);
  textStyle(ITALIC);
  text(text1, width-400, 60);
  textSize(15);
  textStyle(NORMAL);
  text(text2, width-370, 70, 250, 500);

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