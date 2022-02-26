// 성능개선에도 좋고, clean code 작성에도 좋음
// vanila JS로 개발시에는 strict 모드 추천!

'use strict'; 


// var ( 사용하지 말 것! )
// var hoisting (호이스팅) - 선언된 변수를 맨 위로 올려서 작동하게 함 
// var는 심지어 블록스코프도 없음

name = "Paul";
var name; 

console.log(name);

// const - 변경 불가능한 변수
//  - 보안
//  - 여러 쓰레드가 변수에 접근할 때 안전함
//  - 휴먼에러 줄이기 ( 나 자신 또는 동료의 에러에서 보호 )

const myName = "It's Paul"
console.log(myName);


// Symbol : 어디다 쓰는걸까요 

const symbol1 = Symbol('id');
console.log(symbol1.description)

