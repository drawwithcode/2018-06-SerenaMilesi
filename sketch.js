var myData; //empty variable
var myAirplane; //mouse icons
var myImage;
var myImage2;
var myImage3;
var onClick = 0; //to check if the pin has been clicked

function preload() {
  // put preload code here
  myData = loadJSON('assets/airports.json');
  myAirplane = loadImage("./assets/myAirplane.png");
  myImage = loadImage("./assets/landscape.jpg");
  myImage2 = loadImage("./assets/pin.png");
  myImage3 = loadImage("./assets/coo.png");
}

var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < myData.airports.length; i++) {
    var astro = myData.airports[i];

    var x = random(width);
    var y = random(height);
    var d = astro.passengers / 100000;
    var l = astro.name;
    var c = astro.code;
    var e = astro.elevation;
    var p = astro.passengers;

    var newBall = new Ball(x, y, d, l, c, e, p);
    balls.push(newBall);
  }
}

function draw() {
  background('#F9F2DD');

  var myText1 = 'Busiest airports in Scotland ranked by total passenger traffic in 2017';
  push();
  fill('#5188CB');
  textFont('Montserrat');
  textStyle(BOLD);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(myText1, windowWidth / 2, windowHeight / 10);
  pop();

  image(myImage, 0, 150, [width], windowHeight);

  //mouse
  image(myAirplane, mouseX, mouseY, 40, 40);

  for (var j = 0; j < balls.length; j++) {
    balls[j].move();
    balls[j].display();
  }
}

function Ball(_x, _y, _diameter, _label, _label2, _label3, _label4) {

  // Properties defined by constructor
  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.label = _label;
  this.label2 = _label2;
  this.label3 = _label3;
  this.label4 = _label4;

  // Hardcoded properties
  this.color = " #3B3DBA";
  this.speed = 1;
  this.yDir = 1;
  this.xDir = 1;

  // Methods
  this.move = function() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;

    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  };

  this.display = function() {
    fill(this.color);
    image(myImage2, this.x, this.y, this.size, this.size);
    noStroke();

    //Name of the airport
    if (onClick == 1) {
      fill("white");
      textSize(20);
      text(this.label, this.x + 120, this.y + 5);
      textSize(15);
      text(this.label2, this.x + 120, this.y + 25);
    }
    //Airport abbreviation
    else if (onClick == 2) {
      fill("white");
      textSize(20);
      text(this.label, this.x + 120, this.y);
      textSize(15);
      text(this.label2, this.x + 120, this.y + 25);
      text(this.label3, this.x + 120, this.y + 50);
    }
    //Elevation and passengers
    else if (onClick == 3) {
      fill("white");
      textSize(20);
      text(this.label, this.x + 120, this.y);
      textSize(15);
      text(this.label2, this.x + 120, this.y + 25);
      text(this.label3, this.x + 120, this.y + 50);
      text(this.label4, this.x + 120, this.y + 75);
    }
    //book a flight
    else if (onClick > 3) {
      fill("#F9F2DD");
      textSize(20);
      textAlign(CENTER);
      text("Book a flight right now!", windowWidth / 2, windowHeight - 100);
      image(myImage3, (windowWidth / 4) - 30, (windowHeight / 5) - 10, myImage3.width / 2, myImage3.height / 2);

    } else {
      var myText2 = 'Click on the bubbles to discover more...' //instructions
      push();
      fill('#58A5DE');
      textFont('Montserrat');
      textStyle(BOLD);
      noStroke();
      textSize(20);
      textAlign(CENTER);
      text(myText2, windowWidth / 2, windowHeight / 7);
      pop();
    }
  }
}

//first click
function mouseClicked() {
  onClick += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
