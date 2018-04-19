'use strict';

var taskGame = (function () {

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
	var sumInitialPoints = 0;

	window.addEventListener('resize', resizeThrottler, false);
	var resizeTimeout;
	function resizeThrottler() {
		// ignore resize events as long as an actualResizeHandler execution is in the queue
		if (!resizeTimeout) {
			resizeTimeout = setTimeout(function() {
				resizeTimeout = null;
				actualResizeHandler();
			}, 66);   // The actualResizeHandler will execute at a rate of 15fps
		}
	}
	function actualResizeHandler() {
		// handle the resize event
		gameInProgress = false;
		howManyTasks = 0;
		buildInitials();
		clearGame();
		stopGame();
	}

	//////////////////////////////////
	// get board size
	var setBoardSize = function () {

		// get game dimensions
		gameHeight = document.querySelector('.game').offsetHeight - 4;  // 2 * 2px border
		scoreHeight = document.querySelector('.game-score').offsetHeight;
		board = document.querySelector('.game-board');
		boardHeight = gameHeight - scoreHeight;
		boardWidth = board.offsetWidth;

		// set board size
		board.style.height = boardHeight.toString() + 'px';
	};

	//////////////////////////////////
	// get task size upon board size
	var setTaskSize = function () {
		taskSize = 100; // 100px task + 2 * 10px margin + 2 * 1px board = 22px
	};

	//////////////////////////////////
	// set the number of tasks upon board size and task size
	var setTasksCount = function () {
		howManyTasks = Math.floor(boardHeight / (taskSize + 22)) * Math.floor(boardWidth / (taskSize + 22));
	};

	//////////////////////////////////
	// set initial time and points upon number of tasks
	var setInitTimePoints = function () {
		initialTotalPoints = Math.floor(sumInitialPoints / 10 + 10);
		initialTotalTime = Math.floor(initialTotalPoints / 3 + 5);
	};

	//////////////////////////////////
	// tables with initial points and money
	var buildTable = function () {
		initialPoints = [];
		initialMoney = [];
		gamePoints = [];
		gameMoney = [];
		sumInitialPoints = 0;
		for (var i = 0; i < howManyTasks; i += 1) {
			initialPoints[i] = i + 1;
			initialMoney[howManyTasks - i - 1] = (i + 1) * 10;
			sumInitialPoints += i + 1;
		}
	};

	//////////////////////////////////
	// place START button under game info upon game height
	var centerStartButton = function () {
		var thx = document.querySelector('.thx').offsetHeight + 30; // 2 * 15px padding
		var infoHeight = document.querySelector('.game-instruction').offsetHeight + 30; // 2 * 15px margin
		var offset = thx + infoHeight + scoreHeight + 80 + 10;  // 80px half of START size + 10px margin top

		var button = document.querySelector('.game-start');
		button.style.top = offset.toString() + 'px';
	};

	//////////////////////////////////
	// build initials upon board size
	var buildInitials = function () {
		setBoardSize();
		setTaskSize();
		setTasksCount();
		buildTable();
		setInitTimePoints();

		taskSize = taskSize.toString() + 'px';

		setBoardSize();
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

			var click = new Audio('sound/click.mp3');
			click.play();

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

			setBoardSize();
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
	// show cover above board game
	var showCover = function () {
		setBoardSize();

		var cover = document.createElement('div');
		cover.classList.add('game-cover');
		cover.style.height = boardHeight.toString() + 'px';
		cover.style.width = '100%';
		document.querySelector('.game-board').appendChild(cover);
	};

	/////////////////////////////
	// show 'END GAME' text and 'RESTART GAME' button when time or points are equal to 0
	var stopGame = function () {

		gameInProgress = false;

		clearInterval(timerId);

		showCover();

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
			board.style.justifyContent = 'start';
			board.style.alignContent = 'start';
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
	// fade in
	function fadeIn(element) {
		var op = 0.1;  // initial opacity
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
			}
			element.style.opacity = op.toString();
			op += 0.1;
		}, 30);
	}

	/////////////////////////////
	// display tasks on game board
	var buildGameBoard = function () {

		var i = 0;
		var taskTimerId = setInterval(function () {
			if (i < gamePoints.length) {

				// display task element and ...
				var task = document.createElement('div');
				task.classList.add('game-task');

				// add size, margin and board to task
				task.style.width = task.style.height = taskSize;
				task.style.margin = '10px';
				task.style.borderWidth = '1px';

				// add attributes for latter easy search
				task.setAttribute('data-money', gameMoney[i]);
				task.setAttribute('data-points', gamePoints[i]);

				// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
				var taskText = document.createElement('div');
				taskText.classList.add('game-task-text');
				taskText.innerHTML = '<p>$<span class="task-money">' + gameMoney[i] + '</span></p>' +
						'<p><span class="task-points">' + gamePoints[i] + '</span> pt</p>';
				task.appendChild(taskText);

				task.addEventListener('click', taskClick);

				task.style.opacity = '0';
				board.appendChild(task);
				fadeIn(task);

				i++;
			} else {
				clearInterval(taskTimerId);
				startGameTimer();
				board.style.justifyContent = 'space-evenly';
				board.style.alignContent = 'space-evenly';
			}
		}, 60);

		// for (var i = 0; i < gamePoints.length; i++) {
		//
		// 	// display task element and ...
		// 	var task = document.createElement('div');
		// 	task.classList.add('game-task');
		//
		// 	// add size, margin and board to task
		// 	task.style.width = task.style.height = taskSize;
		// 	task.style.margin = '10px';
		// 	task.style.borderWidth = '1px';
		//
		// 	// add attributes for latter easy search
		// 	task.setAttribute('data-money', gameMoney[i]);
		// 	task.setAttribute('data-points', gamePoints[i]);
		//
		// 	// ... fill in the task element with data from the 'gamePoints' and 'gameMoney' tables
		// 	var taskText = document.createElement('div');
		// 	taskText.classList.add('game-task-text');
		// 	taskText.innerHTML = '<p>$<span class="task-money">' + gameMoney[i] + '</span></p>' +
		// 		'<p><span class="task-points">' + gamePoints[i] + '</span> pt</p>';
		// 	task.appendChild(taskText);
		//
		// 	task.addEventListener('click', taskClick);
		//
		// 	board.appendChild(task);
		// }
	};

	/////////////////////////////
	// start timer downwards and stop it by 0
	var startGameTimer = function () {
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
		buildInitials();
		clearGame();
		mixTables();
		buildGameBoard();

		// show board game
		document.querySelector('.game-board').classList.add('display-block');
		gameInProgress = true;
		//startGameTimer();
	};

	buildInitials();
	showTextInfo(1);
	setBoardSize();
	showScore(initialTotalMoney, initialTotalPoints, initialTotalTime);

	document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('.game-start').addEventListener('click', function() {
			startGame();
		});
	});
})();
