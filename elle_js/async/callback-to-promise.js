// Callback Hell example


class UserStorage {
    loginUser(username, password) {
        return new Promise((resolve, reject) => {
            console.log('로그인을 시도하고 있습니다....');
            setTimeout(() => {
                if (
                    (username === 'ellie' && password === 'dream') ||
                    (username === 'coder' && password === 'academy')
                ) {
                    resolve(username);
                } else {
                    reject(new Error('not found'));
                }
            },1000);
        }) 
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            console.log('권한을 가져오는 중입니다.....');
            setTimeout(() => {
                if (user === 'ellie'){
                    resolve({
                        name: 'ellie',
                        role: 'admin'
                    });
                } else {
                    reject(new Error('no access'));
                }
            }, 2000);
        })
    }
}


// const loginUser = (username, password) => 
//     new Promise((resolve, reject) => {
//         console.log('로그인을 시도하고 있습니다....');
//         setTimeout(() => {
//             if (
//                 (username === 'ellie' && password === 'dream') ||
//                 (username === 'coder' && password === 'academy')
//             ) {
//                 resolve(username);
//             } else {
//                 reject(new Error('not found'));
//             }
//         }, 1000);
//     });

// const getRoles = (username) => 
//     new Promise((resolve, reject) => {
//         console.log('권한을 가져오는 중입니다.....');
//         setTimeout(() => {
//             if(username === 'ellie'){
//                 resolve({
//                     name: 'ellie',
//                     role: 'admin'
//                 });
//             } else {
//                 reject(new Error('no access'));
//             }
//         }, 2000)
//     });


const user = new UserStorage;

const username = prompt("이름을 입력해주세요");
const user_pw = prompt("비밀번호를 입력해주세요");

user.loginUser(username, user_pw)
    .then((value) => {
        console.log(`${value} 님이 로그인하셨습니다.`);
        return user.getRoles(value)
    })
    .then((value) => {
        console.log(`${value.name}님은 ${value.role}입니다`);
    })
    .catch(e => console.log(e));



