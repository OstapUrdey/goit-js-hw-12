import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.getElementById("datetime-picker");
const startButtom = document.querySelector("buttom[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-minutes]");

let timerInterval;
let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if(userSelectedDate <= new Date()) {
iziToast.error({
    title: "Error",
    message: "Please choose a date in the future",
});
startButtom.disabled = true;}
else {
    startButtom.disabled = false;
   }
  }
};

flatpickr(dateTimePicker);

startButtom.addEventListener("click", () => {
    startButtom.disabled = true;
    dateTimePicker.disabled = true;

    timerInterval = setInterval(() => {
        const now = new Date;
        const remainingTime = userSelectedDate - now;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            dateTimePicker = false;
            updateTimer(0);
            iziToast.success({
                title: "Completed",
                message: "Countdown finished",
            });
            return;
        }
        updateTimer(remainingTime);
    }, 1000)
});

