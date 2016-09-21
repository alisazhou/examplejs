import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./LoginForm.jsx');
import RdxFormConnectedForm, { LoginForm } from './LoginForm.jsx';


describe('LoginForm dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<LoginForm />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has a Field child for email', () => {
    const email = findInTree(result, Field, { name: 'loginEmail' })[0];
    expect(email).toBeDefined();
    expect(email.props.displayError).toBe(true);
    expect(email.props.label).toBe('Email address:');
    expect(email.props.type).toBe('email');
  });

  it('has a Field child for password', () => {
    const password = findInTree(result, Field, { name: 'loginPassword' })[0];
    expect(password).toBeDefined();
    expect(password.props.displayError).toBe(true);
    expect(password.props.label).toBe('Password:');
    expect(password.props.type).toBe('password');
  });

  it('has a link to reset password', () => {
    const resetLink = findInTree(result, Link)[0];
    expect(resetLink).toBeDefined();
    expect(resetLink.props.to).toBe('/reset/');
  });
});


describe('Redux Form connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(RdxFormConnectedForm.name).toBe('ReduxForm');
  });
});
