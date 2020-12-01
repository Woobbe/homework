const linkShowStartPage = document.querySelector('.aside__link-start');
function showDropdownMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function hideAside() {
    document.querySelector('.aside').classList.toggle('aside-hide');
    document.querySelector('.page__state').classList.toggle('page__state-all_width');
    document.querySelector('.aside__content').classList.toggle('aside__content-hide');
    document.querySelector('.hamburger-menu').classList.toggle('hamburger-menu-left');
    document.querySelector('.footer').classList.toggle('footer-all-width');
}

function showSlider() {
    document.querySelector('.main__wrapper').classList.add('hide');
    document.querySelector('.main__section-table').classList.add('hide');
    document.querySelector('.main__section-students').classList.add('hide');
    document.querySelector('.main__section-slider').classList.remove('hide');
}

function showStartPage() {
    document.querySelector('.main__wrapper').classList.remove('hide');
    document.querySelector('.main__section-table').classList.add('hide');
    document.querySelector('.main__section-students').classList.add('hide');
    document.querySelector('.main__section-slider').classList.add('hide');
}

linkShowStartPage.addEventListener('click', showStartPage);