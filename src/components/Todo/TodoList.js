/* eslint-disable no-use-before-define */
import React, { useState, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import queries from '../../graphql/queries';
import mutations from '../../graphql/mutations';

const TodoList = () => {
  const [state, setState] = useState({
    filter: 'all',
    todos: [
    ]
  });

  const [createTodo] = useMutation(mutations.createTodo, {
    onCompleted() {
      refetch();
    }
  });
  const [deleteTodo] = useMutation(mutations.deleteTodo, {
    onCompleted() {
      refetch();
    }
  });
  const [updateTodo] = useMutation(mutations.updateTodo, {
    onCompleted() {
      refetch();
    }
  });

  const {
    loading, error, data, refetch
  } = useQuery(queries);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const filterResults = (filter) => {
    setState({
      ...state,
      filter
    });
  };

  const updateTodoHandler = (todo) => {
    updateTodo({ variables: { id: todo.id, isCompleted: !todo.isCompleted } });
  };
  const removeTodoHandler = (todo) => {
    deleteTodo({ variables: { id: todo.id } });
  };

  const addTodoHandler = (title) => {
    createTodo({ variables: { input: title } });
  };
  state.todos = data ? data.listTodos : [];

  let filteredTodos = state.todos;
  if (state.filter === 'active') {
    filteredTodos = state.todos.filter((todo) => todo.isCompleted !== true);
  } else if (state.filter === 'completed') {
    filteredTodos = state.todos.filter((todo) => todo.isCompleted === true);
  }

  const todoList = [];
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem
      key={index}
      index={index}
      todo={todo}
      updateTodoFn={updateTodoHandler}
      removeTodoFn={removeTodoHandler}
      />);
  });

  return (

<div>
<TodoInput addTodoFn={addTodoHandler}
 />

    <Fragment>

{ <div>{todoList}</div> }

    </Fragment>

{ <div><TodoFilters
  todos={filteredTodos}
  currentFilter={state.filter}
  filterResultsFn={filterResults}
/> </div> }
</div>

  );
};

export default TodoList;
