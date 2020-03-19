
// FIND ALL NEGS AND RENDER THEM
function findAllNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            setMinesNegsCount(i, j, board);
        }
    }
}

// FIND NEIGBERS FUNCTION
function setMinesNegsCount(cellI, cellJ, board) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine === true) {
                board[cellI][cellJ].minesAroundCount++;
            }
            var location = {
                i: cellI,
                j: cellJ,
            }
            var cell = board[cellI][cellJ];
            if (cell.isShown === false) {
                var value = '';
            } else {
                value = board[cellI][cellJ].minesAroundCount;
            }
            if (cell.isMine) return;
            if (value === 0) value = '';
        }
    }
}



// SHOW NEGS WHEN HINT IS ON 
function showNeighbors(cellI, cellJ, board) {

    var posOfNegs = []

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            //getting the cell elemnt to change the background color when picked
            var elCell = document.querySelector(`#cell-${i}-${j}`);


            if (j < 0 || j >= board[i].length) continue;
            posOfNegs.push({ posI: i, posJ: j });

            if (board[i][j].isMine) {
                value = MINE;
            } else if (!board[i][j].isShown) {
                value = board[i][j].minesAroundCount;
            } else if (board[i][j].isShown) continue;
            //changing the back ground color and rendering 
            elCell.style.backgroundColor = 'gray';
            renderCell({ i: i, j: j }, value);

        }
    }
    setTimeout(hideNegs, 1000, posOfNegs);
    gGame.isHint = false;
}

// HIDE THE NEGS 
function hideNegs(cells) {
    for (i = 0; i < cells.length; i++) {
        var elCell = document.querySelector(`#cell-${[cells[i].posI]}-${[cells[i].posJ]}`)
        var selectedCell = gBoard[cells[i].posI][cells[i].posJ];
        if (selectedCell.isShown) continue;
        elCell.style.backgroundColor = 'black';
        value = '';
        renderCell({ i: cells[i].posI, j: cells[i].posJ }, value);
    }
}

//SHOW NEGS WHEN CLICKING AN OPEN CELL
function openNegs(cellI, cellJ, board) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;

            if (board[i][j].isMine) {
                continue;
            } else if (!board[i][j].isShown) {
                if (board[i][j].minesAroundCount !== 0) {
                    value = board[i][j].minesAroundCount;
                }
            }
            gGame.shownCount++

            var elCell = document.querySelector(`#cell-${i}-${j}`);
            elCell.style.backgroundColor = 'gray';

            renderCell({ i: i, j: j }, value);
            console.log('need to add to count');
            
        }
    }
}
