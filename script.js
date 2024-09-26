let timer;
let startTime;
let updatedTime;
let elapsedTime = 0;
let isRunning = false;
let lapNumber = 0;

// Get elements
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Update the timer display
function updateTime() {
    updatedTime = Date.now() - startTime + elapsedTime;
    
    const milliseconds = parseInt((updatedTime % 1000) / 10);
    const seconds = parseInt((updatedTime / 1000) % 60);
    const minutes = parseInt((updatedTime / (1000 * 60)) % 60);
    const hours = parseInt((updatedTime / (1000 * 60 * 60)) % 24);

    const formattedTime = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds;

    display.textContent = formattedTime;
}

// Start the timer
startButton.addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
    }
});

// Pause the timer
pauseButton.addEventListener('click', function() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
    }
});

// Reset the timer
resetButton.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    lapNumber = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';  // Clear lap times
});

// Record a lap
lapButton.addEventListener('click', function() {
    if (isRunning) {
        lapNumber++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${display.textContent}`;
        lapsContainer.appendChild(lapItem);
    }
});
