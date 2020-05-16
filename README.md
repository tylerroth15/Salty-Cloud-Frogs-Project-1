# Salty-Cloud-Frogs-Project-1

## Team Members:
Tyler, David, and Chris

## Project Roles:
Product Owner: David
Repo Owner: Tyler
Scrum Master: Chris

## Minimum Viable Product:
As a user I want to be able to play 2 different in-browser games(Tic Tac Toe, Sudoku).
As a user I want to sign in to be able to choose a game, and have the site remember me.
As a user I want to have the choice to replay the game or return to the home page.

## Our Story
Our team sought to create a more old-school arcade experience for visitors to our site in both aesthetic and game experience.  Our site is built in such a way that we can add additional cards with other game types dynamically.  We're tracking users to the site and storing that information locally to be pulled again later, and can, given more time, save scores and maintain a database of high scores.

## Usage
There is no specialized code required to run the site once a user lands on our page, and they can enjoy playing our games after "signing in".  We utilized Materialize as our CSS, as it could most closely enable to accomplish our aesthetic.

## User Experience
On opening the page for the first time, the user will be prompted to input their name.  This will be save to local storage for subsequent visits.  We will not allow the user to start playing without inputting some string.  Once they've entered their name they can start enjoying our games.  Tic Tac Toe uses an API to recommend the available moves to the computer, however in order to give the player a chance to do better than tie, we added a chance that the computer would choose an "not-ideal" location to place their move.  Sudoku's API generates an easy, medium, or hard game board, dependent on user selection, and then starts a timer on gameboard display to show the user how they're doing.  We wrote code to determine a successful game board, and if the user does not present a correct board, they can continue to try.

Our site was designed with SEO in mind and fully responsive sizing regardless of breakpoints.

_______________________________________________________


## Unfleshed Ideas:

- Easter Eggs?
- Gamification
- Titles and Badges

## To Do:
- [x] Create Repo
- [x] Create Starter Files
- [x] Add collaborators
- [x] Set up Kanban board
- [x] Wireframe
- [x] Choose Framework
- [x] Build Basic Layout
- [x] Style Basic Layout
- [x] TicTacToe API working
- [x] Sudoku API working
- [x] User Tracking - local storage
- [x] Score Tracking - local storage
- [x] Polish

## Backlog:
- [] Display user’s scores in game(s)
- [] Scoreboard on main page with Top Three for each game
- [] Add Additional games
