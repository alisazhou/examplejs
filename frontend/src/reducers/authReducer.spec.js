jest.mock('./authReducerInitialState.js');
import authReducer from './authReducer.js';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from '../actions/actionTypes.js';


describe('authReducer', () => {
  it('initializes state', () => {
    const initState = {
      errMsg: '',
      isAuthenticated: false,
      isFetching: false,
      token: '',
    };
    const nextState = authReducer(undefined, '');
    expect(nextState).toEqual(initState);
  });

  it('handles LOGIN_FAILURE action', () => {
    const currState = {
      errMsg: 'no error',
      isAuthenticated: false,
      isFetching: true,
      token: '',
    };
    const loginFailureAction = {
      type: LOGIN_FAILURE,
      errMsg: 'test errMsg',
    };
    const expState = {
      errMsg: 'test errMsg',
      isAuthenticated: false,
      isFetching: false,
      token: '',
    };
    const nextState = authReducer(currState, loginFailureAction);
    expect(nextState).toEqual(expState);
  });

  it('handles LOGIN_REQUEST action', () => {
    const currState = {
      errMsg: 'prev error',
      isAuthenticated: false,
      isFetching: false,
      token: '',
    };
    const loginRequestAction = { type: LOGIN_REQUEST };
    const expState = {
      errMsg: '',
      isAuthenticated: false,
      isFetching: true,
      token: '',
    };
    const nextState = authReducer(currState, loginRequestAction);
    expect(nextState).toEqual(expState);
  });

  it('handles LOGIN_SUCCESS action', () => {
    const currState = {
      errMsg: 'prev error',
      isAuthenticated: false,
      isFetching: true,
      token: '',
    };
    const loginSuccessAction = {
      type: LOGIN_SUCCESS,
      token: 'test token',
    };
    const expState = {
      errMsg: '',
      isAuthenticated: true,
      isFetching: false,
      token: 'test token',
    };
    const nextState = authReducer(currState, loginSuccessAction);
    expect(nextState).toEqual(expState);
  });
});
