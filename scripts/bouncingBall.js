function setup() {
	createCanvas(1200, 800);
	frameRate(60);
}
//variables
let gravity = 0.98;
let friction = 1;
let balls = [];
let clicked = false;

//ball object
function Ball(x, y, d) {
	this.x = x;
	this.xVel = random(-5, 5);
	this.y = y;
	this.yVel = 0;
	this.mass = d;
	this.acc = gravity/this.mass;
	this.d = d;
	this.col = color(random(0, 255), random(0, 255), random(0, 255));
	this.draw = function() {
		fill(this.col);
		ellipse(this.x, this.y, this.d);
	}
	this.update = function() {
		this.yVel += gravity + this.acc;
		this.y += this.yVel;
		this.x += this.xVel;

		//boundary
		if(this.y > height-this.d/2) {
			this.yVel *= -friction;
			this.y = height-this.d/2;
		}
		if(this.x < 0+this.d/2 || this.x > width-this.d/2) {
			this.xVel *= -friction;
		}
		

	}
}




function keyPressed() {
	if(keyCode === UP_ARROW) {
	balls.push(new Ball(random(width/2-100, width/2+100), random(height/2-100, height/2), random(100, 200)));
	}
}	



function draw() {
	background(0);
	for(var i = 0; i < balls.length; i++) {
		if(balls[i].d < 0) {}
		else{
			balls[i].draw();
			balls[i].update();
		}

		var dist = sqrt(sq(balls[i].x-mouseX) + sq(balls[i].y-mouseY));
		if(dist < balls[i].d) {
			balls[balls.length] = new Ball(balls[i].x, balls[i].y, balls[i].d/2);
			balls[balls.length] = new Ball(balls[i].x, balls[i].y, balls[i].d/2);
			balls.splice(i, 1);
		}
		
	}	
}