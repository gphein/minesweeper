
'use strict';

const Grid = function(rows, cols, mines) {

	this.rows = rows;
	this.cols = cols;
	this.flags = {}
	this.mines = {};

	let x = -1;
	let y = -1;
	let mineCount = 0;

	while (mineCount < mines) {
		x = Math.floor(Math.random() * rows);
		y = Math.floor(Math.random() * cols);
		if (!(x in this.mines)) this.mines[x] = {};
		if (!(y in this.mines[x])) {
			this.mines[x][y] = true;
			mineCount++;
		}
	}

	this.cells = [[]];

	for (let r = 0; r < rows; r++) {		
		this.cells[r] = {};
		for (let c = 0; c < cols; c++) {
				this.cells[r][c] = -1;
		}
	}

};

Grid.prototype.count = function() {
	return this.rows * this.cols;
};

Grid.prototype.minesInProximity = function(row, col) {

	if (row < 0 || row >= this.rows) return 0;
	if (col < 0 || col >= this.cols) return 0;

	let total = 0;

	if (this.isMine(row - 1, col - 1)) total += 1;
	if (this.isMine(row - 1, col)) total += 1;
	if (this.isMine(row - 1, col + 1)) total += 1;
	if (this.isMine(row, col - 1)) total += 1;
	if (this.isMine(row, col + 1)) total += 1;
	if (this.isMine(row + 1, col - 1)) total += 1;
	if (this.isMine(row + 1, col)) total += 1;
	if (this.isMine(row + 1, col + 1)) total += 1;

	return total;

};

Grid.prototype.reveal = function(row, col) {

	if (row < 0 || row >= this.rows) return; // invalid row
	if (col < 0 || col >= this.cols) return; // invalid col	
	if (this.cells[row][col] >= 0) return; // already revealed

	const nearByMines = this.minesInProximity(row, col);

	this.cells[row][col] = nearByMines;

	if (nearByMines == 0) {
		this.reveal(row - 1, col - 1);
		this.reveal(row - 1, col);
		this.reveal(row - 1, col + 1);
		this.reveal(row, col - 1);
		this.reveal(row, col + 1);
		this.reveal(row + 1, col - 1);
		this.reveal(row + 1, col);
		this.reveal(row + 1, col + 1);
	}

};

Grid.prototype.isMine = function(row, col) {

	if (row in this.mines) {
		return this.mines[row][col] === true;
	} else {
		return false;
	}

};


Grid.prototype.isFlagged = function (row, col) {

	if (!(row in this.flags)) return false;
	return this.flags[row][col] == true; // entry could be undefined so return the check
	
};

Grid.prototype.toggleFlag = function (row, col) {
	
	if (!(row in this.flags)) this.flags[row] = {};

	if (col in this.flags[row]) {
		this.flags[row][col] = !this.flags[row][col];		
	} else {
		this.flags[row][col] = true;		
	}

};

Grid.prototype.state = function() {

// win(1) or running(0)

	let row = 0;
	let col = 0;

	// check for unflagged mines
	for (row in this.mines) {
		for (col in this.mines[row]) {
			if (!(row in this.flags)) return 0;
			if (this.flags[row][col] == undefined) return 0
		}
	}

	// check for flagged safe cells
	for (row in this.flags) {
		for (col in this.flags[row]) {
			if (!this.isMine(row, col)) return 0
		}
	}

	return 1;

};





