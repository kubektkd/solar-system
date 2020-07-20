const GravitationalConstant = 0.0000000000674;
const AU = 1.5;
const globalScale = 0.5;
const timeStep = 300;

class SolarObject {
  constructor(positionX = 0, positionY = 0) {
    this.positionX = positionX;
    this.positionY = positionY;
  }
}

class CelestialBody extends SolarObject {
  constructor(mass = 1, radius = 1, initialVelocity = 0, positionX, positionY) {
    super(positionX, positionY)
    this.mass = mass;
    this.radius = radius;
    this.initialVelocity = initialVelocity;
    this.setCurrentVelocity(initialVelocity);
    this.forceX = 0;
    this.forceY = 0;
  }

  setCurrentVelocity(velocity) {
    this.currentVelocityX = 0;
    this.currentVelocityY = velocity;
  }
}

class Planet extends CelestialBody {
  constructor(name, mass, radius, initialVelocity, positionX, positionY) {
    super(mass, radius, initialVelocity, positionX, positionY);
    this.radius = radius * 2 * Math.abs(1/globalScale);
    this.positionX = positionX * 100 * Math.abs(1/globalScale);
    this.name = name;
  }
}

class Star extends CelestialBody {
  constructor(name, temperature, mass, radius, initialVelocity, positionX, positionY) {
    super(mass, radius, initialVelocity, positionX, positionY);
    this.name = name;
    this.temperature = temperature;
  }
}

class Moon extends CelestialBody {
  constructor(name, mainPlanet, mass, radius, initialVelocity, positionX, positionY) {
    super(mass, radius, initialVelocity, positionX, positionY);
    this.radius = radius * 2 * Math.abs(1/globalScale);
    this.positionX = positionX * 105 * Math.abs(1/globalScale);
    this.name = name;
    this.mainPlanet = mainPlanet;
  }
}

let sun = new Star('Sun', 5000000, 333000, 109, 0);
console.log(sun);

let earth = new Planet('Earth', 1, 1, 29.78, AU, 0);
console.log(earth);

let moon = new Moon('Moon', earth, 0.0123, 0.2727, 1.022, 1.0026*AU, 0)
console.log(moon);

bodies = [sun, earth, moon];

function attraction(bodyA, bodyB) {
  let distance = Math.hypot(bodyB.positionX - bodyA.positionX, bodyB.positionY - bodyA.positionY);
  let force = 0
  if (distance != 0) {
    force = (GravitationalConstant * bodyA.mass * bodyB.mass) / (Math.pow(distance, 2));
  }
  let angle = Math.atan2(bodyB.positionY - bodyA.positionY, bodyB.positionX - bodyA.positionX);
  bodyA.forceX += force * Math.cos(angle);
  bodyA.forceY += force * Math.sin(angle);
}

function update(body) {
  body.currentVelocityX += (body.forceX / body.mass) * timeStep;
  body.currentVelocityY += (body.forceY / body.mass) * timeStep;

  body.positionX += body.currentVelocityX * timeStep;
  body.positionY += body.currentVelocityY * timeStep;
}

var canvas = document.getElementById('solar-system');
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

window.onload = window.onresize = function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  draw()
}

function drawOrbit(planet, ctx) {
  ctx.strokeStyle = 'lightgray';
  ctx.arc(
    0, 0,
    planet.positionX,
    0, Math.PI * 2);
    ctx.stroke();
}

function drawStar(star, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    star.positionX,
    star.positionY,
    star.radius * globalScale,
    0, Math.PI * 2);
  ctx.fill();
}

function drawPlanet(planet, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    planet.positionX,
    planet.positionY,
    planet.radius,
    0, Math.PI * 2);
  ctx.fill();
}

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  ctx.translate(canvas.width/2, canvas.height/2);

  function draw() {
    // drawing code here
    var radgrad1 = ctx.createRadialGradient(sun.positionX, sun.positionY, sun.radius*.1, sun.positionX, sun.positionY, sun.radius);
    radgrad1.addColorStop(0, '#F4F201');
    radgrad1.addColorStop(0.8, '#E4C700');
    radgrad1.addColorStop(1, 'rgba(228, 199, 0, 0)');

    var radgrad2 = ctx.createRadialGradient(earth.positionX, earth.positionY, earth.radius, earth.positionX, earth.positionY, 0);
    radgrad2.addColorStop(0, '#00C9FF');
    radgrad2.addColorStop(0.8, '#00B5E2');
    radgrad2.addColorStop(1, 'rgba(0, 201, 255, 0)');

    drawStar(sun, radgrad1, ctx);
    
    drawPlanet(earth, radgrad2, ctx);
    ctx.fillText('Earth', earth.positionX + 5, earth.positionY);
    drawOrbit(earth, ctx);

    drawPlanet(moon, 'gray', ctx);
    ctx.fillText('Moon', moon.positionX + 5, moon.positionY);

    setInterval(function() {
      for(let i=0; i<bodies.length; i++) {
        bodies[i].forceX = 0;
        bodies[i].forceY = 0;
        for(let j=0; j<bodies.length; j++) {
          if (i != j) {
            attraction(bodies[i], bodies[j]);
          }
        }
      }
      for(let i=0; i<bodies.length; i++) {
        update(bodies[i])
      }
      // draw();
    }, timeStep)
  }
} else {
  // canvas-unsupported code here
  alert("Your browser in currently not supporting Canvas.\nTry different browser.")
}