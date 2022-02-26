// Start
alert('바닐라 JS를 본격적으로 공부해봅시다');

const a = 215;
let b = a - 400;

const c = "🐔"

const paul = {
    name: "park Kyung Gyu",
    age: "31",
    sex: "male",
    smart: "good",
    fav_food: [
        { 
            name: "apple",
            flavor: "good"
        }, {
            name: "banana",
            flavor: "good"
        }

    ],
    has_girlfriend: true
}

const dahae = {
    name: "Um",
    age: "28",
    sex: "female",
    smart: "soso",
    fav_food: [
        {
            name: "pear",
            flavor: "good"
        }, {
            name: "lotus",
            flavor: "good"
        }

    ],
    has_girlfriend: true
}

const peopleInfo = [paul, dahae];

console.log(peopleInfo);

const calculator = {
    plus: function (a, b) {
        return a + b;
    },
    substract: function (a, b) {
        return a - b;
    },
    multiply: function (a, b) {
        return a * b;
    },
    divide: function (a, b) {
        return a / b;
    }
}

const plus = calculator.plus(3, 5)
const divide = calculator.divide(10, 5)