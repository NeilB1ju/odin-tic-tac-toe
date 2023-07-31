//Module for the game board
const gameBoard = (() => {
    let turn = -1;
    let gameArray = ['','','','','','','','',''];

    //updates the gameArray with the position and symbol inputted by the player
    const updateBoard = (position, symbol) => {
        gameArray[position-1] = symbol;
    }

    //Keeps track of the currently active player using the symbol0
    const currentPlayer = () => {
        //Increments the value of turn so that one player moves after the other
        turn++;
        console.log(turn);
        if(turn%2==0){
            return 'X';
        }
        else{
            return 'O';
        }
    }

    //This function updates the gameBoard using the contents of the gameArray
    const populateBoard = () => {
        let track = 0;
        boardButtons.forEach(button => {
            button.innerHTML = gameBoard.gameArray[track];
            track++;
        });
    }

    const resetBoard = () =>{
        turn = -1;
        gameArray = ['','','','','','','','','']
    }
    return {gameArray, updateBoard, currentPlayer, populateBoard, resetBoard, turn};
})();



//Updating the game board on click 
const turn = document.querySelector('.turn');
const boardButtons = document.querySelectorAll(".board-element");
boardButtons.forEach(button => {
    button.addEventListener('click', () => {
        //Checks if the space hasn't been occupied already
        if(button.innerHTML == ""){
            if(gameBoard.currentPlayer() == 'X'){
                button.innerHTML = "X";
                turn.innerHTML = "Player O's Turn";
            }
            else{
                button.innerHTML = "O";
                turn.innerHTML = "Player X's Turn";
            }
        }
    });
});


//Reset button functionality 
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    gameBoard.resetBoard();
    gameBoard.populateBoard();
    turn.innerHTML = "Player X's Turn";
});