/*
    Name: Gar Powell
    File name: fizzBuzz.js
    Date: 9/23/24
 */

// Initialize the variable
let number = 1;

// Using a while loop to calculate the numbers 1 to 100.
while (number <= 100) {
    // Find and print Fizz Buzz for all numbers divisible by 3 and 5.
    if ((number % 3 == 0) && (number % 5 == 0)) {
        console.log("Fizz Buzz")
    }
    // Find the numbers divisable by 3. Print Fizz for them.
    else if (number % 3 == 0) {
    console.log("Fizz")
    }
    // Find the numbers divisable by 5. Print Buzz for them.
    else if (number % 5 == 0) {
    console.log("Buzz")
    }
    // Print all other numbers
    else {
    console.log(number)
    }
    

    
  number = number + 1;
}