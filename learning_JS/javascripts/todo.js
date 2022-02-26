const todo_form = document.querySelector(".js-todo-form"),
      todo_input = todo_form.querySelector(".todo-input"),
      todo_ul = document.querySelector(".todo-ul");



function saveTodoList(){
    const old_todo_list = JSON.parse(localStorage.getItem("todo-list")),
          old_todo_len = old_todo_list === null || old_todo_list.length == 0 ? 1 : parseInt(old_todo_list[0].id) + 1,
          new_todo_obj = {
              todo: todo_input.value,
              id: old_todo_len
          };

    let   new_todo_list = [];

    if (old_todo_list === null){
        new_todo_list.push(new_todo_obj);
    } else {
        old_todo_list.unshift(new_todo_obj);
        new_todo_list = old_todo_list;
        console.log(old_todo_list);
    }

    // console.log(new_todo_list);

    localStorage.setItem("todo-list", JSON.stringify(new_todo_list));
    return new_todo_list
}


function handleSubmit(event){
    event.preventDefault();
    const text = todo_input.value,
          new_todo_list = saveTodoList(text);
    printTodoList(new_todo_list);
}

function printTodoList(todo_list){
    const li = document.createElement("li"),
          todo_id = todo_list[0].id,
          delBtn = document.createElement("button");
    
          delBtn.innerHTML = "❌";

    if (todo_list === null){
        li.appendChild(delBtn);
        li.appendChild(document.createTextNode("리스트가 없습니다"));
        todo_ul.appendChild(li);
        
    } else {
        delBtn.value = todo_id;
        li.appendChild(delBtn);
        li.id = todo_id;
        li.appendChild(document.createTextNode(todo_list[0].todo));
        todo_ul.insertBefore(li, todo_ul.firstChild);
        todo_input.value = "";
        delBtn.addEventListener("click", removeTodo);
    }
}

function printAllTodo(item, index){
    const li = document.createElement("li"),
          delBtn = document.createElement("button");
    
          delBtn.innerHTML = "❌";
          delBtn.value = item.id;


    li.appendChild(delBtn);
    li.id = item.id;
    li.appendChild(document.createTextNode(item.todo));
    
    todo_ul.appendChild(li);
    delBtn.addEventListener("click", removeTodo);
}

function removeTodo(event) {
    event.target.parentNode.remove();
    let todo_list = JSON.parse(localStorage.getItem("todo-list"));
    const index = todo_list.findIndex(todo => todo.id == event.target.value);
    todo_list.splice(index, 1);
    
    localStorage.setItem("todo-list", JSON.stringify(todo_list));

}

function loadTodo(){
    const todo_list = JSON.parse(localStorage.getItem("todo-list"));
    if (todo_list !== null) {
        todo_list.forEach(printAllTodo);
    } 
    todo_form.addEventListener("submit", handleSubmit); 
};

(function () {
    loadTodo();
 })();