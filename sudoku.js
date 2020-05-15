let currentSelect;
let sdkBoardState;
let sdkTimer;
let sdkTime = 0;
let diff;
let feedback = $("<h3>")
    .text("")
    .attr("class", "col s12")
    .attr("style", "visibility: hidden");

const playSudoku = function () {
    $("#welcome").attr("style", "display: none");
    $("#game-board").append(feedback);

    //Will be from 1-3 depending on user choice.
    isBoardFilled = false;

    sdkBoardState = {
        rows: [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
        ],
        cols: [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
        ],
        blocks: [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],

            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
        ],
    }

    $.get(`https://cors-anywhere.herokuapp.com/http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${diff}`).then(function (response) {
        response = JSON.parse(response).squares;
        for (let i = 0; i < response.length; i++) {
            let x = response[i].x;
            let y = response[i].y;
            let val = response[i].value;
            let btnRef = $(`#sdkBtn${(y * 9) + x}`);
            btnRef.text(val).attr("class", "Button btn-flat starter sdkBtn").attr("data-sdkval", val);
            sdkBoardState.rows[y][x] = val;
            sdkBoardState.cols[x][y] = val;
            sdkBoardState.blocks[btnRef.attr("data-sdkblock")][btnRef.attr("data-sdkblockpos")] = val;
        }
        sdkTimer = setInterval(() => {
            sdkTime++;
            if (sdkTime < 60) {
                $("#timerDiv").text(`${sdkTime}s`);
            } else if (sdkTime < 3600) {
                $("#timerDiv").text(`${Math.floor(sdkTime/60)}m ${sdkTime%60}s`);
            } else {
                $("#timerDiv").text(`${Math.floor(sdkTime/3600)}h ${Math.floor((sdkTime%3600)/60)}m ${sdkTime%60}s`);
            }
        }, 1000);
    });
}

const sudokuClickHandler = function (target) {
    if (currentSelect === undefined) {
        currentSelect = -1;
    }
    if ($(target).attr("id") === "check-button") {
        checkSolution();
        return;
    }
    if ($(target).hasClass("starter")) {
        currentSelect = -1;
        return;
    }
    if ($(target).hasClass("sdkInput")) {
        if (currentSelect === -1) {
            return;
        } else {
            updateSquare($(target).text());
        }
    } else {
        currentSelect = target.dataset.sdkpos;
    }
}

const sudokuKeyHandler = function (key) {
    if (currentSelect == -1) {
        return;
    } else {
        updateSquare(key);
    }
}

const clearHandler = function () {
    if (currentSelect == -1) {
        return;
    } else {
        console.log("Trying to clear");
        updateSquare(" ");
    }
}

const updateSquare = function (val) {
    let currentBtn = $(`#sdkBtn${currentSelect}`);
    currentBtn.text(val);
    if (!currentBtn.hasClass("sdkUserInput")) {
        currentBtn.addClass("sdkUserInput");
    }
    currentBtn.attr("data-sdkval", val.trim());
    sdkBoardState.rows[currentBtn.attr("data-sdky")][currentBtn.attr("data-sdkx")] = val.trim();
    sdkBoardState.cols[currentBtn.attr("data-sdkx")][currentBtn.attr("data-sdky")] = val.trim();
    sdkBoardState.blocks[currentBtn.attr("data-sdkblock")][currentBtn.attr("data-sdkblockpos")] = val.trim();
    currentSelect = -1;
}

const checkSolution = function () {    
    feedback.attr("style", "display: none");
    if (checkBoardFill()) {
        let isSolved = true;
        for (let i = 0; i < 9; i++) {
            isSolved = checkSdkLine(sdkBoardState.rows[i]);
            if (isSolved) {
                isSolved = checkSdkLine(sdkBoardState.cols[i]);
            }
            if (isSolved) {
                isSolved = checkSdkLine(sdkBoardState.blocks[i]);
            }
        }
        feedback.attr("style", "visibility: visible");
        console.log(isSolved);
        if (isSolved) {
            feedback.text("You did it!");
            clearInterval(sdkTimer);
        } else {
            feedback.text("Try Again");
            setTimeout(function() {
                feedback.attr("style", "visibility: hidden");
            }, 1500);
        }
    } else {
        return;
    }

}

const checkSdkLine = function (array) {
    let arrayClear = true;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i != j) {
                if (array[i] == array[j]) {
                    arrayClear = false;
                }
            }
        }
    }
    return arrayClear;
}

const checkBoardFill = function () {
    let isBoardFilled = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sdkBoardState.rows[i][j] == '') {
                isBoardFilled = false;
                return isBoardFilled;
            }
        }
    }
    return isBoardFilled;
}