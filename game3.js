

    var sizeX = 10;
    var sizeY = 10;

    function createTable(cells, sizeX, sizeY) {
        var table = create('section');
        var rangeX = Array.from({length: sizeX});
        var rangeY = Array.from({length: sizeY});

        table.classList.add('table');
        rangeY.forEach(function (_, y) {
            var domNode = create('div');
            rangeX.forEach(function (_, x) {
                var domNode2 = create('div');

                cells.forEach(function (cell) {
                    if (y === cell.y && x === cell.x) {
                        domNode2.classList.add(cell.className);
                    }
                });

                domNode.appendChild(domNode2);
            });
            table.appendChild(domNode);
        });
    }


