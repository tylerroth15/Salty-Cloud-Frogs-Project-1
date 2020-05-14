let currentSelect;
let sdkBoardState;
let sdkTimer;
let sdkTime;

const playSudoku = function () {

    //Will be from 1-3 depending on user choice.
    let diff = 1;
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

    let sdkTimer = setInterval(() => {
        sdkTime++;
    }, 1000);
    $.get(`https://cors-anywhere.herokuapp.com/http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${diff}`).then(function (response) {
        response = JSON.parse(response).squares;
        for (let i = 0; i < response.length; i++) {
            let x = response[i].x;
            let y = response[i].y;
            let val = response[i].value;
            let btnRef = $(`#sdkBtn${(y * 9) + x}`);
            btnRef.text(val).attr("class", "Button btn-flat starter").css("color", "blue").attr("data-sdkval", val);
            sdkBoardState.rows[y][x] = val;
            sdkBoardState.cols[x][y] = val;
            sdkBoardState.blocks[btnRef.attr("data-sdkblock")][btnRef.attr("data-sdkblockpos")] = val;
        }
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

const updateSquare = function (val) {
    let currentBtn = $(`#sdkBtn${currentSelect}`);
    currentBtn.text(val);
    currentBtn.attr("data-sdkval", val);
    sdkBoardState.rows[currentBtn.attr("data-sdky")][currentBtn.attr("data-sdkx")] = val;
    sdkBoardState.cols[currentBtn.attr("data-sdkx")][currentBtn.attr("data-sdky")] = val;
    sdkBoardState.blocks[currentBtn.attr("data-sdkblock")][currentBtn.attr("data-sdkblockpos")] = val;
    currentSelect = -1;
}

const checkSolution = function () {
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

        console.log(isSolved);
        if (isSolved) {
            clearInterval(sdkTimer);
            console.log(sdkTime);
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