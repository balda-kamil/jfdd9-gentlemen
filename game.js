'use strict';

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.game-start').addEventListener('click', function() {
		taskGame.startGame();
	});
});

const taskGame = {

	// game starting point data
	gamePoints: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
	gameMoney: [ 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100 ],

	// function to display game board
	gameTask : function (points, price) {

		// display task element and ...
		let board = document.querySelector('.game-board');
		let task = document.createElement('div');
		board.appendChild(task);
		task.classList.add('game-task');

		// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
		let taskText = document.createElement('div');
		taskText.classList.add('game-task-text');
		taskText.innerHTML = '<p>$' + price + '</p><p>' + points + ' pkt</p>';
		task.appendChild(taskText);
	},

	startGame : function () {

		// hide start button and instruction
		let startButton = document.querySelector('.game-start');
		startButton.classList.add('display-none');
		let instructionText = document.querySelector('.game-instruction');
		instructionText.classList.add('display-none');

		// TODO 1: clear board when restart the game
		// TODO 2: add class to '.game-task' on hover
		// TODO 3: make '.game-task' disappear when clicked
		// TODO 4: add money to 'game-money' when '.game-task' clicked
		// TODO 5: subtract points from 'game-points' when '.game-task' clicked

		// mixing of task points and money
		for (let i = this.gamePoints.length - 1; i > 0; i--) {
			let swap = Math.floor(Math.random() * i);
			let tmpPoints = this.gamePoints[i];
			let tmpMoney = this.gameMoney[i];
			this.gamePoints[i] = this.gamePoints[swap];
			this.gameMoney[i] = this.gameMoney[swap];
			this.gamePoints[swap] = tmpPoints;
			this.gameMoney[swap] = tmpMoney;
		}

		// display tasks on game board and ...
		for (let i = 0; i < 12; i++) {
			this.gameTask(this.gamePoints[i], this.gameMoney[i]);
		}

		// ... start timer downwards and stop it by 0
		let gameTimeDiv = document.querySelector('.game-time');
		let gameTimer = gameTimeDiv.innerHTML;
		let timerId = setInterval (function () {
			gameTimer--;
			if (gameTimer < 0) {
				timerId.clearInterval();
			}
			gameTimeDiv.innerHTML = gameTimer.toString();
		}, 1000);

		// TODO 6: show 'END GAME' and 'RESTART GAME' buttons at the end of the game
		// TODO 7: add max earned money (?)
	}
};

