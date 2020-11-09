applyAll(sum, 1, 2, 3, 4, 5, 6, 7);
applyAll(mul, 1, 2, 3, 4);

function sum(rest) {
    return rest.reduce((a, b) => a + b);
}

function mul(rest) {
    return rest.reduce((a, b) => a * b);
}

function applyAll(func, ...rest) {
    return console.log(func.apply(null, [rest]));
}
