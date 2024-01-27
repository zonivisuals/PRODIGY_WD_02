//variables
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
const resetBtn = document.getElementById("reset-btn")
const counterElement = document.getElementById("counter")
const millisecondsEl = document.getElementById("milliseconds")
const secondsEl = document.getElementById("seconds")
const minutesEl = document.getElementById("minutes")
const lapBtnEl = document.getElementById("lap-btn")
const lapDetails = document.getElementById("lap-details")
const lapMinutesEl = document.getElementById("lap-minutes")
const lapSecondsEl = document.getElementById("lap-seconds")
const lapMillisecondsEl = document.getElementById("lap-milliseconds")

// counter variabls
let mincounter = 0
let seccounter = 0
let miscounter = 0

let intervalId = ""
let isPaused = false

let lapTimes = []

//doms events
startBtn.addEventListener("click",startFunction);
pauseBtn.addEventListener("click",pauseFunction);
resetBtn.addEventListener("click",resetFunction);
lapBtnEl.addEventListener("click",lapBtnFunction);




//functions
function counting() {
    if(!isPaused){
        millisecondsEl.innerHTML = zeroAdder(miscounter % 100);
        if (miscounter >= 99) {
            miscounter = 0;
            secondsEl.innerHTML = zeroAdder(++seccounter % 60);
            if (seccounter % 60 === 0) {
                minutesEl.innerHTML = zeroAdder(++mincounter);
            }
        } else {
            miscounter += 1;
        }
    }
}

function startFunction() {
    isPaused = false;
    pauseBtn.innerHTML = "PAUSE";
    clearInterval(intervalId);
    
    millisecondsEl.innerHTML = "00";
    secondsEl.innerHTML = "00";
    minutesEl.innerHTML = "00";
    mincounter = 0;
    seccounter = 0;
    miscounter = 0;

    intervalId = setInterval(counting, 10);
}

function resetFunction() {
    isPaused = false;
    pauseBtn.innerHTML = "PAUSE";
    clearInterval(intervalId);

    millisecondsEl.innerHTML = "00";
    secondsEl.innerHTML = "00";
    minutesEl.innerHTML = "00";
    mincounter = 0;
    seccounter = 0;
    miscounter = 0;

    // Clear lapTimeList
    const lapTimesList = document.getElementById("lap-times");
    lapTimesList.innerHTML = "";

    // Clear lap details
    lapMinutesEl.innerHTML = "00";
    lapSecondsEl.innerHTML = "00";
    lapMillisecondsEl.innerHTML = "00";

    lapTimes = [];
}

function pauseFunction(){
    let status = pauseBtn.innerText;
    if(status === 'PAUSE'){
        isPaused = true;
        pauseBtn.innerHTML = "RESUME";
    } else if (status === 'RESUME'){
        isPaused = false;
        pauseBtn.innerHTML = "PAUSE";
    }
}

function zeroAdder(val){
    let res = val
    if(res<10){
        res = "0"+val
    }
    return res
}

function lapBtnFunction() {
    lapTimes.push({
        minutes: mincounter,
        seconds: seccounter,
        milliseconds: miscounter
    });

    const lapTimeItem = document.createElement("li");
    lapTimeItem.textContent = `Lap ${lapTimes.length}: ${zeroAdder(mincounter)}:${zeroAdder(seccounter)}:${zeroAdder(miscounter)}`;

    // Append the new lap time to the lap times list
    const lapTimesList = document.getElementById("lap-times");

    lapTimesList.append(lapTimeItem);
}


