const clickHandler = function(e) {
    e.preventDefault();
    //Checks to see if what was clicked was a button.
    if ($(e.target).hasClass("Button")){
        //Checks the page number which was setup in ui.js then calls the appropriate handler for the page.
        if (pageNumber === 2) {
            ticTacToeClickHandler(e.target);
        }
    }
}





//Calls the render function in ui.js.
render();

//Placeholder code to start the TicTacToe game
if (pageNumber === 2) {
    playTicTacToe();
}
gameDiv.on("click", clickHandler);