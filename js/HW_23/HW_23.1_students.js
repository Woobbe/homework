class Form {
    constructor(options) {
        this.formWrapper = document.querySelector(options.wrapperSelector);
        this.form = document.createElement('form');

        this.createForm(options);
    }

    createForm(options) {
        this.form.className = options.formClass;
        this.form.setAttribute('action', options.action);
        this.form.setAttribute('method', options.method);
        this.formWrapper.append(this.form);
    }

    createInput(type, id, labelTextContent) {
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = type;
        input.id = id;
        label.textContent = labelTextContent;
        label.setAttribute('for', id);

        this.form.append(label);
        this.form.append(input);

        return input;
    }

    createButton(id, textContent) {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = textContent;

        this.form.append(button);

        return button;
    }

    disableButton(button, disabledClass) {
        button.disabled = true;
        button.classList.add(disabledClass);
    };

    activeButton(button, disabledClass) {
        button.disabled = false;
        button.classList.remove(disabledClass);
    };

    stopDefaultAction(event) {
        event.preventDefault();
    };
}

class StudentsForm extends Form {
    constructor(options) {
        super(options);

        this.firstName = super.createInput(
            'text',
            'student__first-name',
            'Имя');
        this.secondName = super.createInput(
            'text',
            'student__second-name',
            'Фамилия');
        this.age = super.createInput(
            'number',
            'student__age',
            'Возраст');
        this.course = super.createInput(
            'text',
            'student__course',
            'Курс');
        this.dateStart = super.createInput(
            'date',
            'student__date-start',
            'Дата начала');
        this.dateEnd = super.createInput(
            'date',
            'student__date-end',
            'Дата окончания');
        this.buttonSave = super.createButton(
            'student__save',
            'Save');
        this.buttonSave.addEventListener('click', this.stopDefaultAction);
    };
}

const students = new StudentsForm({
    wrapperSelector: '.students__wrapper',
    formClass: 'students__form',
    action: '/',
    method: 'post'
});

students.disableButton(students.buttonSave, 'button-disabled');

students.activeButtonSave = function() {
    if (this.firstName.value.length > 2 &&
        this.secondName.value.length > 2 &&
        this.dateStart.value !== '' &&
        this.dateEnd.value !== ''
    ) {
        this.activeButton(this.buttonSave, 'button-disabled');
    } else {
        this.disableButton(this.buttonSave, 'button-disabled');
    }
};


students.createTable = function(tableClass) {
    if (this.table === undefined) {
        this.table = document.createElement('table');
        this.table.classList.add(tableClass);
        this.formWrapper.append(this.table);

        students.createTableHeader(this.form, this.table);

        this.table.addEventListener('click', students.eventAction.bind(students));
    }
};

students.createTableHeader = function(form, table) {
    const row = document.createElement('tr');
    const labelCollection = form.querySelectorAll('label');

    for (let label of labelCollection) {
        let tableHead = document.createElement('th');
        tableHead.textContent = label.textContent;
        row.append(tableHead);
    }

    table.append(row);
};

students.createTableRow = function() {
    const row = document.createElement('tr');
    const inputCollection = this.form.querySelectorAll('input');
    const buttonEdit = document.createElement('button');
    const buttonDelete = document.createElement('button');
    const iconEdit = document.createElement('img');
    const iconDelete = document.createElement('img');
    iconEdit.src = 'img/icon/edit.svg';
    iconDelete.src = 'img/icon/delete.svg';
    iconEdit.setAttribute('name', 'edit');
    iconDelete.setAttribute('name', 'delete');


    buttonEdit.append(iconEdit);
    buttonDelete.append(iconDelete);

    for (let input of inputCollection) {
        const cell = document.createElement('td');
        const index = input.id.indexOf('_') + 2;
        const inputId = input.id.slice(index);
        cell.classList.add(`td__${inputId}`);
        cell.textContent = input.value;
        input.value = '';
        cell.append(buttonEdit);
        cell.append(buttonDelete);
        row.append(cell);
    }

    this.table.append(row);
    this.disableButton(students.buttonSave, 'button-disabled');
};

students.editTableRow = function(event) {
    let row = event.target;
    while (row.tagName !== 'TR') {
        row = row.parentElement;
    }
    const inputCollection = this.form.querySelectorAll('input');
    const tdCollection = row.querySelectorAll('td');

    for (let i = 0; i < tdCollection.length; i++) {
        inputCollection[i].value = tdCollection[i].textContent;
        tdCollection[i].textContent = '';
    }

    row.remove();
};


students.deleteRow = function(event) {
    let row = event.target;
    while (row.tagName !== 'TR') {
        row = row.parentElement;
    }
    row.remove();
};

students.eventAction = function(event) {
    if (event.target.name === 'edit') {
        students.editTableRow.call(students, event);
        return;
    }
    if (event.target.name === 'delete') {
        students.deleteRow.call(students, event);
    }
};

students.form.addEventListener('input', students.activeButtonSave.bind(students));
students.buttonSave.addEventListener(
    'click',
    students.createTable.bind(students, 'students__table'),
    {once: true});
students.buttonSave.addEventListener('click', students.createTableRow.bind(students));