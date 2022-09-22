/* eslint-disable consistent-return */
import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import mutations from '../../graphql/mutations';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert validation" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert validation" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert validation" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const SignUp = (props) => {
  const [singUp] = useMutation(mutations.signUp);
  const { history } = props;
  const [state] = useState({
    name: '',
    email: '',
    password: ''
  });

  let formRef = useRef(null);
  let checkBtn = useRef(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    formRef.validateAll();
    // eslint-disable-next-line no-underscore-dangle
    if (checkBtn.context._errors.length === 0) {
      singUp({
        variables: { input: state }
      }).then((x) => {
        if (!_.isEmpty(x.data.signUp.errors)) return;

        history.push('/login');
      }).catch((err) => {
        alert(err);
      });
    }
  };

  return (
      <div className="Rectangle LoginRectangle">
      <img src="/image/group.svg" className="Group"></img>
      <div>
      <span className="Todo-List">
      Welcome!
      </span>
      <div className="PageDescription">Sign up to start using Simpledo today.</div>
      <Form onSubmit={handleSignUp}
      autoComplete="off"
      ref={(c) => {
        formRef = c;
      }}>
         <Input
              type="text"
              className="TodoInput BoardInput"
              value={state.name}
              name="name"
              onChange={(e) => { state.name = e.target.value; }}
              placeholder="Full Name"
              validations={[required]}

            />

          <Input
              type="text"
              className="TodoInput"
              value={state.email}
              name="email"
              onChange={(e) => { state.email = e.target.value; }}
              placeholder="Email"
              validations={[required, email]}

            />

            <Input
              type="password"
              className="TodoInput"
              value={state.password}
              name="password"
              onChange={(e) => { state.password = e.target.value; }}
              placeholder="Password"
              validations={[required, vpassword]}
            />
            <div className="LoginLink" onClick={() => { history.push('/login'); }}>
            Do have an account? Sign in.
            </div>
            <button className="LoginButton">
            Sign Up
            </button>
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                checkBtn = c;
              }}
            />
        </Form>
      </div>

    </div>

  );
};

export default connect()(withRouter((SignUp)));
