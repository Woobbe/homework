class Slider {
    constructor(options) {
        this.sliderWrapper = document.querySelector(options.sliderSelector);
        this.slidesWrapper = this.sliderWrapper.querySelector('div');
        this.slidesList = this.sliderWrapper.getElementsByClassName(options.slidesClassName);
        this.buttonNext = this.sliderWrapper.querySelector('#next-btn');
        this.buttonPrev = this.sliderWrapper.querySelector('#prev-btn');
        this.sliderWidth = this.slidesWrapper.offsetWidth;
        this.firstClone = this.slidesList[0].cloneNode(true);
        this.lastClone = this.slidesList[this.slidesList.length - 1].cloneNode(true);
        this.firstClone.id = 'first-clone';
        this.lastClone.id = 'last-clone';
        this.index = 1;
        this.interval = options.interval;
        this.sliderTransition = options.sliderTransition;
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWidth * this.index}px)`;
        this.dotsWrapperSelector = options.dotsWrapperSelector;
        this.mouse = options.mouseStop && this.eventMouseStop();
        this.arrow = options.arrows && this.activeButtons();
        this.dots = options.dots && this.createDots();
        this.title = options.title && this.eventMouseTitle();

        this.slidesWrapper.append(this.firstClone);
        this.slidesWrapper.prepend(this.lastClone);
    }

    startSlide = () => {
        this.slideId = setInterval(this.moveToNextSlide, this.interval);
        this.slidesWrapper.addEventListener('transitionend', this.changeIndex);
    };

    stopSlide = () => {
        clearInterval(this.slideId);
    };

    moveToNextSlide = () => {
        if (this.index >= this.slidesList.length - 1) return;

        this.index++;
        this.changeSlide();
    };

    moveToPreviousSlide = () => {
        if (this.index < 1) return;

        this.index--;
        this.changeSlide();
    };

    changeIndex = () => {
        if (this.slidesList[this.index].id === this.lastClone.id) {
            this.index = this.slidesList.length - 2;
            this.resetSlide();
            return;
        }

        if (this.slidesList[this.index].id === this.firstClone.id) {
            this.index = 1;
            this.resetSlide();
        }
    };

    changeSlide = () => {
        this.slidesWrapper.style.transition = this.sliderTransition;
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWidth * this.index}px)`;
    };

    resetSlide = () => {
        this.slidesWrapper.style.transition = 'none';
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWidth * this.index}px)`;
    };

    changeDot = () => {
        let currentIndex = this.index - 1;
        this.dotsList.forEach(dot => {
            dot.classList.remove('active-dot');
        });

        if (currentIndex === this.dotsList.length) {
            currentIndex = 0;
        }
        if (currentIndex === -1) {
            currentIndex = this.dotsList.length - 1;
        }

        this.dotsList[currentIndex].classList.add('active-dot');
    };

    createDots = () => {
        this.dotsList = [];
        this.dotsWrapper = document.createElement('div');
        this.dotsWrapper.className = this.dotsWrapperSelector;

        for (let i = 0; i < this.slidesList.length; i++) {
            let dot = document.createElement('div');
            dot.classList.add('slider__dot');
            this.dotsWrapper.append(dot);
            this.dotsList.push(dot);
        }

        this.sliderWrapper.append(this.dotsWrapper);

        this.slidesWrapper.addEventListener('transitionstart', this.changeDot);

        this.dotsList.forEach((dot, indexDot) => {
            dot.addEventListener('click', () => {
                let currentDot = indexDot;
                this.index = ++currentDot;
                this.changeSlide();
            });
        });
    };

    createTitle = (event) => {
        event.target.removeEventListener('mouseenter', this.createTitle);
        const titleBlock = document.createElement('p');
        titleBlock.textContent = event.target.dataset.title;
        event.target.append(titleBlock);
    };

    eventMouseStop = () => {
        this.sliderWrapper.addEventListener('mouseenter', this.stopSlide);
        this.sliderWrapper.addEventListener('mouseleave', this.startSlide);
    };

    eventMouseTitle = () => {
        Array.from(this.slidesList).forEach(slide => {
            slide.addEventListener('mouseenter', this.createTitle);
        });
    };

    activeButtons = () => {
        this.buttonNext.addEventListener('click', this.moveToNextSlide);
        this.buttonPrev.addEventListener('click', this.moveToPreviousSlide);
    };

}


const sliderArrowsStop = new Slider({
    sliderSelector: '.slider__wrapper-arrows-stop',
    slidesClassName: 'slide',
    interval: 2000,
    sliderTransition: '.9s ease-out',
    mouseStop: true,
    arrows: true
});

const sliderDotsTitle = new Slider({
    sliderSelector: '.slider__wrapper-second-dots-title',
    slidesClassName: 'slide',
    dotsWrapperSelector: 'slider__wrapper-dots',
    interval: 6000,
    sliderTransition: '.9s ease-out',
    dots: true,
    title: true
});


sliderArrowsStop.startSlide.call(sliderArrowsStop);
sliderDotsTitle.startSlide.call(sliderDotsTitle);


// Оказывается, если писать через стрелочные функции, то не нужно на каждом шагу использовать bind()