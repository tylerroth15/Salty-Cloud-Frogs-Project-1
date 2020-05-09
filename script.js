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
        }
        if (pageNumber === 2) {
            ticTacToeClickHandler(e.target);
        }
    }
}


const init = function(){
    welcome();
    render();
    $("#main").on("click", clickHandler);
}


//Calls the render function in ui.js and sets up the clickhandler.
$(document).ready(init);
