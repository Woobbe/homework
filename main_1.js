let receiptTee = {
    water: 200,
    tea: 5,
    sugar: 3
};

let stock = {
    water: 500,
    coffee: 1000,
    sugar: 312,
    tea: 12
};

function checkAmountCookingByReceipt(receipt) {

    let listPortion = [];

    for (let ingredient in receipt) {
        let portion = stock[ingredient] / receipt[ingredient];
        if (portion < 1) {
            return 0;
        } else {
            listPortion.push(portion);
        }
    }

    return Math.floor(Math.min(...listPortion));
};


function checkAvailableIngredients(receipt) {

    let listReceiptIngredients = Object.keys(receipt);
    let listStockIngredients = Object.keys(stock);

    for (let ingredient of listReceiptIngredients) {
        if (!(listStockIngredients.includes(ingredient))) return false;
    }

    return true;
};

function showAmountCookingByReceipt(receipt) {
    if (!(checkAvailableIngredients(receipt))) {
        return console.log(`Извините, на складке отсутствуют необходимые ингридиенты.`);
    } else {
        let amount = checkAmountCookingByReceipt(receipt);
        if (amount === 0) {
            return console.log(`К сожалению, на складе недостаточно ингридиентов для приготовления по Вашему рецепту.`);
        } else {
            return console.log(`На складе доступно ингридиентов для приготовления ${amount} порций по вашему рецепту.`);
        }
    }
};

showAmountCookingByReceipt(receiptTee);





