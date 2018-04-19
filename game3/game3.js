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
var scoreContainer = document.getElementsByClassName('game-score')

var deleteTiles = function () {
    tilesChecked[0].remove();
    tilesChecked[1].remove();

    canGet = true;
    tilesChecked = [];

    var tilePairs = +1;
    if (tilePairs >= tileCount/2) {
        alert("KONIEC! JESTEŚ SPOKO!")
    }
}

var resetTiles = function () {
    tilesChecked[0].style.background = '#D62261';
    tilesChecked[1].style.background = '#D62261';

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
            score += 1;
            setTimeout(deleteTiles, 500);
        } else {
            setTimeout(resetTiles, 500);
        }

    }
};


var startGame = function () {
    scoreContainer.innerText = score;
    //clear board
    var divBoard = document.querySelector('.game-board');
    divBoard.innerHTML = '';

    //clear div with result
    var divScore = document.querySelector('.game-score');
    divScore.innerHTML = '';

    //clear timer
    var divTimer = document.querySelector('.game-time');
    divTimer.innerHTML = '';

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




