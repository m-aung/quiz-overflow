import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import AuthContainer from './containers/AuthContainer';
import CardContainer from './containers/CardContainer';
import * as authActions from './actions/authActions';

const mapStateToProps = state => ({
  // from: the store
  // Current default: false
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  changeLoginStatus: bool => dispatch(authActions.changeLoginStatus(bool))
});

// Current Goal: on component did mount, check cookies for ssID
// check for a current action to fire to set loggedIn to true

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    console.log('component mounted!');
    const cookies = Cookies.get('ssid');
    console.log('cookie:', cookies);

    // if (cookie) //fire dispatch
    changeLoginStatus(cookies);
    
  }
  

  render() {
    const auth = this.props.loggedIn ? (<CardContainer />) : (<AuthContainer />);

  return (
    <div className="mainContainer">
    {auth}
    </div>
  );
  }
};

export default connect(mapStateToProps)(mapDispatchToProps)(App);
