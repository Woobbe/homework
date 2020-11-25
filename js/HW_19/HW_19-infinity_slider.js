const buttonShowSlider = document.querySelector('.aside__link-slider');
const buttonPrev = document.getElementById('btn-prev');
const buttonNext = document.getElementById('btn-next');
const slidesCollection = document.querySelectorAll('.slide');
const dots = createDot('.dots-wrapper');

let index = 0;

function createDot(wrapperSelector) {
    let wrapper = document.querySelector(wrapperSelector);
    let dots = [];

    for(let i = 0; i < slidesCollection.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        wrapper.append(dot);
        dots.push(dot);
    }
    return dots;
}

function activeSlide(index) {
    for (let i = 0; i < slidesCollection.length; i++) {
        slidesCollection[i].classList.remove('active');
        dots[i].classList.remove('active');
    }

    slidesCollection[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    if (index === slidesCollection.length - 1) {
        index = 0;
        activeSlide(index);
    } else {
        index++;
        activeSlide(index);
    }
}

function prevSlide() {
    if (index === 0) {
        index = slidesCollection.length - 1;
        activeSlide(index);
    } else {
        index--;
        activeSlide(index);
    }
}

dots.forEach((dot, indexDot) => {
    dot.addEventListener('click', () => {
        index = indexDot;
        activeSlide(index);
    });
});

function showSlider() {
   document.querySelector('.main__wrapper').classList.add('hide');
   document.querySelector('.main__section-table').classList.add('hide');
   document.querySelector('.main__section-students').classList.add('hide');
   document.querySelector('.main__section-slider').classList.remove('hide');
}

buttonNext.addEventListener('click', nextSlide);
buttonPrev.addEventListener('click', prevSlide);

buttonShowSlider.addEventListener('click', showSlider);

const interval = setInterval(nextSlide, 2000);

