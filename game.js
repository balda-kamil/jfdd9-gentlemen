'use strict';

var taskGame = (function () {
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('.game-start').addEventListener('click', function() {
			startGame();
		});
	});

	// game initials
	var initialPoints = [];
	var initialMoney = [];
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

	// game globals
	var howManyTasks;
	var scoreHeight;
	var gameHeight;
	var boardHeight;
	var boardWidth;
	var taskSize;
	var board;

	window.addEventListener('resize', function () {
		//buildInitials();
	});

	//////////////////////////////////
	// get board size
	var getBoardSize = function () {
		gameHeight = document.querySelector('.game').offsetHeight;
		scoreHeight = document.querySelector('.game-score').offsetHeight;
		board = document.querySelector('.game-board');
		boardHeight = gameHeight - scoreHeight;
		boardWidth = board.offsetWidth;
	};

	//////////////////////////////////
	// get task size upon board size
	var setTaskSize = function () {
		var tasksInRow = 0;
		if (boardWidth > 540) {
			tasksInRow = 4;
		} else if (boardWidth > 400) {
			tasksInRow = 3;
		} else if (boardWidth > 320) {
			tasksInRow = 2;
		} else {
			tasksInRow = 2;
		}
		taskSize = Math.floor((boardWidth / tasksInRow) - 30);
	};

	//////////////////////////////////
	// set the number of tasks upon board size and task size
	var setTasksCount = function () {
		howManyTasks = Math.floor(boardHeight / (taskSize + 30)) * Math.floor(boardWidth / (taskSize + 30));
	};

	//////////////////////////////////
	// set initial time and points upon number of tasks
	var setInitTimePoints = function () {
		if (howManyTasks > 17) {
			initialTotalTime = 20;
			initialTotalPoints = 40;
		}
		if (howManyTasks <= 17) {
			initialTotalTime = 10;
			initialTotalPoints = 30;
		}
		for (var i = 0; i < howManyTasks; i += 1) {
			initialPoints[i] = i + 1;
			initialMoney[howManyTasks - i - 1] = (i + 1) * 100;
		}
	};

	//////////////////////////////////
	// place START button under game info upon game height
	var centerStartButton = function () {
		var thx = document.querySelector('.thx').offsetHeight;
		var infoHeight = document.querySelector('.game-instruction').offsetHeight;
		var offset = thx + infoHeight + scoreHeight;
		console.log(offset);

		var button = document.querySelector('.game-start');
		button.style.top = offset.toString() + 'px';
	};

	//////////////////////////////////
	// build initials upon board size
	var buildInitials = function () {
		getBoardSize();
		setTaskSize();
		setTasksCount();
		setInitTimePoints();

		taskSize = taskSize.toString() + 'px';

		centerStartButton();
	};

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
		blender.style.height = boardHeight.toString() + 'px';
		blender.style.width = '100%';
		//blender.style.top = scoreHeight.toString() + 'px';
		document.querySelector('.game-board').appendChild(blender);

		// show END GAME text
		showTextInfo(2);

		// show START button
		document.querySelector('.game-start').classList.add('display-block');
	};

	/////////////////////////////
	// setting game to initials
	var clearGame = function () {

		if (!gameInProgress) {
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

		for (var i = 0; i < gamePoints.length; i++) {

			// display task element and ...
			var task = document.createElement('div');
			board.appendChild(task);
			task.classList.add('game-task');

			// add size and margin to task
			task.style.width = task.style.height = taskSize;
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
		// buildInitials();
		clearGame();
		mixTables();
		buildGameBoard();
		startTimer();

		// show board game
		document.querySelector('.game-board').classList.add('display-block');
		gameInProgress = true;
	};

	showTextInfo(1);
	showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);
	buildInitials();

})();
