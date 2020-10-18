const currency = {
    25: 0,
    50: 0,
    100: 0
};
const priceTicket = 25;
let payVisitor;
let result;

function getPayVisitor() {

    payVisitor = prompt('Внесите купюру', '');

    switch (payVisitor) {
        case '25':
            result = addCurrency25();
            showMessageForUser(result);
            break;
        case '50':
            result = checkPassBy50();
            showMessageForUser(result);
            break;
        case '100':
            result = checkPassBy100();
            showMessageForUser(result);
            break;
        default:
            console.log('Внесите корректную купюру равную: 25, 50 или 100.');
            getPayVisitor();
    }
}

function showMessageForUser(result) {

    if (result) {
        console.log('Спасибо за покупку!');
        getPayVisitor();
    } else {
        return console.log('Извините, но в кассе недостаточно купюр для выдачи сдачи. Приходите позже.');
    }
}

function addCurrency25() {

    for (let key in currency) {

        if (payVisitor == key && payVisitor == priceTicket) {
            currency[payVisitor] += 1;
            return true;
        } else return false;
    }
}

function checkPassBy50() {

    if (currency[priceTicket] >= 1) {
        currency[payVisitor] += 1;
        currency[priceTicket] -= 1;
        return priceTicket;
    } else {
        return false;
    }
}

function checkPassBy100() {

    if (((currency['50'] >= 1 && currency['25'] >= 1) || (currency['25'] >= 3))) {

        if (currency['50'] >= 1 && currency['25'] >= 1) {
            currency['50'] -= 1;
            currency['25'] -= 1;
            return true;
        } else {
            currency['25'] = currency['25'] - 3;
            return true;
        }

    } else return false;
}


getPayVisitor();

