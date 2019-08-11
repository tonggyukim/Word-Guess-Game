///GLOBAL VARIABLES

//Arrays and Variables for holding data
var wordOptions = ["turan", "joel", "gerson", "jack", "tonggyu", "prasamsha"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; 
var wrongLetters = [];
//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;
//FUNCTIONS
function startGame (){
    selectedWord = wordOptions[Math.floor(Math.random()*wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate blanks and succesess with right number of blanks
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
    // Change HTML to reflect round conditions

    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter){
    // Check if letter exists in code at all

    var isLetterInWord = false;
    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }
    //Check where in the word the letter exists, then populate out blanksAndSuccesses array
    if(isLetterInWord){
        for (var i=0;i<numBlanks;i++){
            if(selectedWord[i]==letter){
            blanksAndSuccesses[i]=letter;
        }
    }
}
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    console.log(blanksAndSuccesses);

}
function roundComplete(){
    console.log("Win Count: " + winCount + "| Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);

    //Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join("  ");
    //Check if user won
    if(lettersinWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Won!");

        document.getElementById("winCounter").innerHTML=winCount;

        startGame();
    }
    else if (guessesLeft == 0){
        lossCount++;
        alert("You Lost!");
        document.getElementById("lossCounter").innerHTML=lossCount;
        startGame();
    }
}
//MAIN PROCESS

//Initiates the code the first time
startGame();

//Register keyclicks

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keycode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    //Testing/Debugging
    console.log(letterGuessed);
}