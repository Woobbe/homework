let tableButton = document.querySelector('#table-button');
let sectionTable = document.querySelector('.main__section-table');

function createTable() {
    let table = document.createElement('table');
    let rows = document.querySelector('#rows').value;
    let columns = document.querySelector('#columns').value;
    let cells = '<td></td>'.repeat(columns);
    let rowsCollection = table.getElementsByTagName('tr');
    let oldTable = sectionTable.querySelector('table');

    if (oldTable !== null) oldTable.remove();

    table.className = 'generate-table';
    table.innerHTML = '<tr></tr>'.repeat(rows);

    for (let row of rowsCollection) {
        row.innerHTML = cells;
    }

    sectionTable.appendChild(table);
    cellsShowIndex();
}

function cellsShowIndex() {
    let cellsCollection = sectionTable.getElementsByTagName('td');
    let cellsArray = Array.from(cellsCollection);
    cellsArray.forEach(cell => cell.onclick = getCellIndex);
}

function getCellIndex() {
    let rowIndex = 1;
    let columnIndex = 1;
    let currentColumn = this;
    let currentRow = this.parentElement;
    this.style.backgroundColor = 'red';

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


tableButton.onclick = createTable;
