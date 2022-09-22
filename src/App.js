import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from '@apollo/client'

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Todo from "./components/Todo/Todo";

import apolloClient from './apolloClient'
import { logout } from "./actions/auth";
import { history } from './helpers/history';



  const App = (props) => {
      var currentUser = props.user;

    return (
    <ApolloProvider client={apolloClient}>

      <Router history={history}>
        <div>
        { currentUser && (
          <div className="LogoutWrapper">

          
            <span className="Logout" onClick={() => { props.dispatch(logout()) }}>

                    Logout
                 </span></div>)}
                 
          <div className="row d-flex justify-content-center">

         
            <Switch>
              <Route exact path={["/", "/todo"]} component={Todo} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </Router>
      </ApolloProvider>
    );
  }

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
