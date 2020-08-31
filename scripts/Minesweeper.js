
let cellSize;
let size;
let grid = [];
let gameState = true;

function setup() {
	createCanvas(windowHeight, windowHeight)
	size = 10;
	cellSize = height/size;

for(var i = 0; i < size; i++) {
	grid[i] = [];
	for(var j = 0; j < size; j++) {
		grid[i][j] = new Cell(i, j);
		if(random() < 0.2) {
			grid[i][j].isMine = true;
		} else{
			grid[i][j].isMine = false;
		}
	}
}

for(var i = 0; i < size; i++) {
	for(var j = 0; j < size; j++) {
		grid[i][j].countMines();
	}
}

}

function mousePressed() {
	for(var i = 0; i < size; i++) {
		for(var j = 0; j < size; j++) {
			if(grid[i][j].containMouse(mouseX, mouseY)) {
				grid[i][j].revealed = true;
			}
		}
	}
}

function draw() {
	if(gameState) {
    	for(var i = 0; i < size; i++) {
    		for(var j = 0; j < size; j++) {
    			grid[i][j].countMines();
    			grid[i][j].draw();
    		}
    	}	
	} 
	else {
		const rectPos = width/3;
		fill(255);
		rect(rectPos, rectPos, rectPos+5, rectPos+5);
		textAlign(CENTER, CENTER);
		textSize(40);
		fill(0);
		text("Game Over!", rectPos+150, rectPos+150);
	}
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.x = i*cellSize;
	this.y = j*cellSize;
	this.s = width/size;
	this.revealed = false;
	this.isMine = undefined;
	this.containMouse = function(x, y) {
		return(x > this.x && x < this.x+this.s && y > this.y && y < this.y+this.s);
		
	}
	this.value = 0;
	this.countMines = function() {
		if(this.isMine) {
			return -1;
		}
		var mines = 0;
		for(var x = -1; x < 2; x++) {
			for(var y = -1; y < 2; y++) {
				var i = this.i+x;
				var j = this.j+y;
				if(i > -1 && i < size && j > -1 && j < size) {
					if(grid[i][j].isMine) {
						mines++;
					}
				}

			}
		this.value = mines;
		}
	}
	this.draw = function() {
		strokeWeight(5);
		if(this.revealed) {fill(100);}
		else {fill(255);}
		rect(this.x, this.y, this.s, this.s);
		if(this.revealed) {
			if(this.isMine) {
				fill(0);
				ellipse(this.x + this.s/2, this.y + this.s/2, this.s/2, this.s/2);
				gameState = false;

			} else{
				textAlign(CENTER, CENTER);
				if(this.value === 1) {
					fill(0, 0, 255);
				}
				else if(this.value === 2) {fill(0, 255, 0);}
				else if(this.value === 3) {fill(255, 0, 0);}
				else if(this.value === 4) {fill(139,0,139);}
				textSize(50);
				text(this.value, this.x + this.s/2, this.y + this.s/2);
			}
		}
	}
}
