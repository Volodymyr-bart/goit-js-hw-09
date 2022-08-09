const refs = {
  bodyBg: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalID = null;
let colorBg = null;

function onClickStart() {
  intervalID = setInterval(changeColor, 1000);
  refs.startBtn.setAttribute(`disabled`, true);
  refs.stopBtn.removeAttribute(`disabled`);
}

function onClickStop() {
  clearTimeout(intervalID);
  refs.stopBtn.setAttribute(`disabled`, true);
  refs.startBtn.removeAttribute(`disabled`);
}

function changeColor() {
  colorBg = getRandomHexColor();
  refs.bodyBg.style.backgroundColor = `${colorBg}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);
