// bug list on the bottom...

// CONST 
const EMPTY = '';

const MINE_IMG = '<img src="IMG/bomb.svg" />'
const FLAG_IMG = '<img src="IMG/flag.svg" />'

// GLOBAL VAR
var gBoard = [];
var gLevel = {
    size: 4,
    mines: 2,
}
var gGame = {
    isOn: true,
    isRendered: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isHint: false,
    hints: 3,
}

var gElButton = document.querySelector('.restart');
var gElDiv = document.querySelector('.popup');
var gElHint = document.querySelector('.hint');
var gInterval;

var gCounterCell = 0;

// INIT THE GAME
function init() {
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
    gCounterCell = 0;
}


// CLICKING A CELL
function cellClicked(elCell, i, j) {
    if (gGame.isOn === false) return;
    //start timer
    timerBtMillisec();

    // show restart button on first click and puting mines and negs on board
    if (gCounterCell === 0) {
        gElButton.style.display = 'block';
        putRandomMine(gLevel.mines, i, j);
        gCounterCell++;
        findAllNegs(gBoard);
    }

    // changing the color of a cell when pressed
    elCell.style.backgroundColor = 'gray';

    // when pressing the hint button
    if (gGame.isHint) {
        showNeighbors(i, j, gBoard);
        return;
    }
    gGame.shownCount++

    //show negs when click empty spot
    if (gBoard[i][j].isMine === false && gBoard[i][j].minesAroundCount === 0) {
        openNegs(i, j, gBoard);
        return;
    }

    var cell = gBoard[i][j];

    if (cell.isShown) return;

    checkGameOver(cell);

    //Rendering the board
    if (cell.minesAroundCount > 0) {
        value = cell.minesAroundCount;

    } else if (cell.isMine) {
        value = MINE_IMG;
    } else value = '';
    cell.isShown = true;
    renderCell({ i: i, j: j }, value)
}

// GAME OVER POP UP DIV
function checkGameOver(cell) {
    var sumOfShowenCount = gLevel.size ** 2 - gLevel.mines;
    // Check if lose
    if (cell.isMine) {
        gElDiv.innerText = 'You died! try again'
        gElDiv.style.display = 'block';
        gElButton.innerText = '😔';
        gGame.isOn = false;
        clearInterval(gInterval);
        return;
    }
    //Check if win
    if (sumOfShowenCount === gGame.shownCount && gGame.markedCount === gLevel.mines) {
        gElDiv.innerText = 'Winner Winner Chicken Dinner'
        gElDiv.style.display = 'block';
        gElButton.innerText = '😎';
        gGame.isOn = false;
        clearInterval(gInterval);
        return;
    }
}

// LEFT CLICK TO MARK THE CELL
function cellMarked(i, j) {
    var cell = gBoard[i][j];
    if (cell.isMarked) {
        gGame.markedCount--
        cell.isMarked = false;
        renderCell({ i: i, j: j }, EMPTY)

        return;
    } else {
        cell.isMarked = true;
        gGame.markedCount++
    }
    var elCell = document.querySelector(`#cell-${i}-${j}`);
    elCell.style.backgroundColor = 'gray';
    renderCell({ i: i, j: j }, FLAG_IMG)
}

//RESTART BUTTON

function restart() {
    // restarting all parametters
    gElDiv.style.display = 'none';
    gGame.isOn = true;
    gGame.isRendered = false;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gGame.secsPassed = 0,
        gGame.hints = 3,

        gElButton.innerText = '😊';
    gElHint.innerText = `${gGame.hints} hints left`;
    init()
}

//CHANGE GAME LVL
function changeLvl(size, mineCount) {
    gLevel.size = size;
    gLevel.mines = mineCount;
    restart();
}

// HINT FUNCTION
function hint() {

    if (gGame.hints === 0) return;
    gGame.hints--
    gGame.isHint = true;
    gElHint.innerText = `${gGame.hints} hints left`;

}


/*
BUG LIST:
1.) Timer don't stop when game is over.
2.) sometime when 

*/












