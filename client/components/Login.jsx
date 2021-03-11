import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    if (e.target.id === 'signInBtn' || e.target.id === 'guest') {
      this.props.handleLogin(e);
    } else {
      this.props.handleSignUp(e);
    }
  }

  render() {
    // console.log('Login render fired...');
    const errorMsg = <span className="error">{this.props.message}</span>;
    const guestLogin = (
      <span className="guest" id="guest" onClick={this.onSubmit}>
        Play as Guest
      </span>
    );

    return (
      <div className="login">
        <form className="loginField">
          <input id="username" className="userName" placeholder="username..." type="text" />
          <br />
          <input id="password" className="password" placeholder="password..." type="password" />
          <br />
          <div className="loginButtons">
            <button id="signInBtn" className="signInBtn" onClick={this.onSubmit}>
              Log In
            </button>
            <button id="signUpBtn" className="signUpBtn" onClick={this.onSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <div className="loginFooter">
          {this.props.loginFailure ? errorMsg : guestLogin}
        </div>
      </div>
    );
  }
}

export default Login;
