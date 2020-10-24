applyAll(sum, 1, 2, 3, 4, 5, 6, 7);
applyAll(mul, 1, 2, 3, 4);

function sum(rest) {
    let resultSum = 0;

    for (let i of rest) {
        resultSum += i;
    }

    return resultSum;
}

function mul(rest) {
    let resultMul = 1;

    for (let i of rest) {
        resultMul *= i;
    }

    return resultMul;
}

function applyAll(func, ...rest) {
    return console.log(func(rest));
}

