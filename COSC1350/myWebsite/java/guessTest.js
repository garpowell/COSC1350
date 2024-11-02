// Name: Gar Powell
// Document Name: guessTest
// date: 10/29/24

// Number guessing game javascript function.
// Generate random number
let x = Math.floor((Math.random() * 100) + 1);

// Set the variables
let trys = 0;
let guess = document.getElementById("guess");
let Guess = document.getElementById("Guess");
let trysText = document.getElementById("trys");
let resul = document.getElementById("resul");
let numbersGussed = document.getElementById("numbersGussed");
let numbers = ""

// Run function on click
Guess.addEventListener("click", testGuess);

function testGuess() {
    // Set a veriable    
    let number = Number(guess.value);

        // Getting the guess entered.
        trys++
        
        // evaluate the guess
        if (number == ""){
          resul.textContent = ("Please enter a positive whole number");
            }
        else if (number === x){
            alert("You got it");
            }
    
        else if (number < x){
            resul.textContent = ("Your guess is too low");
            }
        else {
            resul.textContent = ("Your guess is too high");
            
            }

        if (trys > 10) {
                alert("You are out of trys. You lose. Try again!");
                  }

        // Print the number of trys
        trysText.textContent =" Trys: " + trys;
        numbersGussed.textContent = (numbers + number);
        numbers = numbers + number + ", ";

        }


     

     
     
