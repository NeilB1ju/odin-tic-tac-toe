const modal = document.querySelector(".modal");
const overlay = document.querySelector('.overlay');
const modalButton = document.querySelector('.modal-button');
const modalText = document.querySelector(".modal-text");
const turn = document.querySelector('.turn');
const boardButtons = document.querySelectorAll(".board-element");



//Module for the game board
const gameBoard = (() => {
    let turn = -1;
    let gameArray = [['','',''],['','',''],['','','']];

    //Keeps track of the currently active player using the symbol0
    const currentPlayer = () => {
        //Increments the value of turn so that one player moves after the other
        turn++;
        if(turn%2==0){
            return 'X';
        }
        else{
            return 'O';
        }
    }

    const checkWin = (position, symbol) => {
        let win = false;
        let draw = false;
        console.log(turn);
        //Updating the position that has been occupied in the gameArray
        gameArray[position[0]][position[1]] = symbol;

        //Checking for a row win
        if(gameArray[position[0]][0] == gameArray[position[0]][1] && gameArray[position[0]][1] == gameArray[position[0]][2] && gameArray[position[0]][2] == symbol){
            win = true;
        }

        //Checking for a column win
        if(gameArray[0][position[1]] == gameArray[1][position[1]] && gameArray[1][position[1]] == gameArray[2][position[1]] && gameArray[0][position[1]] == symbol){
            win = true;
        }

        //Checking for a diagonal win 
        if((gameArray[0][0] == gameArray[1][1] && gameArray[0][0] == gameArray[2][2] && gameArray[0][0] == symbol) || (gameArray[0][2] == gameArray[1][1] && gameArray[0][2] == gameArray[2][0] && gameArray[0][2] == symbol)){
            win = true;
        } 

        //Checkign for a draw
        if(turn == 8 && !win){
            modal.classList.add('active');
            overlay.classList.add('active');
            modalText.innerHTML = "Its a draw";
        }

        if(win){
            modal.classList.add('active');
            overlay.classList.add('active');
            modalText.innerHTML = symbol + " Wins";
        }
    } 

    //This function is used to reset the board when the reset button is pressed 
    const resetBoard = () =>{
        turn = -1;
        gameArray = [['','',''],['','',''],['','','']];
        //Resetting the boards content
        boardButtons.forEach(button => {
            button.innerHTML = "";
        });
    }

    return {gameArray, currentPlayer, resetBoard, checkWin};
})();



//Function that is passed to the event listeners on each of the boardButtons
const buttonClickHandler = (event) => {
    const button = event.target;
    //Checks if the space hasn't been occupied already
    if (button.innerHTML == "") {
        //Fetches the class corresponding to the position of the button in the grid
        let position = button.classList[1];
        // Convert the position to numbers using parseInt()
        let row = parseInt(position[0]);
        let col = parseInt(position[1]);

        if (gameBoard.currentPlayer() == 'X') {
            button.innerHTML = "X";
            turn.innerHTML = "Player O's Turn";
            gameBoard.checkWin([row, col], "X");
        } else {
            button.innerHTML = "O";
            turn.innerHTML = "Player X's Turn";
            gameBoard.checkWin([row, col], "O");
        }
    }
};


//Initially adding the event listener to each button
boardButtons.forEach(button => {
    button.addEventListener('click', buttonClickHandler);
});



//Reset button functionality 
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    gameBoard.resetBoard();
    turn.innerHTML = "Player X's Turn";
});


//Modal button functionality
modalButton.addEventListener('click', () => {
    turn.innerHTML = "Player X's Turn";
    overlay.classList.remove("active");
    modal.classList.remove("active");
    gameBoard.resetBoard();
});
