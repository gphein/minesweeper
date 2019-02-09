
'use strict';

const showMines = function(game) {

	for (let row = 0; row < game.rows; row++) {
		for (let col = 0; col < game.cols; col++) {
			if (game.isMine(row, col) == true) {
				$(`.cell[row=${row}][col=${col}]`).text('X');
			}
		}
	}

};