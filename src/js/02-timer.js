import flatpickr from "flatpickr";
import { Notify } from "notiflix";

const startBtnEl = document.querySelector("button[data-start]");
const dataDaysEl = document.querySelector("span[data-days]");
const dataHoursEl = document.querySelector("span[data-hours]");
const dataMinEl = document.querySelector("span[data-minutes]");
const dataSecEl = document.querySelector("span[data-seconds]");

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
            Notify.failure('Please choose a date in the future');

        } else {
            startBtnEl.disabled = false;
            startBtnEl.addEventListener('click', onSetTimer);
        }

    },
};

const timer = flatpickr("#datetime-picker", options);

function onSetTimer() {
    const selectedDate = timer.selectedDates[0];
    startBtnEl.disabled = true;
    const countdown = setInterval(() => {
        const currentData = new Date();
        if (selectedDate - currentData <= 0) {
            clearInterval(countdown);
            return;
        }
        let result = convertMs(selectedDate - currentData);
        dataDaysEl.textContent = addLeadingZero(result.days);
        dataHoursEl.textContent = addLeadingZero(result.hours);
        dataMinEl.textContent = addLeadingZero(result.minutes);
        dataSecEl.textContent = addLeadingZero(result.seconds);
    }, 1000);
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


