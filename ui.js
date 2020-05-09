//Placeholder UI to test the tic-tac-toe.
// 0 = nickname page, 1 = game select, 2 = tic-tac-toe
let pageNumber = 1;
let gameDiv = $("#game-board");

//Generic render function that will call more specific render functions by checking the pageNumber
const render = function () {
    if (pageNumber == 1) {
        renderMainPage();
    }
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
const renderTicTacToe = function () {
    for (let i = 0; i < 9; i++) {
        let newBtn = $("<button>");
        let baseStlye = "width: 150px; height: 150px;";
        gameDiv
            .append(newBtn
                .text("")
                .attr("data-tttpos", i)
                .attr("class", "Button waves-effect waves-teal btn-flat")
                .attr("id", `tttBtn${i}`)
                .attr("style", baseStlye));
        if (i < 6) {
            baseStlye += "border-bottom: 3px solid black;";
            newBtn.attr("style", baseStlye);
        }
        if (i === 1 || i === 4 || i === 7) {
            newBtn.attr("style", baseStlye + "border-left: 3px solid black;");
        }
        if (i === 2 || i === 5 || i === 8) {
            gameDiv.append($("<br>"));
            newBtn.attr("style", baseStlye + "border-left: 3px solid black;");
            if (i === 8) {
                // Turn display which includes a span with this ID of turnDisplay.
                gameDiv
                    .append($("<h1>")
                        .text("Turn: ")
                        .append($("<span>")
                            .attr("id", "turnDisplay")
                            .text("O")));
            }
        }
    }
    $("#select-game").attr("style", "display:none");
}

const renderMainPage = function () {
    $(gameDiv).empty();
    $("#select-game").attr("style", "");
}