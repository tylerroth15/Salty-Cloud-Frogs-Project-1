const wins = 0;
const losses = 0;
const ties = 0;

const welcome = function () {

    //add lines for hiding the game cards
    $(".card").attr("style", "display:none")

    //welcoming the user to the site.  If there's no value in local storage the user will be greeted as a stranger and asked to enter their username, which is then stored
    var checkName = localStorage.getItem("name");
    console.log(checkName);
    if (checkName == null || checkName == "null" || checkName == "") {

        $("#welcome").text("Hi, Stranger!");

        $("#enterBtn").on("click", function (event) {
            event.preventDefault();
            console.log("clicked");
            $("#newUserOnly").attr("style", "display:block")

            
            var username = $("#get-username").val().trim();

            if (username === '') {
                console.log('Oops, looks like something is missing!');
                return false;
            } else {
                console.log("Yay, we're good to go!");

                
                localStorage.setItem("name", username);
                $("#newUserOnly").attr("style", "display:none");
                $("#welcome").text("Hello " + username + ", shall we play a game?");
                $(".card").attr("style", "display:block")

                return true;
            }
            
            

        });
    } else {
        //Display "Hello " + username + " welcome back!"
        $("#newUserOnly").attr("style", "display:none");
        $("#welcome").text("Hello " + checkName + ", shall we play a game?");
        $(".card").attr("style", "display:block");

        var newUser = $("<a>").html("<br/>Not " + checkName + "? Click Here!");
        //newUser.attr("style" , ) finish styling
        newUser.attr("href", "#").attr("id", "newUser");
        
        $("#welcome").append(newUser);
        $("#newUser").on("click", function (event) {
            event.preventDefault();
            localStorage.setItem("name", "");
            welcome();
            $("#newUserOnly").attr("style", "display:block");

        });
    }

}

const updateScores = function(){
    console.log(tttTurn + " is the winner")
    if (tttTurn == 'X'){
        console.log("You win!");
    }else if(tttTurn == 'O'){
        console.log("You Lose!");
    }else if(tttTurn =='-'){
        console.log("You tied!")
    }

}


// $("#highscore").on("click", function (event){
//     event.preventDefault();
//     console.log("clicked");
//     $(".card").attr("style", "display:none")
//     var username = localStorage.getItem(name);
//     var tttHighScore = (username+"saveData"[0]);
//     console.log(tttHighScore);
    
    

// });
    
