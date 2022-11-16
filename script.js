const PAUSE = "Pause";
const SPLIT = "Split";
let started = false;
let millisecs = 0;

let millisecsInterval;

let timeText = document.querySelector("#hours");
let msTextSmall = document.querySelector("#millisecs-small");
const splitTxt = document.querySelector("#split-time-txt");
const table = document.querySelector(".table");

const startBtn = document.querySelector("#start-btn");
const splitBtn = document.querySelector("#split-btn");
const resetBtn = document.querySelector("#reset-btn");

let tableData = [];

function toggleStart() {
  started = !started;

  if (started) {
    startBtn.style.backgroundColor = "#FB657F";
    startBtn.innerHTML = PAUSE;
    startTimerNew();
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

function convertTime(timeInMS) {
  let ms = timeInMS;
  let s = Math.floor(millisecs / 1000);
  let m = Math.floor(s / 60);
  let h = Math.floor(m / 60);

  ms = ms % 1000;
  s = s % 60;
  m = m % 60;
  h = h % 24;

  return {
    ms,
    s,
    m,
    h,
  };
}

function formatTime(timeInMS) {
  const { ms, s, m, h } = convertTime(timeInMS);
  return `${padTo2Digits(h)}:${padTo2Digits(m)}:${padTo2Digits(s)}.${pad3Digits(
    ms
  )}`;
}

function formatTimeSmallMS(timeInMS) {
  const { ms, s, m, h } = convertTime(timeInMS);
  msToArr = ms.toString().split("");
  bigMS = msToArr[0];
  smallMS = `${msToArr[1] || "0"}${msToArr[2] || "0"}`;
  return {
    time: `${padTo2Digits(h)}:${padTo2Digits(m)}:${padTo2Digits(s)}.${bigMS}`,
    smallMS,
  };
}

function pad3Digits(num) {
  return num.toString().padStart(3, "0");
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function startTimerNew() {
  millisecsInterval = setInterval(() => {
    millisecs++;
    setTimeInView(millisecs);
  });
}

function pauseTimer() {
  const log = logTime(millisecs, PAUSE);
  tableData.push(log);
  clearInterval(millisecsInterval);
  addTableRow();
}

function resetTimer() {
  millisecs = 0;
  setTimeInView(millisecs);
  tableData = [];
  splitTxt.innerHTML = "Split Time";
  emptyTable();
}

function split() {
  const log = logTime(millisecs, SPLIT);
  tableData.push(log);
  splitTxt.innerHTML = log[SPLIT];
  addTableRow();
}

function logTime(ms, type) {
  return {
    [type]: formatTime(ms),
  };
}

function setTimeInView(ms) {
  const { time, smallMS } = formatTimeSmallMS(ms);
  timeText.innerHTML = time;
  msTextSmall.innerHTML = smallMS;
}

function addTableRow() {
  let row = document.createElement("tr");
  let indexCell = document.createElement("td");
  indexCell.classList.add("table-data");
  row.appendChild(indexCell);
  indexCell.innerHTML = `#${tableData.length}`;
  for (const [key, value] of Object.entries(tableData[tableData.length - 1])) {
    let cell = document.createElement("td");
    let div = document.createElement("div");
    let keyText = document.createElement("p");
    let valText = document.createElement("p");
    keyText.classList.add("no-margin");
    valText.classList.add("no-margin");
    div.classList.add("cell-div");
    cell.classList.add("table-data");
    cell.appendChild(div);

    if (key === PAUSE) {
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

function emptyTable() {
  table.innerHTML = "";
}
