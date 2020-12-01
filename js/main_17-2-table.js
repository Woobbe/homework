const tableButton = document.querySelector('#table-button');
const linkShowTable = document.querySelector('.aside__link-table');
const sectionTable = document.querySelector('.main__section-table');

function createTable() {
    const table = document.createElement('table');
    const rows = document.querySelector('#rows').value;
    const columns = document.querySelector('#columns').value;
    const cells = '<td></td>'.repeat(columns);
    const rowsCollection = table.getElementsByTagName('tr');
    const oldTable = sectionTable.querySelector('table');

    if (oldTable !== null) {
        oldTable.remove();
    }

    table.className = 'generate-table';
    table.innerHTML = '<tr></tr>'.repeat(rows);

    for (let row of rowsCollection) {
        row.innerHTML = cells;
    }

    sectionTable.appendChild(table);
    cellsShowIndex(table);
}

function cellsShowIndex(table) {

    // cellsArray.forEach(cell => cell.onclick = getCellIndex.bind(cellsArray, cellsArray));
    table.addEventListener('click', getCellIndex);
}

function getCellIndex(event) {
    const cellsArray = Array.from(sectionTable.getElementsByTagName('td'));
    let rowIndex = 1;
    let columnIndex = 1;
    let currentColumn = event.target;
    let currentRow = event.target.parentElement;

    cellsArray.forEach( td => {
        if (td.style.backgroundColor = 'red') {
            td.style.backgroundColor = null;
        }
    })

    if (event.target.tagName == 'TD') {
        event.target.style.backgroundColor = 'red';
    }

    while (currentRow.previousElementSibling != null) {
        currentRow = currentRow.previousElementSibling;
        rowIndex++;
    }

    while (currentColumn.previousElementSibling != null) {
        currentColumn = currentColumn.previousElementSibling;
        columnIndex++;
    }

    createIndexTitle(rowIndex, columnIndex);
}

function createIndexTitle(rowIndex, columnIndex) {
    let title = document.createElement('h4');
    let oldTitle = sectionTable.querySelector('h4');

    if (oldTitle !== null) oldTitle.remove();

    title.textContent = `Вы выбрали ячейку в ${rowIndex} строке и ${columnIndex} столбце`;
    sectionTable.querySelector('table').before(title);
}

function showTableGenerator() {
    document.querySelector('.main__wrapper').classList.toggle('hide');
    document.querySelector('.main__section-table').classList.toggle('hide');
}

tableButton.onclick = createTable;
linkShowTable.onclick = showTableGenerator;
