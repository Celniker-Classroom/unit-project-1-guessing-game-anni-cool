// add javascript here
// player name
let playerName = prompt("Enter your name:"); 

let range = 0;
function setDifficulty() {
    if (document.getElementById("e").checked) {
        range = 3;
        alert("Hi "+ playerName + ", you have selected Easy mode. You will be guessing a number between 1 and 3.");
        document.getElementById("msg").innerText = "Easy";
    }
    if (document.getElementById("m").checked) {
        range = 10;
        alert("Hi "+ playerName + ", you have selected Medium mode. You will be guessing a number between 1 and 10.");
        document.getElementById("msg").innerText = "Medium";
    }
    if (document.getElementById("h").checked) {
        range = 100;
        alert("Hi "+ playerName + ", you have selected Hard mode. You will be guessing a number between 1 and 100.");
    }
}

document.getElementById("playBtn").addEventListener("click", function() {
    setDifficulty();
    let randomNumber = Math.floor(Math.random() * range) + 1;
    document.getElementById("msg").innerText = id;
});