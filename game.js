function task(points, price) {
	var board = document.querySelector('.game-board');
	var task = document.createElement('div');
	board.appendChild(task);
	task.classList.add('game-task');

	var taskText = document.createElement('div');
	taskText.classList.add('game-task-text');
	taskText.innerHTML = '<p>$' + price + '</p><p>' + points + ' pkt</p>';
	task.appendChild(taskText);
}

var game_data = [1, 1200, 2, 1100, 3, 1000, 4, 900, 5, 800, 6, 700, 7, 600, 8, 500, 9, 400, 10, 300, 11, 200, 12, 100];

for (var i = 0; i < 24; i += 2) {
	task(game_data[i], game_data[i + 1]);
}
