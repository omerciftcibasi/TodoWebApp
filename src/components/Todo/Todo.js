import React from "react";
import { Redirect } from 'react-router-dom';

import TodoList from "./TodoList";
import { connect } from "react-redux";

const Todo = (props) => {
  var currentUser = props.user;

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
