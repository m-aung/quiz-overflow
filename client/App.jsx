import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthContainer from './containers/AuthContainer';
import CardContainer from './containers/CardContainer';
import * as authActions from './actions/authActions';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginStatus: (bool) => dispatch(authActions.changeLoginStatus(bool)),
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('App componentDidMount fired...');
    fetch('/check-session')
      .then((res) => res.json())
      .then((bool) => {
        this.props.changeLoginStatus(bool);
      })
      .catch((err) => console.log(err));
  }

  render() {
    // console.log('App render fired...');
    const auth = this.props.loggedIn ? <CardContainer /> : <AuthContainer />;
    return <div className="mainContainer">{auth}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
