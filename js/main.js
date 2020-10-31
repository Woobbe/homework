

function showDropdownMenu(event) {
    document.querySelector("#myDropdown").classList.toggle("show");

    if (!event.target.matches('.dropbtn')) {

        let dropdowns = document.querySelector(".dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.querySelector('.dropbtn').onclick = showDropdownMenu(event);