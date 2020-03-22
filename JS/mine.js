
// FIRST CLICK IS NO MINE + GETTING RANDOM MINES POSITIONS
function putRandomMine(num, i, j) {
    var count = 0;
    if (gBoard[i][j].isMine) return;
    while (count < num) {
        var posI = getRandomIntInclusive(0, gLevel.size-1);
        var posJ = getRandomIntInclusive(0, gLevel.size-1);

        if (posI === i && posJ === j) continue;
        if (gBoard[posI][posJ].isMine === false) {
            gBoard[posI][posJ].isMine = true;
            count++;
        }
    }
}






