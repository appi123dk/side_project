import { useState } from "react";

function Todo(){
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function onChange(e){
    setTodo(e.target.value);
  }

  function onKeyUp(e){
    if (e.keyCode === 13){
      setTodo(e.target.value);

      if (todo === ""){
        alert("할 일을 입력하세요");
        return;
      } else {
        setTodos(currentArr => [todo, ...currentArr]);
        setTodo("");
      }
    };
  }

  return (
    <div>
      <h1>My Todo App ({todos.length}개)</h1>
      <input type="text" placeholder='할 일을 적어주세요' value={todo} onKeyUp={onKeyUp} onChange={onChange}/>
      <ul>
        {todos.map((elem, index) => (<li key={index}>{elem}</li>))}
      </ul>
    </div>
  )
}

export default Todo;