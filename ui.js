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
    let x = 0;
    let y = 0;
    for (let i = 0; i < 9; i++) {
        let newBtn = $("<button>");
        let baseStlye = "width: 144px; height: 144px; font-size: 75px;";
        gameDiv
            .append(newBtn
                .text("")
                .attr("data-tttpos", i)
                .attr("data-tttx", x)
                .attr("data-ttty", y)
                .attr("data-tttval", "-")
                .attr("class", "Button waves-effect waves-teal btn-flat")
                .attr("id", `tttBtn${i}`)
                .attr("style", baseStlye));
        if (i < 6) {
            baseStlye += "border-bottom: 1px solid #6dcb22;";
            newBtn.attr("style", baseStlye);
        }
        if (i === 1 || i === 4 || i === 7) {
            newBtn.attr("style", baseStlye + "border-left: 1px solid #6dcb22;");
        }
        x++;
        if (i === 2 || i === 5 || i === 8) {
            x = 0;
            y++;
            gameDiv.append($("<br>"));
            newBtn.attr("style", baseStlye + "border-left: 1px solid #6dcb22;");
            if (i === 8) {
                // Turn display which includes a span with this ID of turnDisplay.
                gameDiv
                    .append($("<h1>")
                        .attr("style", "color: #fbf9c7 !important;  text-shadow:  0 0 8px #fee323, 0 0 10px #fee323 !important")
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
    let sdkMainCol = $("<div>").attr("class", "col s12 m8 l4 offset-l4 offset-m2")
    let sdkBlockRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px; min-height: 70px");
    let xIndex = 0;
    let yIndex = 0;
    for (let i = 0; i < 9; i++) {
        let sdkBlockCol = $("<div>").attr("class", "col s4 sdkBorder").attr("style", "border: 2px solid;");
        let sdkRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
        let colCount = 0;

        xTrack = xIndex;
        for (let j = 0; j < 9; j++) {
            let newBtn = $("<button>");
            let baseStlye = "width: 100%; height: 100%; padding: 0px; white-space: pre;";
            let x = colCount + xIndex;
            let y =  Math.floor(j / 3) + yIndex;
            sdkRow
                .append($("<div>")
                    .attr("class", "col s4 sdkBorder")
                    .attr("style", "padding: 0px")
                    .attr("id", `sdkB${i}R${Math.floor(j / 3)}C${colCount}`)
                    .append(newBtn
                        .text(" ")
                        .attr("data-sdkpos", (y * 9) + x)
                        .attr("data-sdkval", "")
                        .attr("data-sdkblock", i)
                        .attr("data-sdkblockpos", j)
                        .attr("data-sdkx", x)
                        .attr("data-sdky", y)
                        .attr("class", "Button waves-effect waves-teal btn-flat")
                        .attr("id", `sdkBtn${(y * 9) + x}`)
                        .attr("style", baseStlye)));
            if (j < 6) {
                baseStlye += "border-bottom: 1px solid #2962ff;";
                newBtn.attr("style", baseStlye);
            }
            if (colCount == 1) {
                newBtn.attr("style", `${baseStlye}border-left: 1px solid #2962ff;`);
            }
            if (colCount == 2) {
                colCount = -1;
                newBtn.attr("style", `${baseStlye}border-left: 1px solid #2962ff;`);
                sdkBlockCol.append(sdkRow);
                sdkRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
            }
            colCount++;
        }
        sdkBlockRow.append(sdkBlockCol);
        xIndex += 3;
        if (i == 2 || i == 5 || i == 8) {
            xIndex = 0;
            yIndex += 3;
            // sdkBlockRow.prepend($("<div>").attr("class", "col s4 sdkBorder"));
            sdkMainCol.append(sdkBlockRow);
            sdkBlockRow = $("<div>").attr("class", "row").attr("style", "padding: 0px; margin-bottom: 0px;");
        }
    }
    let sdkNumCol = $("<div>").attr("class", "col s12");
    for (let i = 1; i < 10; i++) {
        let newBtn = $("<button>")
            .attr("class", "Button waves-effect waves-teal btn-flat sdkInput")
            .attr("id", `sdkInput${i}`)
            .attr("data-response", i)
            .attr("style", "font-size: 30px; color: #ffffff; text-shadow: 0 0 8px #30ecfb, 0 0 10px #30ecfb;")
            .text(i);
        sdkNumCol.append(newBtn);
        
    }
    gameDiv.append(sdkMainCol);
    gameDiv.append(sdkNumCol);

    gameDiv.append($("<button>")
            .attr("class", "Button col s6 m4 l2 offset-l5 offset-m4 offset-s3 waves-effect waves-teal btn-flat sdkInput")
            .text("Check")
            .css("border", "1px solid #30ecfb")
            .attr("id","check-button"));
    
    
    
    $("#select-game").attr("style", "display:none");
}