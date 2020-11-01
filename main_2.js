const maths = {
    a: 1,
    sum: function(sumArgument = 1) {
        this.a = this.a + sumArgument;
        return this;
    },
    minus: function(minusArgument = 1) {
        this.a = this.a - minusArgument;
        return this;
    },
    multiplay: function(multiplayArgument = 1) {
        this.a = this.a * multiplayArgument;
        return this;
    },
    showResult: function() {
        console.log(this.a)
    }
};

maths.sum(5).sum(10).minus(3).multiplay(2).showResult();