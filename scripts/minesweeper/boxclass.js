class Box {
	constructor(x, y, isBomb) {
		this.x = x;
		this.y = y;
		this.isBomb = isBomb;
		this.clicked = false;
		this.value = 0;
		this.flagged = false;
	}
	show() {
		if(this.clicked) {
			fill(255);
			rect(this.x, this.y, size, size);
			fill(0);
			textSize(20);
			textAlign(CENTER);
			text(this.value, this.x+size/2, this.y+size/2+5);
		}
		else {
			fill(150);
			rect(this.x, this.y, size, size);
			if(this.flagged) {
				fill(255, 0, 0);
				ellipseMode(CENTER);
				ellipse(this.x+size/2 , this.y+size/2, size/2, size/2);
			}
		}
	}
}