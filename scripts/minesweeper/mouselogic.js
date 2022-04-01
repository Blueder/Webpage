document.oncontextmenu = function() {
    return false;
}

function mouseClicked() {
	for(var i = 0; i < dim; i++) {
		for(var j = 0; j < dim; j++) {
			let arr = boxArray[i][j]; if(mouseX > arr.x && mouseX < arr.x+size && mouseY > arr.y && mouseY < arr.y+size) {
				if(arr.flagged) {}
				else if(arr.isBomb) {gameStatus = false;}
				else if(arr.clicked) {
					let value = 0;
					for(let x = -1; x < 2; x++) {
						if(boxArray[i+x] !== undefined) {
							for(let y = -1; y < 2; y++) {
								if(boxArray[i+x][j+y] !== undefined) {
									if(boxArray[i+x][j+y].flagged) {value++;}
								}
							}
						}
					}
					if(value === arr.value) {
						for(let x = -1; x < 2; x++) {
							if(boxArray[i+x] !== undefined) {
								for(let y = -1; y < 2; y++) {
									if(boxArray[i+x][j+y] !== undefined) {
										if(boxArray[i+x][j+y].flagged) {}
										else{boxArray[i+x][j+y].clicked = true;}
									}
								}
							}
						}
					}
				}
				else{arr.clicked = true;}
			}
		}
	}
}



function mousePressed() {
	if(mouseButton === RIGHT) {
		for(var i = 0; i < dim; i++) {
			for(var j = 0; j < dim; j++) {
				let arr = boxArray[i][j];
				if(mouseX > arr.x && mouseX < arr.x+size && mouseY > arr.y && mouseY < arr.y+size) {
					if(arr.flagged) {arr.flagged = false;}
					else {boxArray[i][j].flagged = true;}
				}
			}
		}
	}
}

//box checks x(-1, 1), y(-1, 1) if amount(box.flagged) === box.value => opens surrounding unflagged boxes