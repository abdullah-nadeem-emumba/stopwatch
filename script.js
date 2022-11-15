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

let tableIndex = 0;

let hoursText = document.querySelector("#hours");
let minsText = document.querySelector("#mins");
let secText = document.querySelector("#secs");
let msText = document.querySelector("#millisecs");
let msTextSmall = document.querySelector("#millisecs-small");
let splitTxt = document.querySelector("#split-time-txt");
let table = document.querySelector(".table");

let startBtn = document.querySelector("#start-btn");
let splitBtn = document.querySelector("#split-btn");
let resetBtn = document.querySelector("#reset-btn");

let tableData = [];

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
  const log = logTime(hours, mins, secs, millisecs, "Pause");
  tableData.push(log);
  clearInterval(millisecsInterval);
  clearInterval(secondsInterval);
  clearInterval(minutesInterval);
  clearInterval(hoursInterval);
  createTable();
}

function resetTimer() {
  millisecs = 0;
  secs = 0;
  mins = 0;
  hours = 0;
  setTimeInView(hours, mins, secs, millisecs);
  tableData = [];
  splitTxt.innerHTML = "Split Time";
  emptyTable();
  tableIndex = 0;
}

function split() {
  const log = logTime(hours, mins, secs, millisecs, "Split");
  tableData.push(log);
  splitTxt.innerHTML = log["Split"];
  createTable();
}

function logTime(hours, mins, sec, ms, type) {
  return {
    [type]: `${hours}:${mins}:${sec}.${ms}`,
  };
}

function setTimeInView(hours, mins, sec, ms) {
  hoursText.innerHTML = hours.toString().length > 1 ? hours : `0${hours}`;
  minsText.innerHTML = mins.toString().length > 1 ? mins : `0${mins}`;
  secText.innerHTML = sec.toString().length > 1 ? sec : `0${sec}`;

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

function createTable() {
  for (let i = tableIndex; i < tableData.length; i++) {
    let row = document.createElement("tr");
    let indexCell = document.createElement("td");
    indexCell.classList.add("table-data");
    row.appendChild(indexCell);
    indexCell.innerHTML = `#${i + 1}`;
    console.log(tableData[i]);
    for (const [key, value] of Object.entries(tableData[i])) {
      let cell = document.createElement("td");
      let div = document.createElement("div");
      let keyText = document.createElement("p");
      let valText = document.createElement("p");
      keyText.classList.add("no-margin");
      valText.classList.add("no-margin");
      div.classList.add("cell-div");
      cell.classList.add("table-data");
      cell.appendChild(div);

      if (key === "Pause") {
        valText.classList.add("pink-text");
      } else {
        valText.classList.add("orange-text");
      }

      keyText.classList.add("gray-text");

      let txt2 = document.createTextNode(value);
      let txt1 = document.createTextNode(key);

      div.appendChild(valText);
      div.appendChild(keyText);

      valText.appendChild(txt2);
      keyText.appendChild(txt1);

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  tableIndex = tableData.length;
}

function emptyTable() {
  table.innerHTML = "";
}
