const clickHandler = function (e) {
    e.preventDefault();
    //Checks to see if what was clicked was a button.
    if ($(e.target).hasClass("Button")) {
        //Checks the page number which was setup in ui.js then calls the appropriate handler for the page.
        if (pageNumber === 1) {
            if ($(e.target).attr("id") === "tttBtn") {
                pageNumber = 2;
                render();
                playTicTacToe();
            }
            if ($(e.target).attr("id") === "sdkBtn") {
                pageNumber = 3;
                render();
                playSudoku();
            }
            if ($(e.target).hasClass("sdkDiff")) {
                changeDifficulty(e.target);
            }
        }
        if (pageNumber === 2) {
            ticTacToeClickHandler(e.target);
        }
        if (pageNumber === 3) {
            sudokuClickHandler(e.target);
        }
    }
}

const changeDifficulty = function (target) {
    let diffText = ["Easy", "Medium", "Hard"];
    if ($(target).text() === "<") {
        if (diff > 1) {
            diff--;
            $("#diffSpan").text(diffText[diff - 1]);
        }
    } else {
        if (diff < 3) {
            diff++;
            $("#diffSpan").text(diffText[diff - 1]);
        }
    }
}

const keyHandler = function (e) {
    e.preventDefault();
    if (pageNumber === 3) {
        if (e.key >= 1 && e.key <= 9) {
            sudokuKeyHandler(e.key);
        }
        if (e.key == "Backspace" || e.key == "Delete") {
            clearHandler();
        }
        if (e.key == "Enter") {
            checkSolution();
        }
    }
}

const init = function () {
    pageNumber = 1;
    welcome();
    render();   
}


//Calls the render function in ui.js and sets up the clickhandler.
$(document).ready(init);
$("#main").on("click", clickHandler);
$("#main").on("keydown", keyHandler);