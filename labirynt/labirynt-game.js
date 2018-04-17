var mazeGame = (function () {
    var gameContainer = document.getElementById('game');
    var scoreContainer = document.getElementById('score');
    var timeContainer = document.getElementById('#time');
    var board = [
        '        xf   x     x            x   x xfxf xxxx   ',
        ' xxxxxx xx x x xxx x f fff ffff x x     x  xf   x ',
        ' x         x x xf  x   f   f  f x x xxxxxx x xxxxf',
        ' x xxxxxxxxx x xxx x f fff f  f x x x           xf',
        ' x   x       x xfx x f   f ffff x x xx xxxxxxxx x ',
        ' x x x xxxxxxx x x x f fff f  f x x x  x          ',
        '   x x         x   x            x x xx x xxxxxxxxx',
        'xxxx x x xxxfxxxxxxxxxxxxxxxxxxxx x       x       ',
        '     x x x          x  x   x      xxxxx x x xxxxx ',
        ' xxxxx x x xxxxxxxx  x   x   xxxxx      x x x     ',
        ' x     x x       x x   x   xxx x x xxxxxx x x xxxx',
        ' x xxxxx xxxxxxx x   x   x         x    x x x xfff',
        ' x xf  x x         x   x   xxxx x  x xx x x x xfxf',
        ' x xxx x x xxxxxxx   x   x    x xx x  x x x x xfxf',
        ' x   x xfx    xffx x   x      x  x x fx x x x x x ',
        ' x x   xxx x x  x    x     x xxx x xxxx x x x x x ',
        '   x xx x  xx  x   x   x xxx  x  x      x x x x x ',
        'xxxx x     x  x  xxxxxxx xfx xx xxxxxx  x x x x x ',
        '     xxx xx  x           x x xf    x    x   x   x ',
        ' x x xf  x  xfxxxxxxxxxx x   xxxxx xx xxxxxxxxxxx ',
        ' x x  xxx  x          x  xx xx     x          x x ',
        ' x x   x  x xxxx xxxx x xx  xf x x x xxxxxxxx x   ',
        ' x x x x x   x    x     x  xxxxx x x  x         x ',
        ' x x x x x x x xx x x x x        x xx x xxxxxxx x ',
        ' x   x   x x x xx x x x x xxxx x   x  xfx       x ',
        ' x xxxxx x x x fx xfx xfx xf x xxx x xxxx xxxx  x ',
        'xf x       x  xxx xxx xxx x  x          x x    xfx',
        'xxxxxxxxxxxxx             x xx xxx xxxx x x xxxffx',
        'ff            xxx xxx xxx x    x  xf      x   fffx',


    ];
    var playerPosition = {
        x: 0,
        y: 0
    };
    var score = 0;
    var obstacles = getFromBoard(board, 'x');
    var fruits = getFromBoard(board, 'f');
    var moves = {
        ArrowRight: function (pos) {
            return {
                x: pos.x + 1,
                y: pos.y
            }
        },
        ArrowLeft: function (pos) {
            return {
                x: pos.x - 1,
                y: pos.y
            }
        },
        ArrowUp: function (pos) {
            return {
                x: pos.x,
                y: pos.y - 1
            }
        },
        ArrowDown: function (pos) {
            return {
                x: pos.x,
                y: pos.y + 1
            }
        }
    };
    var width = 50;
    var height = 29;
    var pressedKey = '';

    window.addEventListener('keydown', function (event) {
        pressedKey = event.code
    });

    setInterval(function () {
        update();
        render();
    }, 130);

    function update() {
        var newPosition = (
            moves[pressedKey] ||
            noop
        )(playerPosition);
        if (
            inRange(newPosition.x, 0, width - 1) &&
            inRange(newPosition.y, 0, height - 1) &&
            doesNotCollide(newPosition, obstacles)
        ) {
            if (collide(newPosition, fruits)) {
                score += 1;
                fruits = fruits.filter(function (fruit) {
                    return !(fruit.x === newPosition.x && fruit.y === newPosition.y)
                })
            }
            playerPosition = newPosition
        }
    }

    function render() {
        empty(gameContainer);
        scoreContainer.innerText = score;
        var table = createTable(width, height);
        try {
            var playerCell = getCell(table, playerPosition.x, playerPosition.y);
            colorize(playerCell, 'silver');

            obstacles.forEach(function (obstacle) {
                var obstacleCell = getCell(table, obstacle.x, obstacle.y);
                colorize(obstacleCell, 'black');
            });

            fruits.forEach(function (fruit) {
                var fruitCell = getCell(table, fruit.x, fruit.y);
                colorize(fruitCell, 'blue');
            })

        } catch (e) {
            // console.log(e);
        }

        gameContainer.appendChild(table);
    }

    function collide(position, items) {
        return !doesNotCollide(position, items)
    }

    function doesNotCollide(position, items) {
        return items.find(function (item) {
            return item.x === position.x && item.y === position.y
        }) === undefined
    }


    function getFromBoard(board, charToFind) {
        return board.map(function (row, y) {
            return row.split('').map(function (char, x) {
                return {
                    x: x,
                    y: y,
                    char: char
                }
            }).filter(function (pos) {
                return pos.char === charToFind
            })
        }).reduce(function (result, next) {
            return result.concat(next)
        }, []);
    }


    var timeleft = 50;
    var timer = setInterval(function(){
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if(timeleft <= 0) {
            clearInterval(timer);
            moves = 0;
        }
    },1000);
})();