var state = "foucus"; // Default state 'foucus' or 'break'

const foucusTime = 25 * 60; // Total time in seconds
const breakTime = 5 * 60; // Break time in seconds

var currentTime = foucusTime; // Current time in seconds
var counterInterval = currentTime; // Elapsed time in seconds
var interval; // Declare interval variable in the global scope

var tomato = document.querySelector("#tomato");
var pausePlay = document.querySelector("#pause-play");
var resetButton = document.querySelector("#reset-button");
var progressBar = document.querySelector("#progress-bar");

tomato.addEventListener("mouseover", function() {
    tomato.style.transform = "scale(1.2)";
    pausePlay.style.color = (state==="foucus")? "#892e2e":"#3585f1";
});

tomato.addEventListener("mouseout", function() {
    tomato.style.transform = "scale(1)";
    pausePlay.style.color = (state == "foucus")? "#892e2e69":"#3585f169";
});

tomato.addEventListener("click", function() {
    if (pausePlay.classList.contains("bi-play-fill")) {
        // Playing
        pausePlay.classList.remove("bi-play-fill");
        pausePlay.classList.add("bi-pause-fill");
        console.log("Playing...");
        timer(counterInterval); // Start the timer

    } else {
        // Paused
        pausePlay.classList.remove("bi-pause-fill");
        pausePlay.classList.add("bi-play-fill");
        clearInterval(interval); // Pause the interval without resetting
        counterInterval = Math.floor((parseFloat(progressBar.style.width) * currentTime) / 100); // Calculate elapsed time and cast into integer
        console.log("Paused at: i = ", counterInterval, "seconds.");
    }
});

resetButton.addEventListener("click", reset);

function timer(i){

    interval = setInterval(function() { // Interval itself its a loop
        if (i >= 0) {
            console.log(i);
            progressBar.style.width = (i / (currentTime)) * 100 + "%";
            i--;
        } else {    
            reset(); // Reset the timer when it reaches 0
            if (state === "foucus") {
                state = "break"; // Switch to break state
                currentTime = counterInterval = breakTime; // Set the counter interval to break time
                progressBar.style.backgroundColor = "#617edd"; // Change the progress bar color to red
                document.querySelector("img").src = "https://cdn-icons-png.freepik.com/256/3532/3532371.png"; // Change the image source to coffee
                document.querySelector("#state").innerHTML = "Break Time"; // Change the state text to break time
                console.log("Switching to break time.");
            }
            else {
                state = "foucus"; // Switch to focus state
                currentTime = counterInterval = foucusTime; // Set the counter interval to focus time
                progressBar.style.backgroundColor = "#e96363"; // Change the progress bar color to blue
                document.querySelector("img").src = "https://cdn-icons-png.flaticon.com/512/3076/3076000.png"; // Change the image source to tomato
                document.querySelector("#state").innerHTML = "Pomodoro Time"; // Change the state text to focus time
                console.log("Switching to focus time.");
            }
            timer(counterInterval); // Start the timer again with the new time
            pausePlay.classList.remove("bi-play-fill"); // Change icon to play
            pausePlay.classList.add("bi-pause-fill");
            pausePlay.style.color = (state == "foucus")? "#892e2e69":"#3585f169";
        }
    }, 1000);
}

function reset() {
    clearInterval(interval); // Clear the interval
    progressBar.style.width = "100%"; // Reset the progress bar width to 0%
    pausePlay.classList.remove("bi-pause-fill");
    pausePlay.classList.add("bi-play-fill"); // Change icon to play
    counterInterval = currentTime; // Reset the elapsed time to the initial value
    console.log("Timer reset.");
}