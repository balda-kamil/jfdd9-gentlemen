var mazeGame = (function () {
    var gameContainer = document.getElementById('game');
    var scoreContainer = document.getElementById('score');
    var board = [
        '       x  ',
        '   xxx x  ',
        '  fx   x  ',
        '      f   ',
        '  x x     ',
        '     f x  ',
        '   xxx x  ',
        '   x   xf ',
        '          ',
        '  x x f   '
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
    }, 500);

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
})();