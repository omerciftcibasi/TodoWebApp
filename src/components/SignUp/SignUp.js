import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

import { connect } from "react-redux";
import _ from 'lodash'
import { useMutation } from '@apollo/react-hooks'
import mutations from "../../graphql/mutations";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The email must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

  const SignUp = (props) =>
  {
    const [singUp] = useMutation(mutations.signUp)
    const { history } = props;
    const [state, setState] = useState({
      name: "",
      email: "",
      password: ""
    });
   

    return (
      <div className="Rectangle LoginRectangle">
      <img src="/image/group.svg" className="Group"></img>
      <div>
      <span className="Todo-List">
      Welcome!
            </span>  
      <div className="PageDescription">Sign up to start using Simpledo today.</div>
      <Form      onSubmit={e => {
        e.preventDefault();
      }}>
         <Input
              type="text"
              className="TodoInput BoardInput"
              value={state.name}
              name="name"
              onChange={(e)=> {state.name = e.target.value}}
              placeholder="Full Name"
            />

            <Input
              type="text"
              className="TodoInput"
              value={state.email}
              name="email"
              onChange={(e)=> {state.email = e.target.value}}
              placeholder="Email"
            />
            

            <Input
              type="password"
              className="TodoInput"
              value={state.password}
              name="password"
              onChange={(e)=> {state.password = e.target.value}}
              placeholder="Password"
            />
            <div className="LoginLink"  onClick={() => { history.push("/login");}}>
            Do have an account? Sign in.            </div>
            <button
              className="LoginButton"
              onClick={()=>{

                singUp({
                  variables: { input: state }
                }).then((x)=> {   
                  if (!_.isEmpty(x.data.signUp.errors)) return

                 history.push('/login')

                }).catch((err) => {
                  alert(err)
                })

              
              }}  
            >
Sign Up            </button>
        </Form>
      </div>

    </div>

    );
  }

function mapStateToProps(state) {
  const { message } = state.message;
  const { user } = state.auth;

  return {
    message
  };
}

export default connect(mapStateToProps)(SignUp);
