const wins = 0;
const losses = 0;
const ties = 0;

const welcome = function () {

    //add lines for hiding the game cards
    $(".card").attr("style", "display: none")

    //welcoming the user to the site.  If there's no value in local storage the user will be greeted as a stranger and asked to enter their username, which is then stored
    let checkName = localStorage.getItem("name");
    if (checkName == null || checkName == "null" || checkName == "") {
        $("#welcome").text("Hi, Stranger!");

        $("#enterBtn").on("click", userLogin);
        $("#get-username").on("keydown", enterKeyHandler);
    } else {
        //Display "Hello " + username + " welcome back!"
        $("#newUserOnly").attr("style", "display: none");
        $("#welcome").text("Hello " + checkName + ", shall we play a game?");
        $(".card").attr("style", "display:block");

        let newUser = $("<a>").html("<br/>Not " + checkName + "? Click Here!");
        //newUser.attr("style" , ) finish styling
        newUser.attr("href", "#").attr("id", "newUser");
        
        $("#welcome").append(newUser);
        
        $("#newUser").on("click", storedLogin);
    }

}

const enterKeyHandler = function (event) {
    if(event.key == "Enter") {
        $("#enterBtn").click();
    }
}

const userLogin = function (event) {
    event.preventDefault();
    $("#newUserOnly").attr("style", "display:block")

    
    let username = $("#get-username").val().trim();

    if (username === '') {
        return false;
    } else {

        
        localStorage.setItem("name", username);
        $("#newUserOnly").attr("style", "display: none");
        $("#welcome").text("Hello " + username + ", shall we play a game?");
        $(".card").attr("style", "display:block")

        return true;
    }
}

const storedLogin = function (event) {
    event.preventDefault();
    localStorage.setItem("name", "");
    welcome();
    $("#newUserOnly").attr("style", "display:block");
}



const playAgain = function(){

    let playAgain = $("<a>").html("<br/>Would you like to play again? Click Here!");
    playAgain.attr("href", "#").attr("id", "playAgain");
    $("#game-board").append(playAgain);

    let goHome = $("<a>").html("<br/> Home");
    goHome.attr("href", "#").attr("id", "goHome");
    let newDiv = $("<div>").attr("style", "padding-top: 25px");
    $("#game-board").append(newDiv);
    newDiv.append(goHome);

    $("#playAgain").on("click", function (event) {
        event.preventDefault();
        init();
        pageNumber = 2;
        render();
        playTicTacToe();
    
    });

    $("#goHome").on("click", function (event) {
        event.preventDefault();
        init();
        pageNumber = 1;
        render();        
    });
}

const updateScores = function(){
    if (tttTurn == 'X'){
        $("#game-board").empty();
        let disposition = $("<h3>").text("Congratulations, you win!")
        $("#game-board").append(disposition);
        playAgain();
        
    }else if(tttTurn == 'O'){
        $("#game-board").empty();
        let disposition = $("<h3>").text("You lose! Try Again!")
        $("#game-board").append(disposition);
        playAgain();

    }else if(tttTurn =='-'){
        $("#game-board").empty();
        let disposition = $("<h3>").text("You tied, nice try!")
        $("#game-board").append(disposition);
        playAgain();
        
    }

}
