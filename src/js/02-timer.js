import flatpickr from "flatpickr";
import Notiflix from "notiflix";

import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const startBtn = document.querySelector('[data-start]');
        if (selectedDate < new Date()) {
            Notiflix.Report.failure('Wrong date', 'Please choose a date in the future', 'Change date');

            startBtn.disabled = true; 
        } else {
       startBtn.disabled = false;
       
startBtn.addEventListener('click', () => { startTimer(selectedDate); });
        };           
    },
  };
 

flatpickr("#datetime-picker", options);

const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minutesT = document.querySelector('[data-minutes]');
const secondsT = document.querySelector('[data-seconds]');

let intervalId;

function startTimer(date) {
   
intervalId = setInterval(() => {
    const time = date - Date.now();
        if (time <= 0) {
        clearInterval(intervalId);
        daysT.textContent = "00";
        hoursT.textContent = "00";
        minutesT.textContent = "00";
        secondsT.textContent = "00";
        }
        const { days, hours, minutes, seconds } = convertMs(time);
        daysT.textContent = addLeadingZero(days);
        hoursT.textContent = addLeadingZero(hours);
        minutesT.textContent = addLeadingZero(minutes);
        secondsT.textContent = addLeadingZero(seconds); 
    
}, 1000);
};


function addLeadingZero(value) {

return value.toString().padStart(2,'0');
};

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
      };
  