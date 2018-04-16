'use strict';

var taskGame = (function () {
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('.game-start').addEventListener('click', function() {
			startGame();
		});
	});

	// game initials
	var initialPoints = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	var initialMoney = [ 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100 ];
	var initialTotalPoints = 30;
	var initialTotalMoney = 0;
	var initialTotalTime = 10;
	var timerIntervalValue = 1000;
	var timerId = 0;
	var gameInProgress = false;

	var gameTotalPoints = initialTotalPoints;
	var gameTotalMoney = initialTotalMoney;

	var gamePoints = [];
	var gameMoney = [];

	var boardHeight;
	var boardWidth;

	//////////////////////////////////
	// show score
	var showScore = function (money, points, time) {
		document.querySelector('.game-money').innerText = money;
		document.querySelector('.game-points').innerText = points;
		document.querySelector('.game-time').innerText = time;
	};

	//////////////////////////////////
	// click on the tile with a task
	var taskClick = function (event) {

		if (false === gameInProgress) return;

		var element = event.currentTarget;

		if (element.matches('.game-task')) {

			// add money to 'game-money' when '.game-task' clicked
			var taskMoney = element.getAttribute('data-money');
			var gameMoney = document.querySelector('.game-money');
			gameTotalMoney += parseInt(taskMoney);

			// subtract points from 'game-points' when '.game-task' clicked
			var taskPoints = element.getAttribute('data-points');
			var gamePoints = document.querySelector('.game-points');

			// check if the value of total points is less than 0 and then stop the game
			if (gameTotalPoints > 0) {
				gameTotalPoints -= parseInt(taskPoints);
				if (gameTotalPoints <= 0) {
					gameTotalPoints = 0;
					gamePoints.innerHTML = gameTotalPoints.toString();
					stopGame();
				}
			}
			gamePoints.innerText = gameTotalPoints.toString();
			gameMoney.innerText = gameTotalMoney.toString();
		}

		// make '.game-task' disappear when clicked
		element.classList.add('visibility-hidden');
	};

	/////////////////////////////
	// hide START button and instruction
	var hideStartButton = function () {
		document.querySelector('.game-start').classList.remove('display-block');
		document.querySelector('.game-start').classList.add('display-none');
		document.querySelector('.game-instruction').classList.remove('display-block');
		document.querySelector('.game-instruction').classList.add('display-none');
	};

	/////////////////////////////
	// Show text info
	var showTextInfo = function (option) {
		var txt1 = '<strong>Zdobądź maksymalną ilość hajsu.</strong><br/>' +
				'Czas na ukończenie gry wynosi ' + initialTotalTime + ' sekund.<br/>' +
				'Każde zadanie posiada wartość pieniężną oraz liczbę punktów odejmowaną z puli.<br/>' +
				'Należy klikać na zadania.';
		var txt2 = 'Gra została zakończona.<br/>' +
				'Jeśli chcesz zagrać ponownie, naciśnij przycisk START.<br/><br/>' +
				'Zdobyty HAJS: $ ' + gameTotalMoney;
		document.querySelector('.text-info').innerHTML = (option === 1) ? txt1 : txt2;
		document.querySelector('.game-instruction').classList.add('display-block');
	};

	/////////////////////////////
	// show 'END GAME' text and 'RESTART GAME' button when time or points are equal to 0
	var stopGame = function () {

		gameInProgress = false;

		clearInterval(timerId);

		// show blender
		var blender = document.createElement('div');
		blender.classList.add('game-blend');
		document.querySelector('.game-board').appendChild(blender);

		// show END GAME text
		showTextInfo(2);

		// show START button
		document.querySelector('.game-start').classList.add('display-block');
	};

	/////////////////////////////
	// setting game to initials
	var clearGame = function () {

		gameTotalPoints = initialTotalPoints;
		gameTotalMoney = initialTotalMoney;

		showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);

		for (var i = 0; i < initialPoints.length; i++) {
			gamePoints[i] = initialPoints[i];
			gameMoney[i] = initialMoney[i];
		}

		// clear board of remaining tasks and hide START button
		var board = document.querySelector('.game-board');
		while (board.firstChild) {
			board.removeChild(board.firstChild);
		}
		hideStartButton();
	};

	/////////////////////////////
	// mixing the tables with task points and money
	var mixTables = function () {
		for (var i = gamePoints.length - 1; i > 0; i--) {
			var swapPoints = Math.floor(Math.random() * i);
			var swapMoney = Math.floor(Math.random() * i);
			var tmpPoints = gamePoints[i];
			var tmpMoney = gameMoney[i];

			gamePoints[i] = gamePoints[swapPoints];
			gameMoney[i] = gameMoney[swapMoney];
			gamePoints[swapPoints] = tmpPoints;
			gameMoney[swapMoney] = tmpMoney;
		}
	};

	/////////////////////////////
	// display tasks on game board
	var buildGameBoard = function () {

		var board = document.querySelector('.game-board');
		boardHeight = board.offsetHeight;
		boardWidth = board.offsetWidth;
		var taskSize = ((boardWidth / 5) - 10).toString() + 'px';

		for (var i = 0; i < gamePoints.length; i++) {

			// display task element and ...
			var task = document.createElement('div');
			board.appendChild(task);
			task.classList.add('game-task');

			// add size and margin to task
			task.style.width = taskSize;
			task.style.height = taskSize;
			task.style.margin = '10px';

			// add attributes for latter easy search
			task.setAttribute('data-money', gameMoney[i]);
			task.setAttribute('data-points', gamePoints[i]);

			// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
			var taskText = document.createElement('div');
			taskText.classList.add('game-task-text');
			taskText.innerHTML = '<p>$<span class="task-money">' + gameMoney[i] +
					'</span></p><p><span class="task-points">' + gamePoints[i] + '</span> pkt</p>';
			task.appendChild(taskText);

			task.addEventListener('click', taskClick);
		}
	};

	/////////////////////////////
	// start timer downwards and stop it by 0
	var startTimer = function () {
		var gameTimeDiv = document.querySelector('.game-time');
		var gameTimer = parseInt(gameTimeDiv.innerText);
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
	var startGame = function () {
		clearGame();
		mixTables();
		buildGameBoard();
		startTimer();

		// show board game
		document.querySelector('.game-board').classList.add('display-block');
		gameInProgress = true;
	};

	showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);
	showTextInfo(1);

})();
