function task(points, price) {
	var wrapper = document.createElement('div');
	var taskText = document.createElement('div');

	taskText.classList.add('game-task-text');
	taskText.innerHTML = '<p>$' + price + '</p><p>' + points + ' pkt</p>';

	wrapper.appendChild(taskText);
	return wrapper;
}

task(2, 100);

var x = document.querySelector('.game-task-text');

x.innerText = 'foo';