// TODO 1: make clearGame function work properly
// TODO 2: add score to text info
// TODO 3: mute game board under the START button
// TODO 4: add max earned money (?)

'use strict';

let taskGame = (function () {
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('.game-start').addEventListener('click', function() {
			startGame();
		});
	});

	// game initials
	let initialPoints = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	let initialMoney = [ 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100 ];
	let initialTotalPoints = 40;
	let initialTotalMoney = 0;
	let initialTotalTime = 60;
	let timerIntervalValue = 1000;
	let timerId = 0;

	let gameTotalPoints = initialTotalPoints;
	let gameTotalMoney = initialTotalMoney;

	let gamePoints = [];
	let gameMoney = [];

	//////////////////////////////////
	// show score
	let showScore = function (money, points, time) {
		document.querySelector('.game-money').innerText = money;
		document.querySelector('.game-points').innerText = points;
		document.querySelector('.game-time').innerText = time;
	};

	//////////////////////////////////
	// click on the tile with a task
	let taskClick = function (event) {

		let element = event.currentTarget;

		if (element.matches('.game-task')) {
			// add money to 'game-money' when '.game-task' clicked
			let taskMoney = element.getAttribute('data-money');
			let gameMoney = document.querySelector('.game-money');
			gameTotalMoney += parseInt(taskMoney);

			// subtract points from 'game-points' when '.game-task' clicked
			let taskPoints = element.getAttribute('data-points');
			let gamePoints = document.querySelector('.game-points');

			// check if the value of total points is less than 0 and then stop the game
			if (gameTotalPoints > 0) {
				gameTotalPoints -= parseInt(taskPoints);
				if (gameTotalPoints <= 0) {
					gameTotalPoints = 0;
					gamePoints.innerHTML = gameTotalPoints.toString();
					stopGame();
				}
				gamePoints.innerText = gameTotalPoints.toString();
				gameMoney.innerText = gameTotalMoney.toString();
			}
		}

		// make '.game-task' disappear when clicked
		element.classList.add('visibility-hidden');
	};

	/////////////////////////////
	// setting game to initials
	let clearGame = function () {

		showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);

		for (let i = 0; i < initialPoints.length; i++) {
			gamePoints[i] = initialPoints[i];
			gameMoney[i] = initialMoney[i];
		}

		// TODO: here add clear board of remaining tasks
	};

	/////////////////////////////
	// show 'END GAME' text and 'RESTART GAME' button at the end of the game when time or points are equal to 0
	let stopGame = function () {

		clearInterval(timerId);

		// show END GAME text
		document.querySelector('.text-info').innerHTML = `Gra została zakończona.<br/>Jeśli chcesz zagrać ponownie, naciśniej przycisk START.`;
		document.querySelector('.game-instruction').classList.add('display-block');

		// show START button again
		document.querySelector('.game-start').classList.add('display-block');
	};

	/////////////////////////////
	// hide start button and instruction
	let hideStartButton = function () {
		document.querySelector('.game-start').classList.add('display-none');
		document.querySelector('.game-instruction').classList.add('display-none');
	};

	/////////////////////////////
	// mixing the tables with task points and money
	let mixTables = function () {

		for (let i = gamePoints.length - 1; i > 0; i--) {
			let swap = Math.floor(Math.random() * i);
			let tmpPoints = gamePoints[i];
			let tmpMoney = gameMoney[i];
			gamePoints[i] = gamePoints[swap];
			gameMoney[i] = gameMoney[swap];
			gamePoints[swap] = tmpPoints;
			gameMoney[swap] = tmpMoney;
		}
	};

	/////////////////////////////
	// display tasks on game board
	let buildGameBoard = function () {

		for (let i = 0; i < gamePoints.length; i++) {

			// display task element and ...
			const board = document.querySelector('.game-board');
			const task = document.createElement('div');
			board.appendChild(task);
			task.classList.add('game-task');

			// add attributes for latter easy search
			task.setAttribute('data-money', gameMoney[i]);
			task.setAttribute('data-points', gamePoints[i]);

			// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
			let taskText = document.createElement('div');
			taskText.classList.add('game-task-text');
			taskText.innerHTML = '<p>$<span class="task-money">' + gameMoney[i] + '</span></p><p><span class="task-points">' + gamePoints[i] + '</span> pkt</p>';
			task.appendChild(taskText);

			task.addEventListener('click', taskClick.bind(this));
		}
	};

	/////////////////////////////
	// start timer downwards and stop it by 0
	let startTimer = function () {
		let gameTimeDiv = document.querySelector('.game-time');
		let gameTimer = parseInt(gameTimeDiv.innerText);
		timerId = setInterval (function () {
			gameTimer--;
			if (gameTimer < 1) {
				stopGame();
				clearInterval(timerId);
			}
			gameTimeDiv.innerHTML = gameTimer.toString();
		}, timerIntervalValue);
	};

	/////////////////////////////
	// S T A R T  G A M E
	let startGame = function () {
		showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);
		hideStartButton();
		clearGame();
		mixTables();
		buildGameBoard();
		startTimer();

		// show board game
		document.querySelector('.game-board').classList.add('display-block');
	};

	return {
		startGame : startGame
	}
})();
