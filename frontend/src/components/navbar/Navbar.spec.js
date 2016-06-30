/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./Navbar.jsx');
import Navbar from './Navbar.jsx';
import AuthBlock from './AuthBlock.jsx';


describe('Navbar dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();

  it('renders to a div', () => {
    shallowRenderer.render(<Navbar />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.type).toBe('div');
  });

  describe('when user is not authenticated', () => {
    const PROPS_FROM_REDUX = { isAuthenticated: false };
    shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} />);
    const result = shallowRenderer.getRenderOutput();

    it('has an AuthBlock child component', () => {
      expect(result.props.children.type).toBe(AuthBlock);
    });

  });

  describe('when user is authenticated', () => {
    const PROPS_FROM_REDUX = { isAuthenticated: true };
    shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} />);
    const result = shallowRenderer.getRenderOutput();

    xit('has one ProfileButton component', () => {
    });
  });

});
