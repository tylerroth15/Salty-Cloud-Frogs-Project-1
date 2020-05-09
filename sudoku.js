const playSudoku = function () {   
   $.get("https://cors-anywhere.herokuapp.com/http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=2").then(function (response) {
        response = JSON.parse(response).squares;

        for (let i = 0; i < response.length; i++) {
            $(`#sdkBtn${(response[i].x*9)+response[i].y}`).text(response[i].value);
        }
    });
}
