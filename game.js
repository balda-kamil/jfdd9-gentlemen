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

	taskClick : function (event) {
		let element = event.currentTarget;

		if (element.matches('.game-task')) {
			// add money to 'game-money' when '.game-task' clicked
			let taskMoney = element.getAttribute('data-money');
			let gameMoney = document.querySelector('.game-money');
			this.gameTotalMoney += parseInt(taskMoney);
			gameMoney.innerHTML = this.gameTotalMoney.toString();

			// subtract points from 'game-points' when '.game-task' clicked
			let taskPoints = element.getAttribute('data-points');
			let gamePoints = document.querySelector('.game-points');
			this.gameTotalPoints -= parseInt(taskPoints);
			gamePoints.innerHTML = this.gameTotalPoints.toString();
		}

		// make '.game-task' disappear when clicked
		element.classList.add('visibility-hidden');
	},
	
	// total points changed
	pointsChanged : function (elem) {
		let totalPoints = parseInt(elem.target.innerHTML);	// check it thoroughly
		if (totalPoints > 0) {
		} else {
			// add STOP THE GAME
			this.stopGame();
		}
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
	},

	startGame : function () {
		
		// 1: clear board when start/restart the game
		this.clearGame();
		// TODO 2: add class to '.game-task' on hover

		// hide start button and instruction
		let startButton = document.querySelector('.game-start');
		//startButton.classList.remove('display-block');
		startButton.classList.add('display-none');
		let instructionText = document.querySelector('.game-instruction');
		//instructionText.classList.remove('display-block');
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
		
		// TODO 9: add listener to ValueChange of gamePoints
		debugger;
		let gmPt = document.querySelector('.game-points');
		gmPt.addEventListener('ValueChange', this.pointsChanged.bind(this));

		// start timer downwards and stop it by 0
		let gameTimeDiv = document.querySelector('.game-time');
		let gameTimer = gameTimeDiv.innerHTML;
		let timerId = setInterval (function () {
			gameTimer--;
			if (gameTimer < 1) {
				// add STOP THE GAME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				clearInterval(timerId);
			}
			gameTimeDiv.innerHTML = gameTimer.toString();
		}, 1000);

		// show board game
		// document.querySelector('.game-board').classList.remove('display-none');
		document.querySelector('.game-board').classList.add('display-block');
	},
	
	// TODO 6: show 'END GAME' text and 'RESTART GAME' button at the end of the game when time or points are equal to 0
	stopGame : function () {
		console.log('stop game');
	/*
		// hide board game
		document.querySelector('.game-board').classList.remove('display-block');
		document.querySelector('.game-board').classList.add('display-none');

		// show END GAME text
		document.querySelector('.game-instruction').innerHTML = 'Gra została zakończona.\nJeśli chcesz zagrać ponownie, naciśniej przycisk START';

		// show START button again
		document.querySelector('.game-start').classList.add('display-none');
	*/	
	}
	
	// TODO 7: add max earned money (?)
};

