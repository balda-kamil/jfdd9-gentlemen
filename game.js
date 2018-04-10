// TODO 1: make clearGame function work properly
// TODO 2: add score to text info
// TODO 3: mute game board under the START button
// TODO 4: add max earned money (?)

'use strict';

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.game-start').addEventListener('click', function() {
		taskGame.startGame();
	});
});

const taskGame = {

	// game initials
	initialPoints : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
	initialMoney : [ 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100 ],
	gameTotalPoints : 40,
	gameTotalMoney : 0,
	gameTotalTime : 60,
	gamePoints : [],
	gameMoney : [],
	money : 0,
	timerId : 0,

	// click on the tile with a task
	taskClick : function (event) {
		let element = event.currentTarget;

		if (element.matches('.game-task')) {
			// add money to 'game-money' when '.game-task' clicked
			let taskMoney = element.getAttribute('data-money');
			let gameMoney = document.querySelector('.game-money');
			this.gameTotalMoney += parseInt(taskMoney);

			// subtract points from 'game-points' when '.game-task' clicked
			let taskPoints = element.getAttribute('data-points');
			let gamePoints = document.querySelector('.game-points');

			// check if the value of total points is less than 0 and then stop the game
			if (this.gameTotalPoints > 0) {
				this.gameTotalPoints -= parseInt(taskPoints);
				if (this.gameTotalPoints <= 0) {
					this.gameTotalPoints = 0;
					gamePoints.innerHTML = this.gameTotalPoints.toString();
					this.stopGame();
				}
				gamePoints.innerHTML = this.gameTotalPoints.toString();
				gameMoney.innerHTML = this.gameTotalMoney.toString();
			}
		}

		// make '.game-task' disappear when clicked
		element.classList.add('visibility-hidden');
	},
	
	// setting game to initials
	clearGame : function () {
		document.querySelector('.game-points').innerHTML = this.gameTotalPoints.toString();
		document.querySelector('.game-money').innerHTML = this.gameTotalMoney.toString();
		document.querySelector('.game-time').innerHTML = this.gameTotalTime.toString();
		for (let i = 0; i < this.initialPoints.length; i++) {
			this.gamePoints[i] = this.initialPoints[i];
			this.gameMoney[i] = this.initialMoney[i];
		}

		// TODO: here add clear board of remaining tasks
	},

	startGame : function () {
		
		// 1: clear board when start/restart the game
		this.clearGame();

		// hide start button and instruction
		let startButton = document.querySelector('.game-start');
		startButton.classList.add('display-none');
		let instructionText = document.querySelector('.game-instruction');
		instructionText.classList.add('display-none');

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

		// display tasks on game board
		for (let i = 0; i < this.gamePoints.length; i++) {	// check 'this.gamePoints.length' !!! should be 12

			// display task element and ...
			const board = document.querySelector('.game-board');
			const task = document.createElement('div');
			board.appendChild(task);
			task.classList.add('game-task');

			// add attributes for latter easy search
			task.setAttribute('data-money', this.gameMoney[i]);
			task.setAttribute('data-points', this.gamePoints[i]);

			// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
			let taskText = document.createElement('div');
			taskText.classList.add('game-task-text');
			taskText.innerHTML = '<p>$<span class="task-money">' + this.gameMoney[i] + '</span></p><p><span' +
					' class="task-points">' + this.gamePoints[i] + '</span> pkt</p>';
			task.appendChild(taskText);

			task.addEventListener('click', this.taskClick.bind(this));
		}

		// start timer downwards and stop it by 0
		let gameTimeDiv = document.querySelector('.game-time');
		let gameTimer = gameTimeDiv.innerHTML;
		this.timerId = setInterval (function () {
			gameTimer--;
			if (gameTimer < 1) {
				this.stopGame();
				clearInterval(this.timerId);
			}
			gameTimeDiv.innerHTML = gameTimer.toString();
		}, 1000);

		// show board game
		document.querySelector('.game-board').classList.add('display-block');
	},
	
	// show 'END GAME' text and 'RESTART GAME' button at the end of the game when time or points are equal to 0
	stopGame : function () {
		clearInterval(this.timerId);

		// show END GAME text
		document.querySelector('.text-info').innerHTML = `Gra została zakończona.<br/>Jeśli chcesz zagrać ponownie,` +
				` naciśniej przycisk START.`;
		document.querySelector('.game-instruction').classList.add('display-block');

		// show START button again
		document.querySelector('.game-start').classList.add('display-block');
	}
};

