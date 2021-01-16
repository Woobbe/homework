let promiseContentWrapper;
let progressBar;
let buttonOne;
let buttonAll;
let hideOnePromise;
let hideAllPromise;
let blocksList;
let imagesList;
let titlesList;
let descriptionsList;

function initPromise() {
    promiseContentWrapper = document.querySelector('.section-promise__wrapper-content');
    progressBar = document.querySelector('#promise__progress-bar');
    buttonOne = document.querySelector('#promise-one');
    buttonAll = document.querySelector('#promise-all');
    blocksList = promiseContentWrapper.getElementsByClassName('section-promise__wrapper-content__items');
    imagesList = promiseContentWrapper.getElementsByTagName('img');
    titlesList = promiseContentWrapper.getElementsByTagName('h1');
    descriptionsList = promiseContentWrapper.getElementsByTagName('p');

    hideOnePromise = new Promise(function(resolve, reject) {
        buttonOne.addEventListener('click', () => {
            setZeroProgressBar();
            progressBar.addEventListener('transitionend', hideBlocksOneByOne.bind(null, 0), {once: true});
            resolve();
        });
    });

    hideAllPromise = new Promise(function(resolve, reject) {
        buttonAll.addEventListener('click', () => {
            setZeroProgressBar();
            progressBar.addEventListener('transitionend', hideBlocksAll, {once: true});
            resolve();
        });
    });

    setTimeout(setFullProgressBar, 0);
}

const setFullProgressBar = () => {
    progressBar.classList.add('full');
    progressBar.addEventListener('transitionend', activateButtons, {once: true});
};

const setZeroProgressBar = () => {
    progressBar.classList.remove('full');
    progressBar.addEventListener('transitionend', deactivateButtons, {once: true});
};

const activateButtons = () => {
    setDisabledButton(buttonOne, false);
    setDisabledButton(buttonAll, false);
};

const deactivateButtons = () => {
    setDisabledButton(buttonOne, true);
    setDisabledButton(buttonAll, true);
};

const setDisabledButton = (button, disabled) => {
    button.disabled = disabled;
    button.classList.toggle('button-disabled');
}

const returnAllBlocks = () => {
    for (let i = 0; i < blocksList.length; i++) {
        imagesList[i].classList.remove('promise-hide');
        titlesList[i].classList.remove('promise-hide');
        descriptionsList[i].classList.remove('promise-hide');
        blocksList[i].classList.remove('promise-hide');
    }
    setFullProgressBar();
};

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

linkAsidePromise.addEventListener('click', initPromise);
