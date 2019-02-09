
'use strict';

const refresh = function(game) {

	for (let row = 0; row < game.rows; row++) {
		for (let col = 0; col < game.cols; col++) {

			if (game.isFlagged(row, col) == true) {
				$(`.cell[row=${row}][col=${col}]`).addClass('flagged');
				continue;
			} else {
				$(`.cell[row=${row}][col=${col}]`).removeClass('flagged');				
			}

			if (game.cells[row][col] > 0) {
				$(`.cell[row=${row}][col=${col}]`).text(game.cells[row][col]);
			}

			if (game.cells[row][col] >= 0) {
				$(`.cell[row=${row}][col=${col}]`).removeClass('hide').addClass('revealed');
			}

		}
	}

};