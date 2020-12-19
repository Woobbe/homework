function getCurrentTime() {
    let currentData = new Date();
    let currentHours = currentData.getHours();
    let currentMinutes = currentData.getMinutes();
    let currentSeconds = currentData.getSeconds();

    [currentHours, currentMinutes, currentSeconds] = plusZerro(currentHours, currentMinutes, currentSeconds);

    return [currentHours, currentMinutes, currentSeconds];
}


function showCurrentTime(selectorTimeWrapper, separator) {
    const spanWrapperTime = document.querySelector(selectorTimeWrapper);
    const spanSeconds = spanWrapperTime.lastElementChild;
    const spanMinutes = spanSeconds.previousElementSibling;
    const spanHours = spanMinutes.previousElementSibling;
    let [currentHours, currentMinutes, currentSeconds] = getCurrentTime();

    spanHours.after(separator);
    spanMinutes.after(separator);
    spanSeconds.textContent = currentSeconds;
    spanMinutes.textContent = currentMinutes;
    spanHours.textContent = currentHours;

    setInterval(insertCurrentTime, 1000, spanHours, spanMinutes, spanSeconds);
}

function insertCurrentTime(spanHours, spanMinutes, spanSeconds) {
    let [currentHours, currentMinutes, currentSeconds] = getCurrentTime();

    spanSeconds.textContent = currentSeconds;

    if (currentSeconds == '00') spanMinutes.textContent = currentMinutes;

    if (currentMinutes == '00' && currentSeconds == '00') {
        spanHours.textContent = currentHours;
    }
}

showCurrentTime('.header__current-time', ':');
