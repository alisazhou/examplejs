/* eslint-env jest */
import {
  loginFailure, loginRequest, loginSuccess,
} from './loginActions.js';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from './actionTypes.js';


describe('synchronous action creators', () => {
  describe('loginFailure action creator', () => {
    it('should create LOGIN_FAILURE action', () => {
      const errMsg = 'errMsg0';
      const expAction = {
        type: LOGIN_FAILURE,
        errMsg,
      };
      const actualAction = loginFailure(errMsg);
      expect(actualAction).toEqual(expAction);
    });
  });

  describe('loginRequest action creator', () => {
    it('should create LOGIN_REQUEST action', () => {
      const creds = {
        username: 'username0',
        password: 'password0',
      };
      const expAction = {
        type: LOGIN_REQUEST,
      };
      const actualAction = loginRequest(creds);
      expect(actualAction).toEqual(expAction);
    });
  });

  describe('loginSuccess action creator', () => {
    it('should create LOGIN_SUCCESS action', () => {
      const user = { token: 'token0' };
      const expAction = {
        type: LOGIN_SUCCESS,
        token: 'token0',
      };
      const actualAction = loginSuccess(user);
      expect(actualAction).toEqual(expAction);
    });
  });

});
