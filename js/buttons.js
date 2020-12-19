const wrapper = document.querySelector('.buttons__wrapper');

wrapper.addEventListener('click', toggleColor);

function toggleColor(event) {
    event.target.classList.toggle(event.target.name);
}