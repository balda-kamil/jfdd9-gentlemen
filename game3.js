'use strict';

///var memoryGame = {
///  tileCount : 20,  //number of tile
///  tileOnRow : 5, //number of tile on row
///  divBoard : null, //div with board game
///  divScore: null, //div with result od game
///  divTimer : null, //div with time
///  tiles : [], //random tile board
///  tilesChecked : [], //checked tiles board
///  moveCount : 0, //number of moves
///  tilesImg : [
///      'title_1.png',
///      'title_2.png',
///      'title_3.png',
///      'title_4.png',
///      'title_5.png',
///      'title_6.png',
///      'title_7.png',
///      'title_8.png',
///      'title_9.png',
///      'title_10.png'
  ///  ]

    var startGame = function () {

            var tileCount = 20;  //number of tile
            var tileOnRow = 5; //number of tile on row
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
            'title_10.png']

        //clear board
        var divBoard = document.querySelector('.game-board');
        divBoard.innerHTML = '';

        //clear div with result
        var divScore = document.querySelector('.game-score');
        divScore.innerHTML = '';

        //clear timer
        var divTimer = document.querySelector('.game-timer');
        divTimer.innerHTML = '';

        //clear variables
        var tiles = [];
        var tilesChecked = [];
        var moveCount = 0;

        //generating board with number of tiles (pairs)
        for (var i=0; i<tileCount; i+=1){
            tiles.push(Math.floor(i/2));
        }

        //random board
        for (var i =tileCount-1; i>0; i-=1) {
            var swap = Math.floor(Math.random()*i);
            var tmp = tiles[i];
            tiles[i] = tiles[swap];
            tiles[swap] = tmp;
        }

        for (var i =0; i < tileCount; i += 1) {
            var tile = document.createElement('div');
            tile.classList.add('game-tile');
            divBoard.appendChild(tile);

            tile.dataset.cardType = tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth+10) * (i%tileOnRow) + 'px'
            tile.style.top = 5 + (tile.offsetHeight+10) * (Math.floor(i/tileOnRow)) + 'px';

            tile.addEventListener('click', tileClick);
        }


    }

