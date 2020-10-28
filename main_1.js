const listStudents = {
    student1: {
        name: 'Vasya',
        startYear: 2000,
        endYear: 2005
    },
    student2: {
        name: 'Petya',
        startYear: 2001,
        endYear: 2006
    },
    student3: {
        name: 'Alex',
        startYear: 1999,
        endYear: 2004
    },
    student4: {
        name: 'Oleg',
        startYear: 2000,
        endYear: 2001
    },
    student5: {
        name: 'Igor',
        startYear: 2007,
        endYear: 2009
    },
    student6: {
        name: 'Anna',
        startYear: 2000,
        endYear: 2003
    },
    student7: {
        name: 'Valeria',
        startYear: 2001,
        endYear: 2006
    },
    student8: {
        name: 'Kate',
        startYear: 2002,
        endYear: 2007
    },
    student9: {
        name: 'Maria',
        startYear: 2002,
        endYear: 2005
    },
    student10: {
        name: 'Victoria',
        startYear: 2000,
        endYear: 2001
    },
    showStudents: function(startYearFilter, endYearFilter) {
        let result = [];

        for (let student in this) {
            if (startYearFilter <= this[student].endYear
                && endYearFilter >= this[student].startYear) {
                result.push(this[student].name);
            }
        }

        return console.log(result.join(', '));
    }
};

listStudents.showStudents(2007, 2009);
