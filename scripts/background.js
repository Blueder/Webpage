
const connectDistance = 200; //cells that are closer than 100px will connect;
let canvas;
const cellsNumber = 100;
const cellSize = 5;
let cells = [];


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    frameRate(30);
    filter(BLUR, 4);
    for(let i = 0; i < cellsNumber; i++) {
        cells.push(new Cell(random(0, windowWidth), random(0, windowHeight), createVector(random(1, 2), random(1, 2))));
    } 
}

function Cell(x, y, vel) {
    this.pos = createVector(x, y)
    this.vel = vel;
    this.update = function() {
        if(this.pos.x+this.vel.x > width | this.pos.x+this.vel.x < 0) {
            this.vel.x = - this.vel.x;
        }
        if(this.pos.y+this.vel.y > height | this.pos.y+this.vel.y < 0) {
            this.vel.y = - this.vel.y;
        }
        this.pos.add(this.vel);
    }
    this.show = function() {
        fill(255);
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, cellSize, cellSize);
    }
}

function draw() {
    background(15, 28, 112);
    for(let i = 0; i < cells.length; i++) {
        cells[i].update();
        cells[i].show();
    }

    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells.length; j++) {
            if(i !== j) {
                areTwoCellsClose(cells[i], cells[j]);
            }
        }
    }
}

function areTwoCellsClose(cell1, cell2) {
    if(dist(cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y) < connectDistance) {
        stroke(150);
        line(cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y);
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}