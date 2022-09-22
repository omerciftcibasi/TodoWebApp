/* eslint-disable react/prop-types */
import React from 'react';

const TodoInput = ({ addTodoFn }) => {
  const addTodoHandler = (event) => {
    if (event.key === 'Enter') {
      addTodoFn(event.target.value);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input className="TodoInput LineCopy TodoBoardInput" placeholder="Add a new todo" onKeyDown={(e) => { addTodoHandler(e); }}/>

    </form>
  );
};

export default TodoInput;
