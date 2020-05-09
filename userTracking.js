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
            localStorage.setItem("name", username);
            $("#newUserOnly").attr("style", "display:none");
            $("#welcome").text("Hello " + username + ", shall we play a game?");
            $(".card").attr("style", "display:block")

        });
    } else {
        //Display "Hello " + username + " welcome back!"
        $("#newUserOnly").attr("style", "display:none");
        $("#welcome").text("Hello " + checkName + ", shall we play a game?");
        $(".card").attr("style", "display:block");

        var newUser = $("<a>").text("Not " + checkName + "? Click Here!");
        //newUser.attr("style" , ) finish styling
        newUser.attr("href", "#").attr("id", "newUser");
        
        $("#welcome").append(newUser);
        $("#newUser").on("click", function (event) {
            event.preventDefault();
            localStorage.setItem("name", "");
            welcome();
            $("#newUserOnly").attr("style", "display:block");

        //Not User?  Need a clickable link to clear Local Storage and re-run the welcome function.
        });
    }

}