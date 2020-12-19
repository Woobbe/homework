function validatePassword(password) {

    let isValid = stringLength(password) && containsLetter(password) && containsNum(password) && !containsNotLetterNum(password);

    if (isValid) {
        checkNumber(prompt('Enter the number', ''));
    } else {
        console.log('Incorrect password!');
    }

};


let stringLength = (password) => (password.length >= 6 && password.length <= 20);


let containsLetter = (password) => {
    for (let char of password) {
        let getUnicodeChar = char.charCodeAt();
        if ((getUnicodeChar >= 1040 && getUnicodeChar <= 1103) || (getUnicodeChar >= 65 && getUnicodeChar <= 90 || getUnicodeChar >= 97 && getUnicodeChar <= 122)) {
            return true;
        }
    }
    return false;
};


let containsNum = (password) => {
    for (let number of password) {
        let getUnicodeNum = number.charCodeAt();
        if ((getUnicodeNum >= 48 && getUnicodeNum <= 57)) {
            return true;
        }
    }
    return false;
};


let containsNotLetterNum = (password) => {
    for (let symbol of password) {
        let getUnicodeSymbol = symbol.charCodeAt();
        let number = (getUnicodeSymbol >= 48 && getUnicodeSymbol <= 57);
        let letter = (getUnicodeSymbol >= 1040 && getUnicodeSymbol <= 1103) || (getUnicodeSymbol >= 65 && getUnicodeSymbol <= 90 || getUnicodeSymbol >= 97 && getUnicodeSymbol <= 122);
        if (!number && !letter) {
            return true;
        }
    }
    return false;
};


let objNumber = {};

function checkNumber(number) {

    if (isSimpleNumber(number)) {
        objNumber.simple = true;
        objNumber.even = false;
        objNumber.multipleTen = false;
    } else {
        objNumber.simple = false;
        multipleTenNumber(number);
    }

    if (objNumber.simple || objNumber.even || objNumber.multipleTen) {
        let num1 = prompt('Enter the first number', '');
        let num2 = prompt('Enter the second number', '');
        sumString(num1, num2);
    } else {
        console.log('Number failed to pass the test!');
    }
};


function isSimpleNumber(number) {

    if (number < 0) {
        return false;
    } else {
        for (let num = 2; num < number; num++) {
            if (!(number % num)) return false;
        }
    }
    return true;
};


function multipleTenNumber(number) {
    if (!(number % 10)) {
        objNumber.even = true;
        objNumber.multipleTen = true;
    } else {
        checkEvenNumber(number);
        objNumber.multipleTen = false;
    }
};

function checkEvenNumber(number) {
    if (number & 1 || number === 2) {
        objNumber.even = false;
    } else {
        objNumber.even = true;
    }

};


function sumString(num1, num2) {

    let num1Array = num1.split('');
    let num2Array = num2.split('');

    let maxLength = Math.max(num1Array.length, num2Array.length);

    let result = '';
    let sum = 0;
    let ten = 0;
    for (let i = 0; i < maxLength; i++) {
        let num1LastSymb = ~~num1Array.pop();
        let num2LastSymb = ~~num2Array.pop();

        sum = num1LastSymb + num2LastSymb + ten;

        if (sum > 9) {
            sum = sum - 10;
            ten = 1;
        } else {
            ten = 0;
        }

        result = sum + result;
    }

    if (ten === 1) {
        result = '1' + result;
    }

    return console.log(result);
};

validatePassword(prompt('Enter password', ''));
