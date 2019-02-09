'use strict';

const initView = function() {
	
	const grid = $('#grid');

	let row = 0;
	let col = 0;
	let rowContainer;

	rowContainer = $('<div class=row></div>');
	for (let k = 0; k < game.count(); k++) {
		rowContainer.append($(`<div class='hide cell' row=${row} col=${col}></div>`));
		col = (col + 1) % game.cols;
		if (col == 0) {
			grid.append(rowContainer);
			rowContainer = $('<div class=row></div>');
			row += 1;
		}
	}

	grid.on('click', function(evt) {

		const target = $(evt.target);
		const row = target.attr('row');
		const col = target.attr('col');

		if (row == undefined || col == undefined) return;
		if (game.isMine(row, col) == true) {
			$('#message').text('Game Over!');
			showMines(game);
		} else {
			game.reveal(parseInt(row), parseInt(col));
			refresh(game);
			if (game.state() == 1) {
				$('#message').text('Winner, winner, chicken dinner!!');
			}
		}

	});

	grid.on('contextmenu', function(evt) {
		evt.preventDefault();

			const target = $(evt.target);
			const row = target.attr('row');
			const col = target.attr('col');

			if (row == undefined || col == undefined) return;
			game.toggleFlag(row, col);			
			refresh(game);
			if (game.state() == 1) {
				$('#message').text('Winner, winner, chicken dinner!!');
			}

	});



};


