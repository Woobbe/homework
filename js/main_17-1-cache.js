var complexFunction = function(arg1, arg2) {
    return arg1 + arg2;
};

var cachedFunction = cache(complexFunction);

function cache(func) {
   // console.log(func);
   return func;
}

console.log(cachedFunction(5, 10));