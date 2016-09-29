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
    };
    const nextState = authReducer(undefined, '');
    expect(nextState).toEqual(initState);
  });

  it('handles LOGIN_FAILURE action', () => {
    const currState = {
      errMsg: 'no error',
      isAuthenticated: false,
      isFetching: true,
    };
    const loginFailureAction = {
      type: LOGIN_FAILURE,
      errMsg: 'test errMsg',
    };
    const expState = {
      errMsg: 'test errMsg',
      isAuthenticated: false,
      isFetching: false,
    };
    const nextState = authReducer(currState, loginFailureAction);
    expect(nextState).toEqual(expState);
  });

  it('handles LOGIN_REQUEST action', () => {
    const currState = {
      errMsg: 'prev error',
      isAuthenticated: false,
      isFetching: false,
    };
    const loginRequestAction = { type: LOGIN_REQUEST };
    const expState = {
      errMsg: '',
      isAuthenticated: false,
      isFetching: true,
    };
    const nextState = authReducer(currState, loginRequestAction);
    expect(nextState).toEqual(expState);
  });

  it('handles LOGIN_SUCCESS action', () => {
    const currState = {
      errMsg: 'prev error',
      isAuthenticated: false,
      isFetching: true,
    };
    const loginSuccessAction = {
      type: LOGIN_SUCCESS,
    };
    const expState = {
      errMsg: '',
      isAuthenticated: true,
      isFetching: false,
    };
    const nextState = authReducer(currState, loginSuccessAction);
    expect(nextState).toEqual(expState);
  });
});
