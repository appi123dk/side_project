const form = document.querySelector("#form");
const items = document.querySelector(".items");
const del_btn = document.querySelectorAll(".item__delete");

function createList(e){
    e.preventDefault();
    const input = document.querySelector(".footer__input");
    const input_value = input.value;

    if (input_value === "") {
        alert("빈칸은 입력할 수 없습니다");
    } else {
        makeItem(input_value);
    }
    input.value = "";
    input.focus();
}

/*
 쇼핑 아이템을 만든 후 리스트 내역에 추가하는 함수 
 일일히 element를 만드는 것보다 반복적인 내용을 innerHTML 로 구현 
 아이템을 만들고 나면 스크롤을 하단으로 이동하여 user-friendly하게 구현 
*/

function makeItem(input_value){
    const li = document.createElement("li");
    li.classList.add("item__row");
    li.innerHTML = `
        <div class="item">
            <span class="item__name">${input_value}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `;
    items.appendChild(li);
    const btn_delete = li.childNodes[1].children[1];
    // btn_delete.addEventListener("click", deleteList);
    li.scrollIntoView();
}

function deleteList(e) {
    console.log(e);
    if(e.target.tagName === 'I'){
        e.path[3].remove();
    };
}

// del_btn.forEach((item, index) => {
//     item.addEventListener("click", deleteList);
// })


items.addEventListener("click",deleteList);
form.addEventListener("submit", createList);