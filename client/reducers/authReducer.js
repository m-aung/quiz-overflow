import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  message: null,
  showSignup: false,
  loginFailure: false,
  err: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_LOGIN_SUCCESS: {
      console.log('authReducer:POST_LOGIN_SUCCESS');
      const { loggedIn, message, loginFailure } = action.payload;
      return {
        ...state,
        loggedIn,
        message,
        loginFailure,
      };
    }
    case types.POST_LOGIN_FAILURE: {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    case types.POST_SIGNUP_REQUEST: {
      return {
        ...state,
      };
    }
    case types.POST_SIGNUP_SUCCESS: {
      const { loggedIn, message, loginFailure } = action.payload;
      return {
        ...state,
        loggedIn,
        message,
        loginFailure,
      };
    }
    case types.POST_SIGNUP_FAILURE: {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    case types.SHOW_SIGNUP: {
      return {
        ...state,
        showSignup: action.payload,
      };
    }
    case types.LOGIN_STATUS: {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
