import React, { useState } from "react";

const TodoItem = ({ index, todo, updateTodoFn, removeTodoFn }) => {
  const removeTodo = () => {
    removeTodoFn(todo);
  };
  const [state, setState] = useState({
    showDeleteButton : false
  });

  const toggleTodo = () => { 
    updateTodoFn(todo)
  };



  return (
    <div className="d-flex justify-content-between" onMouseOver={(ev) => { setState({    
      showDeleteButton : true
    })}}
    onMouseOut={(ev) => { setState({    
      showDeleteButton : false
    })}}
    
    >
     <div className="TodoItemWrapper">
          <input
            checked={todo.isCompleted}
            type="checkbox"
            className="CheckBox"
            id={todo.id}
            onChange={toggleTodo}
          />
          <span className="TodoItem">{todo.title}</span>
        </div>

      <div className={state.showDeleteButton ? 'TodoItemWrapper' : 'Hide'} onClick={removeTodo}>
      <img src="/image/path-copy.svg" className="PathCopy"></img>
      </div>
    </div>
  );
};

export default TodoItem;

