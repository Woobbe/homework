const linkAsidePromise = document.querySelector('.aside__link-promise');

const promiseContentWrapper = document.querySelector('.section-promise__wrapper-content');
const progressBar = document.querySelector('#promise__progress-bar');
const buttonOne = document.querySelector('#promise-one');
const buttonAll = document.querySelector('#promise-all');
const blocksList = promiseContentWrapper.getElementsByClassName('section-promise__wrapper-content__items');
const imagesList = promiseContentWrapper.getElementsByTagName('img');
const titlesList = promiseContentWrapper.getElementsByTagName('h1');
const descriptionsList = promiseContentWrapper.getElementsByTagName('p');

const setZeroProgressBar = () => {
    progressBar.classList.add('zero');
    progressBar.addEventListener('transitionend', activateButtons, {once: true});
};

const setFullProgressBar = () => {
    progressBar.classList.remove('zero');
    progressBar.addEventListener('transitionend', deactivateButtons, {once: true});
};

const activateButtons = () => {
    buttonOne.disabled = false;
    buttonAll.disabled = false;
    buttonOne.classList.remove('button-disabled');
    buttonAll.classList.remove('button-disabled');
};

const deactivateButtons = () => {
    buttonOne.disabled = true;
    buttonAll.disabled = true;
    buttonOne.classList.add('button-disabled');
    buttonAll.classList.add('button-disabled');
};

const returnAllBlocks = () => {
    for (let i = 0; i < blocksList.length; i++) {
        imagesList[i].classList.remove('promise-hide');
        titlesList[i].classList.remove('promise-hide');
        descriptionsList[i].classList.remove('promise-hide');
        blocksList[i].classList.remove('promise-hide');
    }
    setZeroProgressBar();
};

const hideAllPromise = new Promise(function(resolve, reject) {
    buttonAll.addEventListener('click', () => {
        deactivateButtons();
        setFullProgressBar();
        progressBar.addEventListener('transitionend', hideBlocksAll, {once: true});
    });
    resolve();
});


function hideBlocksAll() {
    for (let i = 0; i < blocksList.length; i++) {
        hideAllPromise.then(() => {
            imagesList[i].classList.add('promise-hide');
            return hideAllPromise;
        }).then(() => {
            imagesList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                titlesList[i].classList.add('promise-hide');
            }, {once: true});
            return hideAllPromise;
        }).then(() => {
            titlesList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                descriptionsList[i].classList.add('promise-hide');
            }, {once: true});
            return hideAllPromise;
        }).then(() => {
            descriptionsList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                blocksList[i].classList.add('promise-hide');
            }, {once: true});
            return hideAllPromise;
        }).then(() => {
            blocksList[i].addEventListener('transitionend', returnAllBlocks, {once: true});
        });
    }
}

const hideOnePromise = new Promise(function(resolve, reject) {
    buttonOne.addEventListener('click', () => {
        deactivateButtons();
        setFullProgressBar();
        progressBar.addEventListener('transitionend', hideBlocksOneByOne.bind(null, 0), {once: true});
    });
    resolve();
});

function hideBlocksOneByOne(i) {
    hideOnePromise.then(() => {
        imagesList[i].classList.add('promise-hide');
        return hideOnePromise;
    }).then(() => {
        imagesList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            titlesList[i].classList.add('promise-hide');
        }, {once: true});
        return hideOnePromise;
    }).then(() => {
        titlesList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            descriptionsList[i].classList.add('promise-hide');
        }, {once: true});
        return hideOnePromise;
    }).then(() => {
        descriptionsList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            blocksList[i].classList.add('promise-hide');
        }, {once: true});
        return hideOnePromise;
    }).then(() => {
        blocksList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            hideBlocksOneByOne(++i);
        }, {once: true});
    }).catch(() => {
        returnAllBlocks();
    });
}


linkAsidePromise.addEventListener('click', setZeroProgressBar);

