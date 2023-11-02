import React, { useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";

function App() {
  const currentList = JSON.parse(localStorage.getItem("todos")) ?? [];
  const [todoList, setTodoList] = useState(currentList);
  const inputTodo = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodoList([...todoList, inputTodo.current.value]);
    inputTodo.current.value = "";
  };

  const handleRemoveItem = (todoToRemove) => {
    setTodoList(() => todoList.filter((todo) => todo !== todoToRemove));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputTodo} required />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todoList.length > 0 ? (
          todoList.map((todo) => (
            <li key={todo}>
              {todo}
              <button onClick={(event) => handleRemoveItem(todo)}>X</button>
            </li>
          ))
        ) : (
          <h4>No todos</h4>
        )}
      </ul>
    </div>
  );
}

export default App;
