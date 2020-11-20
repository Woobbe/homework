const timerFooter = document.querySelector('#footer__timer');
var indexInterval;

function createTimer(selectorInsert, separator) {
    const timerWrapper = document.querySelector(selectorInsert);
    const timerHours = document.createElement('span');
    const timerMinutes = document.createElement('span');
    const timerSeconds = document.createElement('span');

    timerHours.className = 'timer-hours';
    timerMinutes.className = 'timer-minutes';
    timerSeconds.className = 'timer-seconds';

    timerWrapper.prepend(timerHours);
    timerHours.after(timerMinutes);
    timerMinutes.after(timerSeconds);

    timerSeconds.before(separator);
    timerMinutes.before(separator);

    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';

    startTimer(timerHours, timerMinutes, timerSeconds);
}

function startTimer(timerHours, timerMinutes, timerSeconds) {
    if (!(timerHours && timerMinutes && timerSeconds)) {
        timerHours = document.querySelector('.timer-hours');
        timerMinutes = document.querySelector('.timer-minutes');
        timerSeconds = document.querySelector('.timer-seconds');
    }

    indexInterval = setInterval(timer, 1000, timerHours, timerMinutes, timerSeconds);
}

function timer(timerHours, timerMinutes, timerSeconds) {
    let hoursValue = timerHours.textContent;
    let minutesValue = timerMinutes.textContent;
    let secondsValue = timerSeconds.textContent;

    secondsValue++;

    if (secondsValue == 60) {
        secondsValue = 0;
        timerMinutes.textContent = plusZerro(++minutesValue);
    }

    if (minutesValue == 60) {
        timerMinutes.textContent = '00';
        timerHours.textContent = plusZerro(++hoursValue);
    }

    timerSeconds.textContent = plusZerro(secondsValue);
}

document.addEventListener('DOMContentLoaded', createTimer.bind(null, '#footer__timer', ':'));

timerFooter.addEventListener('mouseover', stopTimer);
timerFooter.addEventListener('mouseout', startTimer);

function stopTimer() {
    clearInterval(indexInterval);
}
