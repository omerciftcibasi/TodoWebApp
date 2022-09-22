import React from "react";

const TodoInput = ({ addTodoFn }) => {
  const addTodoHandler = event => {
    if (event.key === 'Enter') {
      console.log(event.target.value);

      addTodoFn(event.target.value);
    }
  
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <input className="TodoInput LineCopy TodoBoardInput" placeholder="Add a new todo" onKeyDown={(e) => {addTodoHandler(e)}}/>

    </form>
  );
};

export default TodoInput;
