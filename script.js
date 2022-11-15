let started = false;
let hours = 0;
let mins = 0;
let secs = 0;
let millisecs = 0;
let smallMilliSecs = 0;

let millisecsInterval;
let secondsInterval;
let minutesInterval;
let hoursInterval;

let hoursText = document.querySelector("#hours");
let minsText = document.querySelector("#mins");
let secText = document.querySelector("#secs");
let msText = document.querySelector("#millisecs");
let msTextSmall = document.querySelector("#millisecs-small");
let splitTxt = document.querySelector("#split-time-txt");

let startBtn = document.querySelector("#start-btn");
let splitBtn = document.querySelector("#split-btn");
let resetBtn = document.querySelector("#reset-btn");

function toggleStart() {
  started = !started;

  if (started) {
    startBtn.style.backgroundColor = "#FB657F";
    startBtn.innerHTML = "Pause";
    startTimer();
    splitBtn.disabled = false;
    resetBtn.disabled = true;
  } else {
    startBtn.style.backgroundColor = "#18a69d";
    startBtn.innerHTML = "Start";
    pauseTimer();
    splitBtn.disabled = true;

    resetBtn.disabled = false;
  }
}

function startTimer() {
  millisecsInterval = setInterval(() => {
    millisecs = millisecs > 1000 ? 1 : millisecs + 1;
    setTimeInView(hours, mins, secs, millisecs);
  }, 1);

  secondsInterval = setInterval(() => {
    secs = secs > 59 ? 1 : secs + 1;
  }, 1000);

  minutesInterval = setInterval(() => {
    mins = mins > 59 ? 1 : mins + 1;
  }, 1000 * 60);

  hoursInterval = setInterval(() => {
    hours++;
  }, 1000 * 60 * 60);
}

function pauseTimer() {
  logTime(hours, mins, secs, millisecs, "Pause");
  clearInterval(millisecsInterval);
  clearInterval(secondsInterval);
  clearInterval(minutesInterval);
  clearInterval(hoursInterval);
}

function resetTimer() {
  millisecs = 0;
  secs = 0;
  mins = 0;
  hours = 0;
  setTimeInView(hours, mins, secs, millisecs);
}

function split() {
  splitTxt.innerHTML = logTime(hours, mins, secs, millisecs, "Split").time;
}

function logTime(hours, mins, sec, ms, type) {
  //return `${type},   ${hours}:${mins}:${sec}.${ms}`;
  return {
    type,
    time: `${hours}:${mins}:${sec}.${ms}`,
  };
}

function setTimeInView(hours, mins, sec, ms) {
  hoursText.innerHTML = hours.toString().length > 1 ? hours : "0" + hours;
  minsText.innerHTML = mins.toString().length > 1 ? mins : "0" + mins;
  secText.innerHTML = sec.toString().length > 1 ? sec : "0" + sec;

  let stringMS = ms.toString();
  if (stringMS.length > 1) {
    let msToArray = stringMS.split("");
    msText.innerHTML = msToArray[0];
    msTextSmall.innerHTML =
      msToArray[msToArray.length - 2] + msToArray[msToArray.length - 1];
  } else {
    msText.innerHTML = ms;
    msTextSmall.innerHTML = 0;
  }
}
