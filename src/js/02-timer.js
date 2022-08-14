import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.getElementById(`datetime-picker`),
  startBtn: document.querySelector('[data-start]'),
  dDays: document.querySelector('[data-days]'),
  dHours: document.querySelector('[data-hours]'),
  dMinutes: document.querySelector('[data-minutes]'),
  dSeconds: document.querySelector('[data-seconds]'),
};
// let currentTime = null;
let userTime = null;
refs.startBtn.disabled = true;
// let deltaTime = null;

class Timer {
  constructor({ onTick }) {
    this.intervalID = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    // clearInterval(this.intervalID);

    this.intervalID = setInterval(() => {
      let currentTime = Date.now();
      console.log(userTime);
      console.log(currentTime);
      if (!userTime) {
        let deltaTime = this.convertMs(userTime - currentTime);
        this.onTick(deltaTime);
      }
    }, 1000);
  }
  // stop() {
  //   clearInterval(this.intervalID);
  // }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = Date.now();
    if (currentTime > selectedDates[0]) {
      alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
    if (selectedDates < 0) {
      return;
    }
    userTime = selectedDates[0];
    refs.startBtn.disabled = false;
    // deltaTime = convertMs(selectedDates[0] - currentTime);
  },
};
const updateClockFace = time => {
  const { days, hours, minutes, seconds } = time;
  refs.dDays.textContent = `${days}`;
  refs.dHours.textContent = `${hours}`;
  refs.dMinutes.textContent = `${minutes}`;
  refs.dSeconds.textContent = `${seconds}`;
};

const libFp = flatpickr('#datetime-picker', options);

const timer = new Timer({ onTick: updateClockFace });

refs.startBtn.addEventListener('click', timer.start());

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}
