// async & await
// async & await 이 필요할때도, promise/then 이 필요할때도 있음 

// 1. async Promise 를 굉장히 쉽게 만들어주는 요소
// function fetchUser(){
//     return new Promise((resolve, reject) => {
//         // 서버와 통신 등 긴 작업수행 - 사용자 데이터 조회 등 
//         resolve('유저데이터');
//     });
// }

// 위의 return Promise가 사라지며 매우 깔끔한 코드가 됨
// 이런 요소를 Syntatic Sugar 라고 표현
async function fetchUser(){
  return '유저데이터';
}

const user = fetchUser();
// user.then((v) => console.log(v));
user.then(console.log);

// 2. await
function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(() => {
    console.log("로딩중...");
    resolve('101');
  }, ms))
}

async function getApple() {
  const returnCode = await delay(1000);
  console.log(`code : ${returnCode}`);
  return '🍎';
}

async function getBanana(){
  const returnCode = await delay(3000);
  console.log(`code : ${returnCode}`);
  return '🍌';
}

async function getFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;

  console.log(`내가 산 과일 : ${apple}, ${banana}`);
}

// getFruits(); 를 더 효율적으로 만드는 Promise 코드 

// Promise APIS 
// promise.all => 모든 프로미스 함수를 불러오면 각 값을 배열로 담아 실행 
// ex) 로그인한 유저 정보, 유저의 최근 구매기록, 구매한 상품정보와 같이 
// 여러 정보를 불러와야할 때, 코드를 간결하게 작성할 수 있음 

function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits);
}

pickAllFruits().then(fruits => console.log(`${fruits[1]} + ${fruits[0]}`));


// Promise.race => 여러 프로미스 함수 중 빠르게 리턴한 값만 출력
// ex) 분산형 DB시스템에서 값을 먼저 도출한 스레드에서 출력하고 나머지 정지 
// 분산형 시스템에서 성능을 높이기 위해 중요할듯!
function pickFastFruits() {
  return Promise.race([getApple(), getBanana()])
    .then(fruit => fruit);
}

pickFastFruits().then(console.log);