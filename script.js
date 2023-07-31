//currentChoice keeps track of the users input
let currentChoice = "";
//Stores the users input in currentChoice 
const choiceButtons = document.querySelectorAll(".choice-button");
choiceButtons.forEach(choice => {
    choice.addEventListener('click', () => {
        if(currentChoice==""){
            currentChoice = choice.innerHTML;
        }
    });
});