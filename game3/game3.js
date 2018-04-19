document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.game-start').addEventListener('click', function () {
        startGame();
    });
});

//game initials
var tileCount = 20;  //number of tile
var tileOnRow = 5; //number of tile on row
var canGet = true;
var tilesChecked = [];
var moveCount = 0;
var score = 0;
var tilesImg = [
    'title_1.png',
    'title_2.png',
    'title_3.png',
    'title_4.png',
    'title_5.png',
    'title_6.png',
    'title_7.png',
    'title_8.png',
    'title_9.png',
    'title_10.png'];

var tilePairs = 0;
var timerIntervalValue = 1000;
var timerId = 0;
var deleteTiles = function () {
    tilesChecked[0].classList.add('game-tile-none');
    tilesChecked[1].classList.add('game-tile-none');


    canGet = true;
    tilesChecked = [];

    if (tilePairs >= tileCount/2) {
        alert("KONIEC!")
    }
}

var resetTiles = function () {
    tilesChecked[0].classList.add('game-tile');
    tilesChecked[0].style.backgroundImage= '';
    tilesChecked[1].classList.add('game-tile');
    tilesChecked[1].style.backgroundImage= '';
    tilesChecked = [];
    canGet = true;
}

var tileClick = function (e) {
    if (canGet) {
        if (!tilesChecked[0] || (tilesChecked[0].dataset.index !== e.target.dataset.index)) {
            tilesChecked.push(e.target);
            e.target.style.backgroundImage = 'url(tiles/' + tilesImg[e.target.dataset.cardType] + ')';
        }
    }
    if (tilesChecked.length === 2) {
        canGet = false;

        if (tilesChecked[0].dataset.cardType === tilesChecked[1].dataset.cardType) {
            setTimeout(deleteTiles,500);
            score += 1;
            tilePairs += 1;
            var divScore = document.querySelector('.game-score');
            divScore.innerHTML =  'Liczba punktów: '+ score;
            } else {
            setTimeout(resetTiles, 500);
        }

    }
};

var stopGame = function () {

    canGet = false;

    clearInterval(timerId);

   ///// show blender
   ///var blender = document.createElement('div');
   ///blender.classList.add('game-blend');
   ///document.querySelector('.game-board').appendChild(blender);

   ///// show END GAME text
   ///showTextInfo(2);

   ///// show START button
   ///document.querySelector('.game-start').classList.add('display-block');
};



var startTimer = function () {
    var divTimer = document.querySelector('.game-time');
    divTimer.innerText ='20';
    var gameTimer = parseInt(divTimer.innerText);
    timerId = setInterval (function () {
        gameTimer--;
        if (gameTimer < 1) {
            stopGame();
            clearInterval(timerId);
        }
        debugger;
        divTimer.innerText = 'Pozostało: ' +gameTimer.toString() +'s' ;
    }, timerIntervalValue);
};


var startGame = function () {

    startTimer()

    //clear board
    var divBoard = document.querySelector('.game-board');
    divBoard.innerHTML = '';

    //clear div with result
    var divScore = document.querySelector('.game-score');
    divScore.innerHTML =  'Liczba punktów: '+ score;

    //clear timer
    var divTimer = document.querySelector('.game-time');
    divTimer.innerHTML = 'Pozostało: 20s';

    //clear variables
    var tiles = [];
    var tilesChecked = [];
    var canGet = true;
    var moveCount = 0;
    var tilePairs = 0;

    //generating board with number of tiles (pairs)
    for (var i = 0; i < tileCount; i += 1) {
        tiles.push(Math.floor(i / 2));
         }

    //random board
    for (var i = tileCount - 1; i > 0; i -= 1) {
        var swap = Math.floor(Math.random() * i);
        var tmp = tiles[i];
        tiles[i] = tiles[swap];
        tiles[swap] = tmp;

    }

    for (var i = 0; i < tileCount; i += 1) {
        var tile = document.createElement('div');
        tile.classList.add('game-tile');
        divBoard.appendChild(tile);

        tile.dataset.cardType = tiles[i];
        tile.dataset.index = i;
//
      // tile.style.left = 5 + (tile.offsetWidth + 10) * (i % tileOnRow) + 'px'
      // tile.style.top = 5 + (tile.offsetHeight + 10) * (Math.floor(i / tileOnRow)) + 'px';



        tile.addEventListener('click', tileClick);
    }





};




