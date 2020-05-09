let currentSelect = -1;

const playSudoku = function () {   
    
    //Will be from 1-3 depending on user choice.
    let diff = 2;
    
   $.get(`https://cors-anywhere.herokuapp.com/http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${diff}`).then(function (response) {
        response = JSON.parse(response).squares;

        for (let i = 0; i < response.length; i++) {
            $(`#sdkBtn${(response[i].x*9)+response[i].y}`).text(response[i].value).attr("class", "Button btn-flat starter").css("color", "blue");
        }        
    });
}

const sudokuClickHandler = function(target) {
    if ($(target).hasClass("starter")) {
        currentSelect = -1;
        return;
    }
    if ($(target).hasClass("sdkInput")) {
        if (currentSelect === -1) {
            return;
        } else {
            $(`#sdkBtn${currentSelect}`).text($(target).text());
            currentSelect = -1;
        }
    }
    
    currentSelect = target.dataset.sdkpos;
}