import React from 'react';
import { connect } from 'react-redux';
import AuthContainer from './AuthContainer';
import CardContainer from './CardContainer';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const MainContainer = props => {
  const auth = props.loggedIn ? (
    <CardContainer />
  ) : (
    <AuthContainer />
  );

  return <div className="mainContainer">{auth}</div>;

};

export default connect(mapStateToProps)(MainContainer);
