// const title = document.getElementById("title")
const title = document.querySelector("#title")

title.style.color = "black";
document.title = "Here we go"

// dom 객체의 함수를 볼 수 있음
console.dir(title);



// Event 호출하는 3가지 방법 

// 1. 함수 정의 후 이벤트 호출
function handleResize(e){
    console.log(`width: ${e.target.innerWidth}, height: ${e.target.innerHeight}`);
}

window.addEventListener("resize", handleResize);

// 2. 이벤트 호출 시 함수 바로 적용 (function)
window.addEventListener("click", function(){
    title.style.color = "red";
    document.getEle
});

// 3. 2번과 동일 (arrow function)
// window.addEventListener("mouseover", (e) => {
//     if(e.target.style.color == "red"){
//         e.target.style.color = "yellow";
//     } else {
//         e.target.style.color = "red";
//     }
    
// });


// 새로운 이벤트를 학습해보자
function handleOffline() {
    console.log("오프라인 상태입니다")
}

function handleOnline() {
    console.log("인터넷에 연결되었습니다. 페이지를 새로고침합니다");
    window.location.reload();
}

window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);

function clickAddClass(e){
    e.target.classList.add('font-turquise');
}

window.addEventListener("click", clickAddClass);