const form = document.querySelector(".js-form"),
      input = form.querySelector(".js-input"),
      greet = document.querySelector("p");

const USER_LS = "currentUser"

function handleSubmit(event){
    event.preventDefault();
    const input_name = input.value;
    localStorage.setItem(USER_LS, input_name);
    loadName();
}

function printGreet(name){
    if (name === null) {
        return "첫 방문이시군요, 아래에 이름을 입력해주세요"
    } else {
        return `안녕하세요 ${name}님, \n 오늘도 좋은 하루 되세요`;
    }
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        form.addEventListener("submit", handleSubmit);
    } else {
        form.classList.add('disappear');
        setTimeout(() => {
            form.classList.add('hide'); 
        }, 1000);
    }
    greet.innerText = printGreet(currentUser);
}

(function () {
   loadName();

})();