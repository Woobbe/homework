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

    hideOnePromise = new Promise(function (resolve, reject) {
        startPromise(
            buttonOne,
            hideBlocksOneByOne.bind(null, 0),
            resolve)
    });

    hideAllPromise = new Promise(function (resolve, reject) {
        startPromise(
            buttonAll,
            hideBlocksAll,
            resolve)
    });

    setTimeout(setFullProgressBar, 0);
}

const startPromise = (button, func, resolve) => {
    button.addEventListener('click', () => {
        setZeroProgressBar();
        progressBar.addEventListener('transitionend', func, {once: true});
        resolve();
    });
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
        hideAllPromise
            .then(() => {
            imagesList[i].classList.add('promise-hide');
            return this;
        })
            .then(() => {
            imagesList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                titlesList[i].classList.add('promise-hide');
            }, {once: true});
            return this;
        })
            .then(() => {
            titlesList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                descriptionsList[i].classList.add('promise-hide');
            }, {once: true});
            return this;
        })
            .then(() => {
            descriptionsList[i].addEventListener('transitionend', () => {
                event.stopPropagation();
                blocksList[i].classList.add('promise-hide');
            }, {once: true});
            return this;
        })
            .then(() => {
            blocksList[i].addEventListener('transitionend', returnAllBlocks, {once: true});
        });
    }
}

function hideBlocksOneByOne(i) {
    hideOnePromise
        .then(() => {
        imagesList[i].classList.add('promise-hide');
        return this;
    })
        .then(() => {
        imagesList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            titlesList[i].classList.add('promise-hide');
        }, {once: true});
        return this;
    })
        .then(() => {
        titlesList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            descriptionsList[i].classList.add('promise-hide');
        }, {once: true});
        return this;
    })
        .then(() => {
        descriptionsList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            blocksList[i].classList.add('promise-hide');
        }, {once: true});
        return this;
    })
        .then(() => {
        blocksList[i].addEventListener('transitionend', () => {
            event.stopPropagation();
            hideBlocksOneByOne(++i);
        }, {once: true});
    })
        .catch(() => {
        returnAllBlocks();
    });
}

linkAsidePromise.addEventListener('click', initPromise);
