// calc.js

function sum(a,b) {
    return a+b;
}

function multiplication(a,b) {
    return a*b;
}

function division(a,b) {
    return a/b;
}

function soustraction(a,b) {
    return a-b;
}

module.exports = {
    sum: sum,
    multiplication: multiplication,
    division: division,
    soustraction: soustraction
}