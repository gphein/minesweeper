
'use strict';

const resetBoard = function(game) {

	for (let row = 0; row < game.rows; row++) {
		for (let col = 0; col < game.cols; col++) {
			$(`.cell[row=${row}][col=${col}]`).removeClass('flagged');				
			$(`.cell[row=${row}][col=${col}]`).text('');
			$(`.cell[row=${row}][col=${col}]`).removeClass('revealed').addClass('hide');
		}
	}

};