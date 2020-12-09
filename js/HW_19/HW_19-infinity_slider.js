const sliderBtnAside = document.querySelector('.aside__link-slider');

class Slider {
    constructor() {
        this.index = 0;
        this.interval = 500;
        this.selectorWrapper = '.slider-container';
        this.offset = 0;
        this.sliderWrapper = document.querySelector(this.selectorWrapper);
        // TODO: offsetWidth возвращает 0!!!
        this.sliderWrapperWidth = this.sliderWrapper.offsetWidth;
        this.slidesList = this.getSlidesList(this.sliderWrapper);
    }

    startSlider() {
        console.log(this);
        this.createSlide();
        this.offset = 1;
        this.createSlide();

        setInterval(this.moveSliderLeft.bind(infinitySlider), this.interval);
    }

    getSlidesList() {
        const slides = this.sliderWrapper.querySelectorAll('img');
        const slidesList = [];

        for (let i = 0; i < slides.length; i++) {
            slidesList[i] = slides[i].src;
            slides[i].remove();
        }
        return slidesList;
    }

    createSlide() {
        const slide = document.createElement('img');
        slide.className = 'slider__item';
        slide.src = this.slidesList[this.index];
        slide.style.left = this.offset * this.sliderWrapperWidth + 'px';
        this.sliderWrapper.append(slide);

        this.index + 1 === this.slidesList.length
            ? this.index = 0
            : ++this.index;
    }

    moveSliderLeft() {
        const currentSlides = this.sliderWrapper.querySelectorAll('img');

        currentSlides[0].style.left = -this.sliderWrapperWidth + 'px';
        // Принудительно вызываем reflow!!!
        currentSlides[1].offsetHeight;
        currentSlides[1].style.left = '0px';

        currentSlides[0].addEventListener('transitionend', () => {
            currentSlides[0].remove();
            this.createSlide.call(infinitySlider);
        }, {once: true});
    }
}

const infinitySlider = new Slider();




sliderBtnAside.addEventListener('click', showSlider);
sliderBtnAside.addEventListener('click', infinitySlider.startSlider.bind(infinitySlider), {once: true});

