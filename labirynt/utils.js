function doTimes(howManyCalls, whatToDo) {
    for (var i = 0; i < howManyCalls; i += 1) {
        whatToDo(i);
    }
}

function makeNode(name) {
    return document.createElement(name);
}

function makeCell(x, y) {
    var cell = makeNode('td');
    cell.innerText = x + ', ' + y;
    return cell;
}

function makeRow(y, size) {
    var tr = makeNode('tr');
    doTimes(size, function (x) {
        tr.appendChild(makeCell(x, y));
    });
    return tr;
}

function makeTableBody(width, height) {
    var tbody = makeNode('tbody');
    doTimes(height, function (rowIndex) {
        var tr = makeRow(rowIndex, width);
        tbody.appendChild(tr);
    });
    return tbody;
}

/**
 * Creates table with given `width` and `height`.
 *
 * @param width
 * @param height
 * @returns {*}
 */
function createTable(width, height) {
    var table = makeNode('table');
    table.appendChild(makeTableBody(width, height));
    return table;
}

function getCell(table, x, y) {
    var row = table.querySelector('tr:nth-child(' + (y + 1) +  ')');
    return row.querySelector('td:nth-child(' + (x + 1) + ')');
}

function colorize(node, color) {
    node.style.backgroundColor = color
}

function empty(node) {
    // node.innerHTML = ''
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function inRange(number, begin, end) {
    return number >= begin && number <= end
}

function noop (x) {
    return x
}

