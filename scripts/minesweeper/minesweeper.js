let size;
let rightPressed = false;
let gameStatus = true;
let dim = 15;
let boxArray = [];
function setup() {
	createCanvas(dim*50, dim*50);
	size = width/dim;
	//create Boxes with probability of being bombs 20%
	for(var i = 0; i < dim; i++) {
		boxArray[i] = []
		for(var j = 0; j < dim; j++) {
			let bombstat = random(0, 1) < 0.2;
			boxArray[i][j] = new Box(i*size, j*size, bombstat);
		}
	}

	//assign values to each box
	for(var i = 0; i < dim; i++) {
		for(var j = 0; j < dim; j++) {
			//assign values to boxes
			let value = 0;
			for(var x = -1; x < 2; x++) {
				if(boxArray[i+x] === undefined) {}
				else{
					for(var y = -1; y < 2; y++) {
						if(boxArray[i+x][j+y] !== undefined) {
							if(boxArray[i+x][j+y].isBomb) {value++;}
						}
					}
				}
			}
			boxArray[i][j].value = value;
		}
	}
	
}






function draw() {
	background(51);
	if(gameStatus) {
		for(var i = 0; i < dim; i++) {
			for(var j = 0; j < dim; j++) {
				if(boxArray[i][j].isBomb && boxArray[i][j].clicked) {gameStatus = false;}
				boxArray[i][j].show();
			}
		}
	}
	else {
		background(0);
		fill(255);
		textAlign(CENTER);
		textSize(100);
		text("Game Over", height/2, width/4);
	}

	for(var i = 0; i < dim; i++) {
		for(var j = 0; j < dim; j++) {
			//clicking 0 turnes boxes around it
			if(boxArray[i][j].value === 0 && boxArray[i][j].clicked) {
				for(var x = -1; x < 2; x++) {
					if(boxArray[i+x] !== undefined) {
						for(var y = -1; y < 2; y++) {
							if(boxArray[i+x][j+y] !== undefined) {
								if(boxArray[i+x][j+y].isBomb !== true) {
									boxArray[i+x][j+y].clicked = true;
								}
							}
						}
					}
				}
			}
		}
	}
}


