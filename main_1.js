// Вариант №1

for (var i = 0; i < 10; i++) {
    var b = i;
    setTimeout(console.log, 10, ++b);
}

// Вариант №2
for(var i = 0; i < 10; i++) {
    var b = i;
    setTimeout(function(b) {
        console.log(++b);
    }, 10, b)
}

// Вариант №3
function counter(i) {
    console.log(++i);
}

for (var i = 0; i < 10; i++) {
    setTimeout(counter, 10, i);
}

// Вариант №4
for (var i = 0; i < 10; i++) {
    (function counter() {
        var b = i;
        return setTimeout(function() {
            console.log(++b);
        }, 10)
    })();
}

// Обратный порядок - знаю, что вариант не подходит, но решил оставить на память =)
var array = [];
for (var i = 0; i < 10; i++) {
    var b = i;
    array.push(++b);
    setTimeout(function() {
        console.log(array.pop())
    },10)
}