import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import TodoList from './TodoList';

const Todo = (props) => {
  const currentUser = props.user;

  if (!currentUser) {
    return <Redirect to="/signUp" />;
  }
  return (
<div className="Rectangle">
      <img src="/image/group.svg" className="Group"></img>
      <div>
      <span className="Todo-List">
        Todo List
      </span>
      <TodoList />
      </div>

    </div>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Todo);
