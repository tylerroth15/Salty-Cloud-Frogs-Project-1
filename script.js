const clickHandler = function(e) {
    e.preventDefault();
    //Checks to see if what was clicked was a button.
    if ($(e.target).hasClass("Button")){
        //Checks the page number which was setup in ui.js then calls the appropriate handler for the page.
        if(pageNumber === 1) {
            if($(e.target).attr("id") === "tttBtn") {
                pageNumber = 2;
                render();
                playTicTacToe();
            }
            if($(e.target).attr("id") === "sdkBtn") {
                pageNumber = 3;
                render();
                playSudoku();
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

const keyHandler = function(e) {
    e.preventDefault();
    if (e.key >= 1 && e.key <= 9) {
        sudokuKeyHandler(e.key);
    }
}

const init = function(){
    welcome();
    render();
    $("#main").on("click", clickHandler);
    $("#main").on("keydown", keyHandler);
}


//Calls the render function in ui.js and sets up the clickhandler.
$(document).ready(init);
