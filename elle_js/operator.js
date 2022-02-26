// 1. string concat
console.log('con' + 'cat');
console.log('1'+'2');
console.log(`1+2 : ${1+2}`);

// 2. numeric operator
console.log( 1 + 2 );
console.log( 1 - 2 );
//....

// 3. increment and decrement
let counter = 2;
const preIncrement = ++counter;
console.log(`preIncrement : ${preIncrement}, counter : ${counter}`);

const postIncrement = counter++;
console.log(`postIncrement : ${postIncrement}, counter : ${counter}`);

// 4. assignment operators
let x = 3,
    y = 7;

x += y;
console.log(x);

// 6. logical operators: || or, && and, ! not
const value1 = false;
const value2 = 4 < 2;

// or 연산자는 true만 찾는다. -> 속도개선에 참고, 복잡한 함수는 뒤에 배치하여 앞에서 true가 나오면 끝나도록 함 
console.log(`or : ${value1|value2|check()}`);

function check(){
    return true;
}

// and 연산자는 false가 나오면 끝 

// 7. Equality
// === 'strict equality' 변수 타입까지 엄격하게 확인. strict 권장 

// 0, null, undefined, '' 는 모두 false로 치환될 수 있음 
console.log( 0 == null );
console.log( 0 === null );
console.log( false == 0 );
console.log( undefined == null );

// 8. conditional operator : if
const name = 'dfdfd';

if (name === 'paul'){
    console.log ( "it's okay" );
} else if(name === 'com') {
    console.log ("it's false");
} else {
    console.log ("I don't know");
}

console.log( name === 'paul' ? "it's okay" : "it's false");

// 9. switch statement
const browser = 'sdfsdfsdf'
switch (browser){
    case 'Chrome':
        console.log("YEP BABY");
        break;
    case 'IE':
    case 'firefox':
        console.log("It's similar");
        break;
    default:
        console.log("I'ts different");
        break;
}

// 10. while loop
let i = 3;

while ( i > 0 ) {
    console.log(`i : ${i}`);
    --i
}

// i = 3;
do {
    console.log(`i : ${i}`);
    --i
} while( i > 0)

// for loop
for (i = 3; i > 0; i-- ){
  console.log(`i : ${i}`);
}

// nested loop 피하는 것이 좋다. 
for (i = 0; i < 5; i++ ){
  for (let j = 0; j < 4; j++) {
    console.log(`i : ${i}, j : ${j}`);
  }
}

// continue & break 
for (let i = 0; i < 10; i++) {
  if (i % 2 === 1) {
    continue;
  } else {
    console.log(i);
  }
}

for (let i = 0; i < 10; i++) {
  if (i > 8) {
    break;
  } else {
    console.log(i);
    }
}