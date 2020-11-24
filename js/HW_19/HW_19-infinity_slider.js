let step = 0;

function getSlidesList(classSlides) {
    const slides = document.querySelectorAll(`.${classSlides}`);
    const sliderList = [];

    for (let i = 0; i < slides.length; i++) {
        sliderList[i] = slides[i].src;
        slides[i].remove();
    }

    return sliderList;
}


function showSlide(sliderList, flow = 'left', classSlides, offset = 0) {
    // if (flow === 'left') {
    //     step++;
    // } else {
    //     step--;
    // }

    console.log(sliderList)

    const slide = document.createElement('img');
    slide.classList.add(classSlides);
    slide.src = sliderList[step];
    slide.style.flow = offset * 636 + 'px';
    document.querySelector('.slider-container').append(slide);

    (step === sliderList.length - 1)
        ? step = 0
        : step++;

    offset = 1;

    const slide2 = document.createElement('img');
    slide2.classList.add(classSlides);
    slide2.src = sliderList[step];
    slide2.style.flow = offset * 636 + 'px';
}

function moveLeft (offset = 0) {
    const currentSliderList = document.querySelectorAll('.slider__item');
    const containerWidth = document.querySelector('.slider-container').style.width;

    for (let i = 0; i < currentSliderList; i++) {
        currentSliderList[i].style.left = offset * containerWidth - containerWidth + 'px';
        offset++;
        console.log(currentSliderList[i].style.width)
    }
    console.log(currentSliderList)
}

showSlide(getSlidesList('slider__item'), 'left', 'slider__item');


document.addEventListener('click', moveLeft);







//
// function showInfinitySlider() {
//     document.querySelector('.main__wrapper').classList.toggle('hide');
//
// }
// const slides = document.querySelectorAll('.slider__item');
// let slider = [];
// for (let i = 0; i < slides.length; i++) {
//     slider[i] = slides[i].src;
//     slides[i].remove();
// }
//
// console.log(slides);
// console.log(slider);
//
// let step = 0;
// var offset = 0;
//
// function draw() {
//
//     let img = document.createElement('img');
//     img.src = slider[step];
//     img.classList.add('slider__item');
//     img.style.left = offset * 636 + 'px';
//     document.querySelector('.slider-container').append(img);
//
//     (step === slider.length - 1)
//         ? step = 0
//         : step++;
//
//     offset = 1;
// }
//
// function left() {
//     document.onclick = null;
//     let slides2 = document.querySelectorAll('.slider__item');
//     let offset2 = 0;
//     for (let i = 0; i < slides2.length; i++) {
//         slides2[i].style.left = offset2 * 636 - 636 + 'px';
//         offset2++;
//     }
//     slides2[0].addEventListener('transitionend', function() {
//         slides2[0].remove();
//         draw();
//         document.onclick = left;
//     }, {once:true});
// }
//
//
//
//
// draw();
// // draw();
//
// setInterval(left, 1000)
//
// document.onclick = left;
