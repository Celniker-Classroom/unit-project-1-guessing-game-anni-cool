// add javascript here
//Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses= 0;
let scores= 0;

// player name
let playerName = prompt("Enter your name:"); 

let range = 0;
//Play  
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    let range = 3; 
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }

    //round setup 
    answer= Math.floor(Math.random() * range) + 1;
    
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range + ". Good luck!";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for (let i=0; i < levelRadios.length; i++) {
        levelRadios[i].addEventListener("change", function() {
        document.getElementById("playBtn").disabled = true;
        }); 
    }   

});
  

//Guess

//guessing 
document.getElementById("guessBtn").addEventListener("click", function() {
    let input = document.getElementById("guess").value;
let num = parseInt(input);

if (isNaN(num)) {
    document.getElementById("msg").textContent = "Please enter a valid number.";
    return;
}

guessCount++; 
let diff = Math.abs(num-answer);

//correct 
if (num === answer) {
    document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the correct number in " + guessCount + " guesses.";
updateScore(guessCount);
resetBtn();
} else if (diff <= 2) {
    document.getElementById("msg").textContent = "Very close! Try again.";
} else if (diff <= 5) {
    document.getElementById("msg").textContent = "Close! Keep trying.";
} else {
    document.getElementById("msg").textContent = "Not even close. Try again.";
}
});

function updateScore(score) {
totalWins ++; 
totalGuesses += score;

document.getElementById("wins").textContent = "Total Wins:" + totalWins;
document.getElementById("avgScore").textContent = "Average Score:" + (totalGuesses / totalWins).toFixed(1);
}

function resetBtn() {
            document.getElementById("guessBtn").disabled= true 
        document.getElementById("giveUpBtn").disabled= true;
            document.getElementById("playBtn").disabled = false;

            document.getElementById("guess").value = "";
            guessCount = 0;
        };

        //update leader boar
        scores.push(score);
        scores.sort(function(a, b) { return a - b; });

        let leaderboard = document.getElementById("leaderboard");
        for (let i = 0; i < leaderboard.length; i++) {
            if (i < scores.length) {
                leaderboard[i].textContent = scores[i];
            } else {
                leaderboard[i].textContent = "--";
            }
        }