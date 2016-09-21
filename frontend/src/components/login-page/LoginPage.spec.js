import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./LoginPage.jsx');
import LoginPage from './LoginPage.jsx';
import LoginForm from './LoginForm.jsx';


describe('LoginPage dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<LoginPage />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a LoginForm child', () => {
    const loginForm = findInTree(result, LoginForm)[0];
    expect(loginForm).toBeDefined();
  });
});
