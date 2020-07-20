function planet(positionX, positionY, diameter, mass) {
  this.mass = mass;
  this.positionX = positionX;
  this.positionY = positionY;
  this.diameter = diameter;
  this.velocityX = 0;
  this.velocityY = 0;
  this.forceX = 0;
  this.forceY = 0;

  this.color = "#ff6a6";

  this.display = function() {
    strokeWeight(2);
    stroke(this.color);
    fill(this.color);
    ellipse(this.positionX, this.positionY, this.diameter, this.diameter);
  };

  this.attraction = function(other) {
    let distance = dist(other.positionX, other.positionY, this.positionX, this.positionY);
    let force = 0;
    if (distance != 0) {
      force = (G * this.mass * other.mass) / (distance * distance);
    }
    let angle = atan2(other.positionY - this.positionY, other.positionX - this.positionX);
    this.forceX += force * cos(angle);
    this.forceY += force * sin(angle);
  };

  this.update = function() {
    this.velocityX += (this.forceX / this.mass) * timeStep;
    this.velocityY += (this.forceY / this.mass) * timeStep;

    this.positionX += (this.velocityX * timeStep);
    this.positionY += (this.velocityY * timeStep);
  };
}