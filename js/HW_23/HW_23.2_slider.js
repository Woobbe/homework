class Slider {
    constructor(sliderSelector, transition) {
        this.sliderWrapper = document.querySelector('.slider-container');
        // this.sliderWrapper = document.querySelector(sliderSelector);
        this.btnPrev = document.querySelector('#slider__button-prev');
        this.btnNext = document.querySelector('#slider__button-next');
        this.interval = 3000;
        this.slidesList = document.getElementsByClassName('slider__item');
        this.index = 1;
        this.firstSlideClone = this.slidesList[0].cloneNode(true);
        this.lastSlideClone = this.slidesList[this.slidesList.length - 1].cloneNode(true);
        this.firstSlideClone.id = 'first-clone';
        this.lastSlideClone.id = 'last-clone';
        this.sliderWrapperWidth = this.slidesWrapper.offsetWidth;
        this.defaultTransition = transition;

        console.log(this.sliderWrapperWidth);

        this.slidesWrapper.prepend(this.lastSlideClone);
        this.slidesWrapper.append(this.firstSlideClone);
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWrapperWidth * this.index}px)`;
    }

    startSlider() {
        this.sliderIntervalId = setInterval(this.moveToNextSlide.bind(newSlider), this.interval);
    }

    checkSlideIndex() {
        if (this.slidesList[this.index].id === this.firstSlideClone.id) {
            this.slidesWrapper.style.transition = 'none';
            this.index = 0;
            this.slidesWrapper.style.transform = `translateX(${-this.sliderWrapperWidth * this.index})px`;
            // return;
            console.log(1);
        }

        if (this.slidesList[this.index].id === this.lastSlideClone.id) {
            this.slidesWrapper.style.transition = 'none';
            this.index = this.slidesList.length - 2;
            this.slidesWrapper.style.transform = `translateX(${-this.sliderWrapperWidth * this.index})px`;
            console.log(2);
        }
    };

    moveToNextSlide() {
        if (this.index >= this.slidesList.length - 1) return;

        this.index++;
        this.slidesWrapper.style.transition = this.defaultTransition;
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWrapperWidth * this.index}px)`;
        console.log(`Index: ${this.index}`);
        console.log(`sliderWrapperWidth: ${this.sliderWrapperWidth}`);
    };

    moveToPreviousSlide() {
        if (this.index <= 0) return;
        this.index--;
        this.slidesWrapper.style.transition = this.defaultTransition;
        this.slidesWrapper.style.transform = `translateX(${-this.sliderWrapperWidth * this.index}px)`;
    }

}

const newSlider = new Slider('.slider-container', '.7s ease-out');


// newSlider.sliderWrapper.addEventListener('mouseleave', newSlider.startSlider.bind(newSlider));
newSlider.btnNext.addEventListener('click', newSlider.moveToNextSlide.bind(newSlider));
newSlider.btnPrev.addEventListener('click', newSlider.moveToPreviousSlide.bind(newSlider));
newSlider.slidesWrapper.addEventListener('transitionend', newSlider.checkSlideIndex.bind(newSlider));

newSlider.startSlider();


// const startSlide = () => {
//     slideId = setInterval(() => {
//         moveToNextSlide();
//     }, interval);
// };
//
// const getSlides = () => document.querySelectorAll('.slide');
//
// // TODO: !! Add enebtListener
// sliderWrapper.addEventListener('transitionend', () => {
//     slidesList = getSlides();
//     if (slidesList[index].id === firstClone.id) {
//         sliderWrapper.style.transition = 'none';
//         index = 1;
//         sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
//     }
//
//     if (slidesList[index].id === lastClone.id) {
//         sliderWrapper.style.transition = 'none';
//         index = slidesList.length - 2;
//         sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
//     }
// });
//
// const moveToNextSlide = () => {
//     slidesList = getSlides();
//     if (index >= slidesList.length - 1) return;
//     index++;
//     sliderWrapper.style.transition = '.7s ease-out';
//     sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
// };
//
// const moveToPreviousSlide = () => {
//     if (index <= 0) return;
//     index--;
//     sliderWrapper.style.transition = '.7s ease-out';
//     sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
// };
//
// sliderWrapper.addEventListener('mouseenter', () => {
//     clearInterval(slideId);
// });
//
// sliderWrapper.addEventListener('mouseleave', startSlide);
// nextBtn.addEventListener('click', moveToNextSlide);
// prevBtn.addEventListener('click', moveToPreviousSlide);
//
// startSlide();


// const sliderWrapper = document.querySelector('.container');
// const sliderWrapper = document.querySelector('.slides');
// const nextBtn = document.getElementById('next-btn');
// const prevBtn = document.getElementById('prev-btn');
// const interval = 3000;
//
// let slidesList = document.querySelectorAll('.slide');
// let index = 1;
// let slideId;
//
// const firstClone = slidesList[0].cloneNode(true);
// const lastClone = slidesList[slidesList.length - 1].cloneNode(true);
//
// firstClone.id = 'first-clone';
// lastClone.id = 'last-clone';
//
// sliderWrapper.append(firstClone);
// sliderWrapper.prepend(lastClone);
//
// const slideWidth = slidesList[index].clientWidth;
//
// sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
//
// console.log(slidesList);
