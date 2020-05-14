let boardState;
let advBoardState;
let tttTurn;
let player;
let tttURL;
let isGameOver = false;

const playTicTacToe = function () {
    // Sets up some variables that we'll need

    //Creates an array containing 9x"-" for our boardstate which we will use in our queryURL
    boardState = "---------".split('');
    //Creates an object which contains an advanced boardstate which we will use for checking win conditions
    advBoardState = {
        //For checking the rows
        rows: [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"],
        ],
        //For Checking the columns
        cols: [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"],
        ],
        //For Checking the diagonals
        diag1: ["-", "-", "-"],
        diag2: ["-", "-", "-"]
    }
    //Sets up turn variables
    tttTurn = "X";
    playerTurn = "X";
    cpuTurn = "O";

    //Sets the base tttURL. Final version will always look like https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${boardState}/${cpuTurn}
    tttURL = "https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/";
}

const ticTacToeClickHandler = function (target) {
    //Prevents player from clicking during CPU turn.
    if (playerTurn != tttTurn) {
        return;
    }
    //Prevents the player from clicking a button that has already been used.
    if ($(target).text() != "") {
        return;
    }

    //updates board state
    updateBoardState(target.dataset.tttpos);
    if (isGameOver) {
        return;
    }
    //Sets up our AJAX call. Taken from the rapidAPI page. Couldn't make it work without this. 
    var settings = {
        "async": true,
        "crossDomain": true,
        //I join the boardstate array into a string here which I can insert into the URL
        "url": tttURL + `${boardState.join('')}/${cpuTurn}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "stujo-tic-tac-toe-stujo-v1.p.rapidapi.com",
            "x-rapidapi-key": "542eb207a6msh608940e9801d301p1af396jsnbf710534c9ff"
        }
    }

    // Calls our API 
    $.ajax(settings).done(function (response) {
        //Adds the dramatic pause to the CPU turn.
        setTimeout(function () {
            //Updates the boardstate

            if (Math.floor(Math.random() * 4) === 0){
                let randInd = Math.floor(Math.random() * 8);
                while (boardState[randInd] != "-") {
                    randInd = Math.floor(Math.random() * 8);
                }
                console.log(randInd);
                updateBoardState(randInd);
            } else {
                updateBoardState(response.recommendation);
            }
        }, 1000);
    });
}

const updateBoardState = function (position) {
    //Edits the button text
    $(`#tttBtn${position}`).attr("data-tttval", tttTurn).addClass(`${tttTurn}`).text(tttTurn);
    let btnRef = document.querySelector(`#tttBtn${position}`);

    //Iterates through the array and edits the place that was clicked on the board.
    for (let i = 0; i < boardState.length; i++) {
        //Checks the clicked buttons tttPos dataset attribute to see if it is equal to the current index.
        if (position == i) {
            boardState[i] = tttTurn;
            //Sets i to boardState.length to exit the for loop without needless extra iterations.
            i = boardState.length;
        }
    }

    let x = btnRef.dataset.tttx;
    let y = btnRef.dataset.ttty;
    let val = btnRef.dataset.tttval;

    advBoardState.rows[y][x] =  val;
    advBoardState.cols[x][y] = val;
    if (x === y){
        advBoardState.diag1[x] = val;
    }
    if (x == (2-y)) {
        advBoardState.diag2[y] = val;
    }

    // Checks the boardstate to see if the game is over.
    checkGameOver();
    if (isGameOver) {
        pageNumber = 1;
        isGameOver = false;
        updateScores(tttTurn);
        // render();
        return;
    }
    // Changes the current turn.
    if (tttTurn == playerTurn) {
        tttTurn = cpuTurn;
    } else {
        tttTurn = playerTurn;
    }
    $("#turnDisplay").text(tttTurn);


}

const checkGameOver = function () {

    //Checks whatever line is passed into it to see if all elements are matching.
    const checkLine = function (line) {
        let tempBool = true;
        for (let i = 0; i < line.length - 1; i++) {
            if ((line[i] != line[i + 1]) || (line[i] === "-")) {
                tempBool = false;
                isGameOver = tempBool;
                return;
            }
        }
        isGameOver = tempBool;
        return tempBool;
    }
    //Checks the rows and columns for a game over
    for (let i = 0; i < advBoardState.rows.length; i++) {
        //Checks row i for a game over
        checkLine(advBoardState.rows[i]);

        //Exits the loop and function if game over is found.
        if (isGameOver) {
            return;
        }
        //Checks col i for a game over
        checkLine(advBoardState.cols[i]);

        //Exits the loop and function if game over is found.
        if (isGameOver) {
            return;
        }
        
    }

    //Checks the diagonals for a game over
    for (let i = 0; i < advBoardState.diag1.length - 1; i++) {
        checkLine(advBoardState.diag1);
    }
    if (isGameOver) {
        return;
    }
    for (let i = 0; i < advBoardState.diag2.length - 1; i++) {
        checkLine(advBoardState.diag2);
    }
    if (isGameOver) {
        return;
    }

    //Checks to see if the board is full and if it is flags a game over.
    let tempBool2 = true;
    for(let i = 0; i < boardState.length; i++) {
        if (boardState[i] === "-"){
            tempBool2 = false;
            i = boardState.length;
        }
    }
    if (tempBool2 === true) {
        tttTurn = "-";
        isGameOver = true;
    }
    
}
