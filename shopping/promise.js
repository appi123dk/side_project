var p1 = new Promise(
    (resolve, reject) => {
        console.log("프라미스 함수제작");
        //0.5초 뒤에 콘솔에 찍습니다.
        setTimeout(
            () => {
                //프라미스 이행 될때 실행할 부분을 resolve로 적습니다.
                resolve({ var1: "^_^" });
            }, 2000);
    }
);

var p2 = new Promise(
    (resolve, reject) => {
        console.log("프라미스 함수제작");
        //0.3초 뒤에 콘솔에 찍습니다.
        setTimeout(
            function () {
                if (false) {
                    resolve({ var2: "-_-" });
                } else {
                    reject(console.log("오류"));
                }
                
            }, 3000);
    }
);

// p1.then((result) => {
//     console.log("var1 = " + result.var1);
//     return p2;
// }).then((result) => {
//     console.log("var2 = " + result.var2);
// })

// 배열로 한번에 작성하기

Promise.all([p1, p2]).then((result) => {
    console.log(result);
    console.log("var1 = ", result[0].var1);
    console.log("var2 = ", result[1]);
});