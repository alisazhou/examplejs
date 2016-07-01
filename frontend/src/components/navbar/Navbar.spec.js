import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./Navbar.jsx');
import WrappedBar, { Navbar } from './Navbar.jsx';
import AuthBlock from './AuthBlock.jsx';
import ProfileButton from './ProfileButton.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


describe('Navbar dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const PROPS_FROM_REDUX = { isAuthenticated: false };

  it('renders to a div', () => {
    shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.type).toBe('div');
  });

  describe('when user is not authenticated', () => {
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

    it('has one ProfileButton component', () => {
      expect(result.props.children.type).toBe(ProfileButton);
    });
  });
});


describe('Navbar smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedBar).not.toBe(Navbar);
    expect(WrappedBar.WrappedComponent).toBe(Navbar);
    expect(WrappedBar.displayName).toBe('Connect(Navbar)');
  });

  it('receives authenticated status from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedBar store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.isAuthenticated).toBeDefined();
  });
});
