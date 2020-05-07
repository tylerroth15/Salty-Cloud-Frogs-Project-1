//Placeholder UI to test the tic-tac-toe.
// 0 = nickname page, 1 = game select, 2 = tic-tac-toe
let pageNumber = 2
let gameDiv = $("<div>");

//Generic render function that will call more specific render functions by checking the pageNumber
const render = function() {
    if (pageNumber == 2) {
        renderTicTacToe();
    }
}

//Renders my really bad looking TicTacToe Board. Fix this up and make it look nice. :)
//Things that I will need on my elements:
// - Each button needs class Button. This goes for the entire UI, not just TicTacToe.
// - Each button needs an id: `tttBtn${i}` where i is the index of the button.
// - Each button needs a data-tttPos attribute with a value of i.
// - Include a <span> in the turn display which will display the current turn. ID: turnDisplay
const renderTicTacToe = function() {
    for(let i = 0; i < 9; i++) {
        gameDiv
            .append($("<button>")
                .text("")
                .attr("data-tttpos", i)
                .attr("class","Button")
                .attr("id", `tttBtn${i}`)
                .attr("style", "width: 30px; height: 30px"));
        if(i === 2 || i === 5 || i === 8) {
            gameDiv.append($("<br>"));
            if (i === 2 || i === 5) {
                gameDiv
                    .append($("<h1>")
                        .text("---------"));
            }
            if (i === 8) {
                // Turn display which includes a span with this ID of turnDisplay.
                gameDiv
                    .append($("<h1>")
                        .text("Turn: ")
                        .append($("<span>")
                            .attr("id", "turnDisplay")
                            .text("O")))
            }
        }
    }
    $("body").append(gameDiv);
}