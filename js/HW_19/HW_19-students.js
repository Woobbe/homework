function showStudents() {
    document.querySelector('.main__wrapper').classList.add('hide');
    document.querySelector('.main__section-table').classList.add('hide');
    document.querySelector('.main__section-slider').classList.add('hide');
    document.querySelector('.main__section-students').classList.remove('hide');
}

const buttonShowStudents = document.querySelector('.aside__link-students');

buttonShowStudents.addEventListener('click', showStudents);