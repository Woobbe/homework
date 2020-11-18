function cache(func) {
    const cached = {};
    return function() {
        const [firstArgument, secondArgument] = arguments;
        let result;

        for (let key in cached) {
            if (firstArgument === secondArgument) break;

            const isFirstArgumentInCache = cached[key].includes(firstArgument);
            const isSecondArgumentInCache = cached[key].includes(secondArgument);

            if (isFirstArgumentInCache && isSecondArgumentInCache) {
                return console.log(`Cached: ${key}`);
            }
        }
        result = func(...arguments);
        cached[result] = [...arguments];

        return console.log(`Function: ${result}`);
    };
}

const complexFunction = function(arg1, arg2) {
    return arg1 + arg2;
};

const cachedFunction = cache(complexFunction);

cachedFunction('foo', 'bar'); // функция должна быть выполнена
cachedFunction('foo', 'bar'); // функция НЕ должна быть выполнена
// она возвращает результат из кеша
cachedFunction('foo', 'baz'); // функция должна быть выполнена
// функция должна быть выполнена, потому что переданы новые аргументы
cachedFunction(5, 10); // функция должна быть выполнена
cachedFunction(10, 5); // функция НЕ должна быть выполнена
// она возвращает результат из кеша
cachedFunction(10, 15); // функция должна быть выполнена
// функция должна быть выполнена, потому что переданы новые аргументы
cachedFunction(10, 10);