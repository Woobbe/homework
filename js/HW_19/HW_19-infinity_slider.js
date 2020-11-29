const sliderBtnAside = document.querySelector('.aside__link-slider');
const defaults = {
    index: 0,
    interval: 2000,
    selectorWrapper: '.slider-container',
    offset: 0
};

function startSlider() {
    const sliderWrapper = document.querySelector(defaults.selectorWrapper);
    const sliderWrapperWidth = sliderWrapper.offsetWidth;
    const slidesList = getSlidesList(sliderWrapper);
    let offset = 0;

    createSlide(sliderWrapper, sliderWrapperWidth, slidesList, offset);
    offset = 1;
    createSlide(sliderWrapper, sliderWrapperWidth, slidesList, offset);

    setInterval(moveSliderLeft, defaults.interval, sliderWrapper, sliderWrapperWidth, slidesList, offset);
    sliderBtnAside.removeEventListener('click', startSlider);
}

function getSlidesList(sliderWrapper) {
    const slides = sliderWrapper.querySelectorAll('img');
    const slidesList = [];

    for (let i = 0; i < slides.length; i++) {
        slidesList[i] = slides[i].src;
        slides[i].remove();
    }
    return slidesList;
}

function createSlide(sliderWrapper, sliderWrapperWidth, slidesList, offset) {
    const slide = document.createElement('img');
    slide.className = 'slider__item';
    slide.src = slidesList[defaults.index];
    slide.style.left = offset * sliderWrapperWidth + 'px';
    sliderWrapper.append(slide);

    defaults.index + 1 === slidesList.length
        ? defaults.index = 0
        : ++defaults.index;
}

function moveSliderLeft(sliderWrapper, sliderWrapperWidth, slidesList, offset) {
    const currentSlides = sliderWrapper.querySelectorAll('img');

    currentSlides[0].style.left = -sliderWrapperWidth + 'px';
    // Принудительно вызываем reflow!!!
    currentSlides[1].offsetHeight;
    currentSlides[1].style.left = '0px';

    currentSlides[0].addEventListener('transitionend', () => {
        currentSlides[0].remove();
        createSlide(sliderWrapper, sliderWrapperWidth, slidesList, offset);
    }, {once: true});
}

sliderBtnAside.addEventListener('click', showSlider)
sliderBtnAside.addEventListener('click', startSlider);

