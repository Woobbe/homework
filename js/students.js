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

    createInput(type, id, placeholder, labelTextContent, errorTextContent, minDate, maxDate) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const errorText = document.createElement('p');

        label.textContent = labelTextContent;
        label.setAttribute('for', id);
        input.type = type;
        input.id = id;
        input.placeholder = placeholder;
        errorText.textContent = errorTextContent;

        if (type === 'date') {
            input.min = minDate;
            input.max = maxDate;
        }

        this.form.append(label);
        this.form.append(input);
        this.form.append(errorText);

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
            'Enter first name',
            'First name',
            'Consists of the first capital letter, small Latin letters, a space, and a dash.');
        this.secondName = super.createInput(
            'text',
            'student__second-name',
            'Enter last name',
            'Last name',
            'Consists of the first capital letter, small Latin letters, a space, and a dash.');
        this.age = super.createInput(
            'number',
            'student__age',
            'Enter age',
            'Age',
            'Only older than 16 and younger 110 years.');
        this.course = super.createInput(
            'text',
            'student__course',
            'Введите курс',
            'Course',
            'Only Latin characters, numbers and the _ sign are allowed.');
        this.dateStart = super.createInput(
            'date',
            'student__date-start',
            null,
            'Start Date',
            'The Start Date must not be less than 01.01.1970 and greater than the End Date.',
            '1970-01-01',
            '2025-01-01');
        this.dateEnd = super.createInput(
            'date',
            'student__date-end',
            null,
            'End Date',
            'The end date must not be less than the Start Date or more than 01.01.2025.',
            '1970-01-01',
            '2025-01-01');
        this.buttonSave = super.createButton(
            'student__save',
            'Save');
        this.buttonSave.addEventListener('click', this.stopDefaultAction);
    };

    isValidName(event) {
        const regExp = /^[A-Z]{1}[a-zA-Z\- ]{1,14}$/;
        const nameValue = event.target.value;

        if (nameValue.length > 0 && !regExp.test(nameValue)) {
            this.showErrorMessage(event.target);
        } else {
            this.hideErrorMessage(event.target);
        }
    };

    isValidAge() {
        const ageValue = this.age.value;

        if (ageValue.length > 0
            && (ageValue < 16
                || ageValue > 110)
            || ageValue.includes('e')) {
            this.showErrorMessage(this.age);
        } else {
            this.hideErrorMessage(this.age);
        }
    };

    isValidCourse() {
        const regExp = /^[a-zA-Z0-9_]+$/;
        const courseValue = this.course.value;

        if (courseValue.length > 0 && !regExp.test(courseValue)) {
            this.showErrorMessage(this.course);
        } else {
            this.hideErrorMessage(this.course);
        }
    };

    isValidDateStart() {
        const startDateValue = this.dateStart.value;
        const currentDate = Date.now();
        const startDateValueMs = Date.parse(startDateValue);

        if (startDateValue !== ''
            && this.dateEnd.value !== ''
            && (startDateValue < '1970-01-01'
                || startDateValue > this.dateEnd.value
                || startDateValueMs > currentDate)) {
            this.showErrorMessage(this.dateStart);
        } else {
            this.hideErrorMessage(this.dateStart);
        }

    };

    isValidDateEnd() {
        const endDateValue = this.dateEnd.value;

        if (endDateValue !== ''
            && this.dateStart.value !== ''
            && (endDateValue > '2025-01-01'
                || endDateValue < this.dateStart.value)) {
            this.showErrorMessage(this.dateEnd);
        } else {
            this.hideErrorMessage(this.dateEnd);
        }
    };

    showErrorMessage(input) {
        input.classList.add('input__error');
        input.nextElementSibling.style.visibility = 'visible';
    };

    hideErrorMessage(input) {
        input.classList.remove('input__error');
        input.nextElementSibling.style.visibility = 'hidden';
    };

    eventCatchForm(event) {
        switch (event.target.id) {
            case 'student__first-name':
            case 'student__second-name':
                this.isValidName.call(students, event);
                break;
            case 'student__age':
                this.isValidAge.call(students);
                break;
            case 'student__course':
                this.isValidCourse.call(students);
                break;
            default:
                this.isValidDateStart.call(students);
                this.isValidDateEnd.call(students);
        }
        this.activeButtonSave(students);
    }

    revertDate(input) {
        const inputDate = new Date(input.valueAsDate);
        let date = inputDate.getDate();
        let month = inputDate.getMonth() + 1;
        let year = inputDate.getFullYear();
        [date, month, year] = plusZerro(date, month, year);

        return `${date}-${month}-${year}`;
    }
};

const students = new StudentsForm({
    wrapperSelector: '.students__wrapper',
    formClass: 'students__form',
    action: '/',
    method: 'post'
});

students.disableButton(students.buttonSave, 'button-disabled');

students.activeButtonSave = function() {
    const errorMessagesCollection = this.form.querySelectorAll('p');

    for (let errorMessage of errorMessagesCollection) {
        let hasError = errorMessage.style.visibility === 'visible';

        if (hasError) {
            this.disableButton(this.buttonSave, 'button-disabled');
            return;
        } else {
            this.activeButton(this.buttonSave, 'button-disabled');
        }
    }

    if (this.firstName.value.length > 1 &&
        this.secondName.value.length > 1 &&
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

        students.createTableHeader();

        this.table.addEventListener('click', students.eventAction.bind(students));
    }
};

students.createTableHeader = function() {
    const row = document.createElement('tr');
    const labelCollection = this.form.querySelectorAll('label');
    const tableHeadNumber = document.createElement('th');
    const tableHeadAction = document.createElement('th');
    tableHeadNumber.textContent = 'Number';
    tableHeadAction.textContent = 'Actions';
    row.append(tableHeadNumber);

    for (let label of labelCollection) {
        let tableHead = document.createElement('th');
        tableHead.textContent = label.textContent;
        row.append(tableHead);
    }

    row.append(tableHeadAction);
    this.table.append(row);
};

students.createTableRow = function() {
    const row = document.createElement('tr');
    const inputCollection = this.form.querySelectorAll('input');
    const currentRowIndex = this.table.querySelectorAll('tr').length;
    const buttonEdit = document.createElement('button');
    const buttonDelete = document.createElement('button');
    const iconEdit = document.createElement('img');
    const iconDelete = document.createElement('img');
    const tableDataIndex = document.createElement('td');
    const tableDataButtons = document.createElement('td');

    iconEdit.src = 'img/icon/edit.svg';
    iconDelete.src = 'img/icon/delete.svg';
    iconEdit.setAttribute('name', 'edit');
    iconDelete.setAttribute('name', 'delete');
    tableDataIndex.textContent = currentRowIndex;
    row.append(tableDataIndex);

    for (let input of inputCollection) {
        const cell = document.createElement('td');
        const index = input.id.indexOf('_') + 2;
        const inputId = input.id.slice(index);
        cell.classList.add(`td__${inputId}`);

        if (input.type === 'date') {
            cell.textContent = this.revertDate(input);
            input.value = '';
            row.append(cell);
            continue;
        }

        cell.textContent = input.value;
        input.value = '';

        row.append(cell);
    }

    buttonEdit.append(iconEdit);
    buttonDelete.append(iconDelete);
    tableDataButtons.append(buttonEdit, buttonDelete);
    row.append(tableDataButtons);

    this.table.append(row);
    this.disableButton(students.buttonSave, 'button-disabled');
};

students.editTableRow = function(event) {
    let row = event.target;
    while (row.tagName !== 'TR') {
        row = row.parentElement;
    }
    const inputCollection = this.form.querySelectorAll('input');
    const tdCollection = row.querySelectorAll('[class^="td"]');

    for (let i = 0; i < tdCollection.length; i++) {
        if (inputCollection[i].type === 'date') {
            const dateArray = tdCollection[i].textContent.split('-');
            inputCollection[i].value = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
            tdCollection[i].textContent = '';
            continue;
        }

        inputCollection[i].value = tdCollection[i].textContent;
        tdCollection[i].textContent = '';
    }

    row.remove();
    students.generateIndexRow();
};

students.generateIndexRow = function() {
    const rowCollection = this.table.querySelectorAll('tr td:first-child');
    let index = 1;
    for (let row of rowCollection) {
        row.textContent = index;
        index++;
    }
};

students.deleteRow = function(event) {
    let row = event.target;
    while (row.tagName !== 'TR') {
        row = row.parentElement;
    }
    row.remove();
    students.generateIndexRow();
};

students.eventAction = function(event) {
    if (event.target.name === 'edit') {
        students.editTableRow(event);
        return;
    }
    if (event.target.name === 'delete') {
        students.deleteRow(event);
    }
};


students.buttonSave.addEventListener('click',
    students.createTable.bind(students, 'students__table'),
    {once: true});
students.buttonSave.addEventListener('click', students.createTableRow.bind(students));
students.form.addEventListener('input', students.eventCatchForm.bind(students));