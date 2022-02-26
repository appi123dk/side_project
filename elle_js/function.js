'use strict';
// 1. function
// 함수는 한 가지의 일만 하도록 지정한다. 
// 함수의 이름은 doSomething, verb 형태로 저장 
// e.g. createCard, createPoint
// function type is object in JS

function printHello() {
    console.log("hello");
}

printHello();

function printMessage(msg) {
    console.log(msg);
}

const message = "나는 최고얌";
printMessage(message);

// 2. params 
// premitive : passed by value
// object : passed by reference

function changeName(obj) {
    obj.name = 'coder';
}

const paul = {name: 'paul'};
changeName(paul);
console.log(paul);

// 3. rest params

function printName(...args){
    for (const arg of args) { 
        // arg = 1;
        console.log(arg);
    }
}

printName('paul', 1, false, 'Freezia');

// 4. Early return Early exit
// bad
function upgradeUser(user) {
    if (user.point > 10 ){
        // statement
    }
}

// good
function upgradeUser(user) {
    if (user.point <= 10) {
        return;
    }
    // statement
}

// 5. function hoisting 

// 호이스팅 X

const printHelloWorld = function(){
    console.log('Hello World');
}
printHelloWorld();

// 호이스팅 O
hoist_printHelloWorld();
function hoist_printHelloWorld() {
    console.log('hoisted_Hello World');
}


// 6. Callback function 
function checkAnswer(answer, printYes, printNo){
    if (answer === 'paul') {
        printYes();
    } else {
        printNo();
    }
}

function printYes(){
    console.log("정답입니다~");
}

function printNo() {
    console.log("틀렸습니다.")
}

checkAnswer("paul", printYes, printNo);


// 7. Arrow function
const simplePrint = () => console.log("arrow function");
simplePrint();

const simpleSum = (a, b) => console.log(`sum = ${a + b}`);
simpleSum(3,8);


// 8. IIFE
// 선언함과 동시에 호출
// 최근에는 잘 사용하지 않는 추세
(function hello() {
    console.log("hello");
})();