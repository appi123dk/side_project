// Object
// Object = {key: value} 로 구성되어있다.

const obj1 = {};   // 'object literal' syntax
const obj2 = new Object();  // 'object constructor' syntax

function printPerson(person){
  console.log(`My name is ${person.name}, and I'm ${person.age} years old`);
}

const paul = {
  name: 'paul',
  age: 4
}

printPerson(paul);

paul.female = false;
console.log(paul);

// 2. Computed properties
// 키값을 변수로 받는 경우, 활용이 어려울 수 있으니 
// dot 형태 말고 computed properties 로도 활용할 줄 알아야 함 
console.log(paul.name); 
console.log(paul['name']);


// 3. Property value shorthand
const person1 = {
  name: 'paul',
  age: '39'
}

// function makePerson(name, age){
//     return {
//         name,
//         age
//     }
// }


// 4. Constructor function
function Person(name, age){
  this.name = name;
  this.age = age;
}


const person4 = new Person('경규', '32');
console.log(person4);


// 5. in operator: property exsistence check
console.log('name' in person4);

// 6. for..in vs for..of
for (key in person4) {
  console.log(key);
}

const array = [1,2,3,4,5];
for (value of array){
  console.log(value);
}

// 7.Fun cloning
const user = {
  name: 'paul',
  age: '20'
}

const user2 = user;
user2.name = "FAKE";
console.log(user.name);

// REAL PASTE 
// const user3 = {};
// Object.assign(user3, user);
const user3 = Object.assign({}, user);
user3.name = "REAL PASTE";
console.log(user);
console.log(user3);