'use strict';

// Callback 함수 : 시간이 지나 다시 불러줘 
// 대표적인 함수 : setTimeout()

// Synchronous callback ( 동기 콜백 )
function printImmediately(print) {
    print();
}

function sayCallBack() {
    console.log("콜백함수!");
}

printImmediately(function(){
    console.log("콜백함수");
});
printImmediately(sayCallBack);
printImmediately(() => console.log("hello"));

// Asynchronous callback ( 비동기 콜백 )
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log('비동기콜백'), 2000)

// Callback Hell example

class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        },2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie'){
                onSuccess({
                    name: 'ellie',
                    role: 'admin'
                });
            } else {
                onError(new Error('no access'));
            }
        }, 1000)
    }
}



// function loginSuccess(id) {
//     console.log(`${id}님이 로그인 되었습니다`);
// }
// function printRoles(user) {
//     console.log(`${user.name}님은 ${user.role}입니다`);
// }

// function onError(printError) {
//     console.log(printError);
// }

// const user = new UserStorage();

// // 로그인시도 
// const user_id = prompt("이름을 입력해주세요");
// const user_pw = prompt("비밀번호를 입력해주세요");

// user.loginUser(user_id, user_pw, loginSuccess, onError);
// user.getRoles(user_id, printRoles, onError);

// => 함수가 호이스팅되어 user loginSuccess 에 따라 getRoles 함수를 불러올 수 없음 



// 아래와 같은 콜백헬은 체인이 길어지면 길어질수록 가독성, 디버깅 부분에서 큰 문제!


const user = new UserStorage();


const user_id = prompt("이름을 입력해주세요");
const user_pw = prompt("비밀번호를 입력해주세요");

user.loginUser(
    user_id,
    user_pw,
    user_id => {
        console.log(`${user_id}로 로그인 되었습니다`);
        user.getRoles(
            user_id,
            user => {
                console.log(`${user.name}님은 ${user.role} 권한을 갖고 있습니다`);
            },
            error => {
                console.log(error);
            }
        )
    },
    error => {
        console.log(error);
    }
);