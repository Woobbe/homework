class Time {

    constructor() {
        this.currentTime = new Date();
        this.currentSeconds = this.currentTime.getSeconds();
        this.currentMinutes = this.currentTime.getMinutes();
        this.currentHours = this.currentTime.getHours();
    }

    showTime(headerTimeSelector) {
        this.spanWrapperTime = document.querySelector(headerTimeSelector);
        this.spanSeconds = this.spanWrapperTime.lastElementChild;
        this.spanMinutes = this.spanSeconds.previousElementSibling;
        this.spanHours = this.spanMinutes.previousElementSibling;

        this.spanSeconds.textContent = this.currentSeconds;
        this.spanMinutes.textContent = this.currentMinutes;
        this.spanHours.textContent = this.currentHours;

    }

}

function currentDate2() {
    let headerCurrentTime = new Time();
    headerCurrentTime.showTime('.header__current-time');
}

setInterval(currentDate2, 1000);