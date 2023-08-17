// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const values = document.querySelectorAll('.value');
const inputTimer = document.querySelector('#datetime-picker');
const fieldTimer = document.querySelector('.timer');
btnStart.disabled = true;

let intervalId = null;

btnStart.addEventListener('click', startTimer);

const flat = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates);
  },
});

function checkDate(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    btnStart.disabled = 'true';
    Notiflix.Notify.failure('Please choose a date in the future');
    return false;
  }
  btnStart.disabled = false;
  return true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  fieldTimer.style.color = '#000000';
  if (checkDate(flat.selectedDates)) {
    inputTimer.disabled = true;
    btnStart.disabled = true;
    intervalId = setInterval(() => {
      if (flat.selectedDates[0] - new Date() <= 0) {
        inputTimer.disabled = false;
        clearInterval(intervalId);
        return;
      }
      let currTimer = convertMs(flat.selectedDates[0] - new Date());
      values[0].textContent = addLeadingZero(currTimer.days);
      values[1].textContent = addLeadingZero(currTimer.hours);
      values[2].textContent = addLeadingZero(currTimer.minutes);
      values[3].textContent = addLeadingZero(currTimer.seconds);
      if (flat.selectedDates[0] - new Date() <= 30000) {
        fieldTimer.style.color = '#bb0000';
      }
    }, 1000);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
