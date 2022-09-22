import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { loginSuccess } from '../../actions/auth';
import mutations from '../../graphql/mutations';

const Login = (props) => {
  const [login] = useMutation(mutations.login);
  const {
    isLoggedIn, history, dispatch
  } = props;

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const loginInput = {
    email: '',
    password: ''
  };

  return (

      <div className="Rectangle LoginRectangle">
      <img src="/image/group.svg" className="Group"></img>
      <div>
      <span className="Todo-List">
      Welcome back!
      </span>
      <div className="PageDescription">Log in to continue.</div>
      <Form onSubmit={(e) => {
        e.preventDefault();
      }}>
            <Input
              type="text"
              className="TodoInput BoardInput"
              name="email"
              onChange={(e) => { loginInput.email = e.target.value; }}
              placeholder="Email"
            />

            <Input
              type="password"
              className="TodoInput"
              name="password"
              onChange={(e) => { loginInput.password = e.target.value; }}
              placeholder="Password"
            />
            <div className="LoginLink" onClick={() => { history.push('/signUp'); }}>
            Don’t have an account? Sign up.
            </div>
            <button
              className="LoginButton"
              onClick={() => {
                login({
                  variables: { input: loginInput }
                })
                  .then((x) => {
                    dispatch(loginSuccess(x.data.login)).then(() => {
                      history.replace('/todo');
                    });
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Login
            </button>
        </Form>
      </div>

    </div>
  );
};

export default connect()(withRouter((Login)));
