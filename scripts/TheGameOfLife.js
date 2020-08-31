let disWidth = 100;
let disHeight = 100;
let cellSize = 10; //100 wide && 50 tall
let cells = [];
let colors;





//Call Definition
function Cell(x, y, alive) {
	this.x = x;
	this.y = y;
	this.alive = alive;
	this.aliveNeighbors = 0;
	this.lifeSpan = 0;

	this.update = function() {
		//If less than two neighbors or more than 3 neighbors are alive, you die
		if(this.alive) {
			if(this.aliveNeighbors < 2 || this.aliveNeighbors > 3) {
				this.alive = !this.alive;
			}
			if(this.lifeSpan < 10) {
				this.lifeSpan++;
			}
		}
		if(this.alive == false) {
			if(this.aliveNeighbors == 3) {
				this.alive = true; 
			}
			this.lifeSpan--;
		}
	}

	this.show = function() {
		if(this.lifeSpan == 0) {this.col = color(255, 255, 255);}	
		if(this.lifeSpan == 1) {this.col = color(255, 204, 204);}
		if(this.lifeSpan == 2) {this.col = color(255, 153, 153);}
		if(this.lifeSpan == 3) {this.col = color(255, 102, 102);}
		if(this.lifeSpan == 4) {this.col = color(255, 51, 51);}
		if(this.lifeSpan == 5) {this.col = color(255, 0, 0);}
		if(this.lifeSpan == 6) {this.col = color(204, 0, 102);}
		if(this.lifeSpan == 7) {this.col = color(255, 0, 127);}
		if(this.lifeSpan == 8) {this.col = color(255, 51, 153);}
		if(this.lifeSpan == 9) {this.col = color(255, 102, 178);}
		if(this.lifeSpan == 10) {this.col = color(0, 0, 255);}
		if(this.alive) {
			fill(this.col);
			rect(x*cellSize, y*cellSize, cellSize, cellSize);
		}
	}
}




//Extra Functions
function mouseDragged() {
	let xPos = floor(mouseX/cellSize);
	let yPos = floor(mouseY/cellSize);
	cells[xPos][yPos] = new Cell(xPos, yPos, true);
}

function countNeighbors(x, y) {
	let num = 0;
	//don't count neighbors of edge guys
	if(x == 0 || x == disWidth-1 || y == 0 || y == disHeight-1) {
	}
	else {
		for(let i = x-1; i < x+2; i++) {
			for(let j = y-1; j < y+2; j++) {
				if(cells[i][j].alive) {
					num++;
				}
			}
		}	
	}
	//if self is alive minus it from the num
	if(cells[x][y].alive) {num--;}
	return num;
}


//System Function
function setup() {
	createCanvas(disWidth*10, disHeight*10);
	for(let i = 0; i < disWidth; i++) {
		cells[i] = [];
		for(let j = 0; j < disHeight; j++) {
			cells[i][j] = new Cell(i*cellSize, j*cellSize, false);
		}
	} 

}

//How often the cells updates and change state
setInterval(()=> {
	//Assign aliveNeighbors of every cell
	let newCells = cells;
	for(let i = 0; i < disWidth; i++) {
		for(let j = 0; j < disHeight; j++) {
			newCells[i][j].aliveNeighbors = countNeighbors(i, j);
		}
	}
	cells = newCells;
	//Update the cells
	for(let i = 0; i < disWidth; i++) {
		for(let j = 0; j < disHeight; j++) {
			cells[i][j].update();
		}
	}
}, 100)

function draw() {
	background(0);
	//Draw all 5000 cells
	for(let i = 0; i < disWidth; i++) {
		for(let j = 0; j < disHeight; j++) {
			cells[i][j].show();
		}
	}

	for(let i = 0; i < disWidth; i++) {
		for(let j = 0; j < disHeight; j++) {
		}
	}
}


