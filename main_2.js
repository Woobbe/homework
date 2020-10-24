const listStudents = {
    student1: {
        name: 'Vasya',
        startYear: 2000,
        endYear: 2005
    }, student2: {
        name: 'Petya',
        startYear: 2001,
        endYear: 2006
    }, student3: {
        name: 'Alex',
        startYear: 1999,
        endYear: 2004
    }, student4: {
        name: 'Oleg',
        startYear: 2000,
        endYear: 2002
    }, student5: {
        name: 'Igor',
        startYear: 2006,
        endYear: 2009
    }, student6: {
        name: 'Anna',
        startYear: 2000,
        endYear: 2002
    }, student7: {
        name: 'Valeria',
        startYear: 2001,
        endYear: 2006
    }, student8: {
        name: 'Kate',
        startYear: 2001,
        endYear: 2007
    }, student9: {
        name: 'Maria',
        startYear: 2002,
        endYear: 2005
    }, student10: {
        name: 'Victoria',
        startYear: 2000,
        endYear: 2001
    }, showStudents: function(startYearFilter, endYearFilter) {
        let listYears = [];
        let result = {};
        let count = 0;
        let maxYear = [];

        for (startYearFilter; startYearFilter <= endYearFilter; startYearFilter++) {
            listYears = [];

            for (let student in this) {
                if (startYearFilter >= this[student].startYear
                    && startYearFilter <= this[student].endYear) {
                    listYears.push(startYearFilter);
                }
            }

            result[startYearFilter] = listYears.length;
        }

        for (let year in result) {
            if (count === result[year]) {
                maxYear.push(year);
                continue;
            }

            if (count < result[year]) {
                count = result[year];
                maxYear = [year];
            }
        }

        return console.log(`Максимальное количество студентов было в ${maxYear} году - ${count} студентов.`);
    }

};

listStudents.showStudents(2000, 2009);
