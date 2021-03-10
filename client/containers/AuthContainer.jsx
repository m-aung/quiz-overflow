import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

import Login from '../components/Login';
import Signup from '../components/Signup';

const mapStateToProps = state => ({
  showSignup: state.auth.showSignup,
  message: state.auth.message,
  loginFailure: state.auth.loginFailure,
});

const mapDispatchToProps = dispatch => ({
  handleLogin: e => {
    e.preventDefault();
    e.persist();
    dispatch(
      actions.postLogin({
        username: e.target.children.username.value,
        password: e.target.children.password.value,
      })
    );
  },
  handleSignup: e => {
    e.preventDefault();
    e.persist();
    dispatch(
      actions.postSignup({
        username: e.target.children.username.value,
        password: e.target.children.password.value,
      })
    );
  },
  goToLogin: e => {
    e.preventDefault();
    e.persist();
    dispatch(actions.showSignup(false));
  },
  goToSignup: e => {
    e.preventDefault();
    e.persist();
    dispatch(actions.showSignup(true));
  },
});

class AuthContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let authForm = this.props.showSignup ? ( <Signup {...this.props} /> ) : ( <Login {...this.props} /> );
    return (
      <div className="authContainer">
      {authForm}
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
