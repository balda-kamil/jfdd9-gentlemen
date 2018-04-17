
function create(tagName) {
    return document.createElement(tagName)
}

function createTable(cells, sizeX, sizeY) {
    var table = create('section');
    var rangeX = Array.from({ length: sizeX });
    var rangeY = Array.from({ length: sizeY });

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

    return table;
}

function showElement(parentId, element) {
    document.getElementById(parentId).innerHTML = "";
    document.getElementById(parentId).appendChild(element);
}

function getRandomPos(maxX, maxY) {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
}

function getRandomPos2(maxX, maxY, excludes) {
    var allPossibilities = [];

    Array.from({ length: maxY }, function (_, y) {
        Array.from({ length: maxX }, function (_, x) {
            allPossibilities.push({
                x: x,
                y: y
            })
        })
    });

    var goodPossibilities = allPossibilities.filter(function (pos) {
        return !excludes.find(function (item) {
            return item.x === pos.x && item.y === pos.y
        })
    });

    return goodPossibilities[Math.floor(Math.random() * goodPossibilities.length)]
}