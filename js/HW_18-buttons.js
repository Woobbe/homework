const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('click', toggleColor);

function toggleColor(event) {
    event.target.classList.toggle(event.target.name);
}