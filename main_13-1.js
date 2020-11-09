// Вариант №1

for (var i = 0; i < 10; i++) {
    setTimeout(console.log, 10, i+1);
}

// Вариант №2
for(var i = 0; i < 10; i++) {
    setTimeout(function(i) {
        console.log(i+1);
    }, 10, i)
}

// Вариант №3
function counter(i) {
    console.log(i);
}

for (var i = 0; i < 10; i++) {
    setTimeout(counter, 10, i+1);
}

// Вариант №4
for (var i = 0; i < 10; i++) {
    (function counter(i) {
        return setTimeout(function() {
            console.log(i+1);
        }, 10)
    })(i);
}

// Shift нельзя использовать, но так легко меняется на обратный порядок через pop() - знаю, что вариант не подходит, но решил оставить на память =)
var array = [];
for (var i = 0; i < 10; i++) {
    array.push(i+1);
    setTimeout(function() {
        console.log(array.shift())
    },10)
}