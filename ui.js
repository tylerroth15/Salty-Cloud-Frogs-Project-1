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
    if (pageNumber == 3) {
        renderSudoku();
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
        let baseStlye = "width: 150px; height: 150px; font-size: 75px;";
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
                            .text("X")));
            }
        }
    }
    $("#select-game").attr("style", "display:none");
}

const renderMainPage = function () {
    $(gameDiv).empty();
    $("#select-game").attr("style", "");
}

const renderSudoku = function () {
    let sdkBlockRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
    for (let i = 0; i < 9; i++) {
        let sdkBlockCol = $("<div>").attr("class", "col").attr("style", "border: 2px solid");
        let sdkRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
        let colCount = 0;
        for (let j = 0; j < 9; j++) {
            let newBtn = $("<button>");
            let baseStlye = "width: 50px; height: 50px; padding: 0px;";
            sdkRow
            .append($("<div>")
                .attr("class", "col")
                .attr("style", "padding: 0px")
                .attr("id", `sdkB${i}R${j%3}C${colCount}`)
                .append(newBtn
                    .text("")
                    .attr("data-sdkpos", (i*9)+j)
                    .attr("class", "Button waves-effect waves-teal btn-flat")
                    .attr("id", `sdkBtn${(i*9)+j}`)
                    .attr("style", baseStlye)));
            if (j < 6) {
                baseStlye += "border-bottom: 1px solid black;";
                newBtn.attr("style", baseStlye);
            }
            if (colCount == 1) {
                newBtn.attr("style", `${baseStlye}border-left: 1px solid black;`);
            }
            if (colCount == 2) {
                colCount = -1;
                newBtn.attr("style", `${baseStlye}border-left: 1px solid black;`);
                sdkBlockCol.append(sdkRow);
                sdkRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
            }
            colCount++;
        }
        sdkBlockRow.append(sdkBlockCol);
        if(i == 2 || i == 5 || i == 8) {
            sdkBlockRow.prepend($("<div>").attr("class", "col s4"));
            gameDiv.append(sdkBlockRow);
            sdkBlockRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");    
        }
    }
    for (let i = 1; i < 10; i++) {
        let newBtn = $("<button>")
            .attr("class", "Button waves-effect waves-teal btn-flat sdkInput")
            .attr("id", `sdkInput${i}`)
            .attr("data-response", i)
            .attr("style", "font-size: 20px")
            .text(i);
        sdkBlockRow.append(newBtn);
        gameDiv.append(sdkBlockRow);
    }
    gameDiv.append(sdkBlockRow);
    $("#select-game").attr("style", "display:none");
}