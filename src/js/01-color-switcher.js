const refs = {
  bodyBg: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalID;
// = setInterval(onClickStart, 1000)
function onClickStart() {
  let colorBg = getRandomHexColor();
  refs.bodyBg.style.backgroundColor = `${colorBg}`;
}

function onClickStop() {
  clearTimeout(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);
