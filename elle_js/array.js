'use strict';

// Array ( 자료구조 )
// -> 검색, 정렬, 삽입, 삭제 ( 알고리즘 )

// 1. Declaration
const arr1 = new Array();
const arr2 = [];

// 2. Index Position
const fruits = ['apple', 'banana'];
// console.log(fruits.length);
// console.log(fruits[0]);

// 3. looping print
for (let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);
}

for (const fruit of fruits) {
    console.log(fruit);
}

function printFruit(fruit, index, array) {
    console.log(fruit);
    console.log(index);
    console.log(array);
}

fruits.forEach(printFruit);
fruits.forEach((fruit, index) => console.log(fruit + index));

// 4. Addition, deletion, copy 

// push - 뒤에 추가
console.log(fruits.push('strawberry', 'peach'));
console.log(fruits);

// pop - 맨 뒤 삭제
fruits.pop();
console.log(fruits);

// unshift - 맨 앞 추가 
fruits.unshift('probe');
console.log(fruits);

// shift - 맨 앞 삭제
fruits.shift();
console.log(fruits);

// 주의사항 : shift와 unshift 는 pop/push 보다 느리다!

// splice: 인덱스를 조절하여 삭제하고 추가하기
fruits.push('kiwi', 'grape', 'pear');
console.log(fruits);

fruits.splice(1, 0, "test");
console.log(fruits);

// concat 
const fruit2 = ['watermelon', 'melon'];
const fruit3 = ['mustang'];
const fruitWealthy = fruits.concat(fruit2, fruit3);
console.log(fruitWealthy);

// 5. Searching
console.clear();
// fruits.push('apple');
const fruit4 = fruits.slice(2,4);
console.log(fruit4);
console.log(fruits);
console.log(fruits.indexOf('apple'));
console.log(fruits.lastIndexOf('apple'));
console.log(fruits.includes('kiwi'));

console.log([11, 2, 22, 1].sort((a, b) => b - a));



const numbers = [0,0,3,0,4,0,1];
numbers.sort((a,b) => {
  if (a === 0)
    return 1;
  else if (b === 0)
    return -1;
  else
    return a-b;
});

console.log(numbers);

const new_numbers = numbers.splice(1,3, 10, 20);
console.log(numbers);