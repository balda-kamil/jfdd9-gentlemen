'use strict';

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.game-start').addEventListener('click', function() {
		taskGame.startGame();
	});
});

const taskGame = {

	// game starting point data
	gamePoints : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
	gameMoney : [ 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100 ],
	gameTotalPoints : 40,
	gameTotalMoney : 0,

	/*
	gameTask : function (points, price) { // function to display game board

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
	*/

	taskClick : function (elem) {
		// add money to 'game-money' when '.game-task' clicked
		const taskMoney = elem.target.firstChild.firstChild.firstChild.nextSibling.innerHTML;
		let gameMoney = document.querySelector('.game-money');
		gameMoney.innerHTML = (Number(gameMoney.innerHTML) + Number(taskMoney)).toString();

		// subtract points from 'game-points' when '.game-task' clicked
		const taskPoints = elem.target.firstChild.firstChild.nextSibling.firstChild.innerHTML;
		let gamePoints = document.querySelector('.game-points');
		gamePoints.innerHTML = (Number(gamePoints.innerHTML) - Number(taskPoints)).toString();
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

		// mixing the tables with task points and money
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

			// display task element and ...
			const board = document.querySelector('.game-board');
			const task = document.createElement('div');
			board.appendChild(task);
			task.classList.add('game-task');

			// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
			let taskText = document.createElement('div');
			taskText.classList.add('game-task-text');
			taskText.innerHTML = '<p>$<span class="task-money">' + this.gameMoney[i] + '</span></p><p><span' +
					' class="task-points">' + this.gamePoints[i] + '</span> pkt</p>';
			task.appendChild(taskText);

//			this.gameTask(this.gamePoints[i], this.gameMoney[i]);

			task.addEventListener('click', this.taskClick.bind(this), true);
			// TODO 8: how to make 'game-task-text' invisible to mouse click?
		}

		// ... start timer downwards and stop it by 0
		let gameTimeDiv = document.querySelector('.game-time');
		let gameTimer = gameTimeDiv.innerHTML;
		let timerId = setInterval (function () {
			gameTimer--;
			if (gameTimer < 1) {
				clearInterval(timerId);
			}
			gameTimeDiv.innerHTML = gameTimer.toString();
		}, 1000);

		// TODO 6: show 'END GAME' text and 'RESTART GAME' button at the end of the game
		// when time or points are equal to 0
		// TODO 7: add max earned money (?)
	}
};

