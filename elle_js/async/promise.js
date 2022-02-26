'use strict';

//  Promise 
//  1. State : pending -> fulfilled or rejected 
//  2. Who : 정보 제공자냐(producer), 정보를 받는 사람이냐(consumer)

// 1. producer
// promise 는 내부 executor에 의해 곧바로 실행됨. 이에따라 이용자가 선택할때 실행하도록 하는 것이 필요함
const promise = new Promise((resolve, reject) => {
    // 네트워크 통신, DB에서 파일을 읽어옴 등등 
    console.log('loading......');
    setTimeout(() => {
        // resolve('ellie');
        reject(new Error('no network'));
    },500)
});

// 2. Consumers : then, catch, finally 를 통해 값을 받아올 수 있음 
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log("성공하든 실패하든 실행한다");
    });


// Promise Chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('데이터 로딩중...');
        resolve(1)
    },2000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('숫자를 받아왔습니다');
                resolve(num * 5);
            }, 2000)
        });
    })
    .then(num => console.log(num));


// Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('암닭'), 1000)
    })

const getEgg = (hen) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 달걀`), 1000)
    })

const cook = (egg) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 계란후라이`), 1000);
    })

// getHen()
//     .then(hen => {
//         console.log(`${hen}`);
//         getEgg(hen)
//             .then(egg => {
//                 console.log(`${egg}`);
//                 cook(egg)
//                     .then((fried) => {
//                         console.log(`${fried}`);
//                     })
//             })
//     })

getHen()
    .then(getEgg)
    .catch(e => {
        console.log('실패했습니다');
    })
    .then(cook)
    .catch(e => {
        console.log('실패했습니다');
    })
    .then((value) => console.log(value))
    .catch(() => cosnole.log("the hell"));
    
    
