import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./AuthBlock.jsx');
import AuthBlock from './AuthBlock.jsx';
import AuthButton from './AuthButton.jsx';


describe('AuthBlock dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<AuthBlock />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  describe('the child components', () => {
    const authButtons = result.props.children.filter(
      child => child.type === AuthButton
    );

    it('has two AuthButton child components', () => {
      expect(authButtons.length).toEqual(2);
    });

    it('first AuthButton is for signup', () => {
      const signup = authButtons[0];
      expect(signup.props.linkTo).toBe('/signup/');
      expect(signup.props.className).toBe('signup_btn');
      expect(signup.props.content).toBe('Sign up');
    });

    it('second AuthButton is for login', () => {
      const login = authButtons[1];
      expect(login.props.linkTo).toBe('/login/');
      expect(login.props.className).toBe('login_btn');
      expect(login.props.content).toBe('Log in');
    });
  });

});
