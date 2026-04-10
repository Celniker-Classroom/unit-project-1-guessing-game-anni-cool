// add javascript here
let answer = 0;
let guessCount = 0;
let range= 0 
const times = [];
const fastest = document.getElementById("fastest");
const avgTime = document.getElementById("avgTime");
const playBtn = document.getElementById("playBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const guessBtn = document.getElementById("guessBtn");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
let roundStart = 0 
let roundTimes = [];
const scores = [];

//name input
let enteredName = prompt("Please enter your name:");
if(enteredName){
    enteredName = enteredName.toLowerCase();
    enteredName = enteredName.charAt(0).toUpperCase() + enteredName.slice(1);
} else {
    enteredName = "Player";
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("guess").value = "";
document.getElementById("msg").textContent = "Welcome " + enteredName + "! Please select a difficulty level and click PLAY to start the game.";

function play(){
    range = 0;
    roundStart = Date.now();
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
  msg.textContent = enteredName + ", guess a number from 1 to " + range;
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}


function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct " + enteredName + "! It took " + guessCount + " tries.";
        updateScore(guessCount);
        updateTimers();
        resetGame();
    }
    else if(guess < answer && Math.abs(answer - guess) <= 2){
        msg.textContent = "Hot, but too low, try again.";
    }
    else if(guess > answer && Math.abs(answer - guess) <= 2){
        msg.textContent = "Hot, but too high, try again.";
    }
    else if(guess < answer && Math.abs(answer - guess) <= 5){
        msg.textContent = "Warm, but too low, try again.";
    }
    else if(guess > answer && Math.abs(answer - guess) <= 5){
        msg.textContent = "Warm, but too high, try again.";
    }
    else if(guess < answer && Math.abs(answer - guess) > 5){
        msg.textContent = "Cold and too low, try again.";
    }
    else if(guess > answer && Math.abs(answer - guess) > 5){
        msg.textContent = "Cold and too high, try again.";
    }
    }
   


function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; // sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);


    scores.sort(function(a,b){return a-b;}); // sort score increasing


    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}

function giveUp(){
    let score = range 
    msg.textContent = "The correct answer was " + answer + ". Better luck next time, " + enteredName + "!";
    updateScore(score);
    updateTimers();
    resetGame();
}

function resetGame(){
   document.getElementById("guess").value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;

    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        levels[i].disabled = false;
    }

}

//date 
function updateDate(){
    const now = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let monthName = monthNames[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();

    function getSuffix(day){
        if(day >= 11 && day <= 13) return "th";
        if(day % 10 == 1) return "st";
        if(day % 10 == 2) return "nd";
        if(day % 10 == 3) return "rd";
        return "th";
    }

    let dateString = monthName + " " + day + getSuffix(day) + ", " + year;

    document.getElementById("date").textContent = dateString;
}

// update time 
function time(){
    const now = new Date();

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    let month = monthNames[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();

    function suffix(d){
        if(d >= 11 && d <= 13) return "th";
        if(d % 10 === 1) return "st";
        if(d % 10 === 2) return "nd";
        if(d % 10 === 3) return "rd";
        return "th";
    }

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if(hours === 0) hours = 12;

    if(minutes < 10) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;

    let timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;

    document.getElementById("date").textContent =
        month + " " + day + suffix(day) + ", " + year + " — " + timeString;
}

//live clock 
updateDate();
    setInterval(time, 1000);

function updateTimers(){
    let end = Date.now();
    let elapsed = (end - roundStart) / 1000;
    roundTimes.push(elapsed);

    let fastestTime = Math.min(...roundTimes);
    fastest.textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";

    let sum = 0 
    for(let i = 0; i < roundTimes.length; i++){
        sum += roundTimes[i];
    }

    let avg = sum / roundTimes.length;
    avgTime.textContent = "Average Time: " + avg.toFixed(2) + " seconds";
}

// leaderboard 

let leaderboardScores = [];

function updateLeaderboard(score){
    leaderboardScores.push(score);
    leaderboardScores.sort((a,b) => a - b);

    const items = document.getElementsByName("leaderboard");

    for(let i = 0; i < items.length; i++){
        items[i].textContent =
            leaderboardScores[i] !== undefined ? leaderboardScores[i] : "";
    }
}