/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Todo from './components/Todo/Todo';

import apolloClient from './apolloClient';
import { logout } from './actions/auth';
import { history } from './helpers/history';

const App = (props) => {
  const currentUser = props.user;

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter history={history}>
        <div>
        { currentUser && (
          <div className="LogoutWrapper">
            <span className="Logout" onClick={() => { props.dispatch(logout()); }}>
              Logout
            </span>
          </div>
        )}

          <div className="row d-flex justify-content-center">
            <Switch>
              <Route exact path={['/', '/todo']} component={Todo} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      </ApolloProvider>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
