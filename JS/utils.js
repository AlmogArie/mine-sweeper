// BUILD BOARD FUNCTION
function buildBoard(level) {
    var size = level.size;

    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell;
        }
    }
    return board;
}

// RENDER BOARD FUNCITON
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            // var cell = row[j];
            var cell = board[i][j].isShown ? board[i][j].min : ''
            // TODO: figure class name
            var className = 'cell';
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this,${i}, ${j})" oncontextmenu="cellMarked(${i},${j})">
                            ${cell} 
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}






// GET RANDOM NUMBER
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// RENDER CELL
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`#cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;

}


//TIMER 
function timerBtMillisec() {
    gStartTime = Date.now();
    gInterval = setInterval(() => {
        var dif = Date.now() - gStartTime;
        var elMlSeconds = document.querySelector('.mil-seconds');
        elMlSeconds.innerText = dif / 1000;
    }, 10);
}



