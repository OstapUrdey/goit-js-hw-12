import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const datetimePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('button[data-start]');
  const daysSpan = document.querySelector('[data-days]');
  const hoursSpan = document.querySelector('[data-hours]');
  const minutesSpan = document.querySelector('[data-minutes]');
  const secondsSpan = document.querySelector('[data-seconds]');

  let timerInterval;
  let userSelectedDate;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= new Date()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  };

  flatpickr(datetimePicker, options);

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    datetimePicker.disabled = true;
    
    timerInterval = setInterval(() => {
      const now = new Date();
      const remainingTime = userSelectedDate - now;

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        datetimePicker.disabled = false;
        updateTimer(0);
        iziToast.success({
          title: 'Completed',
          message: 'Countdown finished',
        });
        return;
      }

      updateTimer(remainingTime);
    }, 1000);
  });

  function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
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

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
});
