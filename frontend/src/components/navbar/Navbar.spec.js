import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./Navbar.jsx');
import WrappedBar, { Navbar } from './Navbar.jsx';
import AuthBlock from './AuthBlock.jsx';
import ProfileButton from './ProfileButton.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


describe('Navbar dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const PROPS_FROM_REDUX = { isAuthenticated: false };
  shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a single div with class name navbar', () => {
    expect(result.type).toBe('div');
    expect(result.props.className).toBe('navbar');
  });

  const resultButtons = React.Children.only(result.props.children);
  it('has one child div with classname navbar-buttons', () => {
    expect(resultButtons.type).toBe('div');
    expect(resultButtons.props.className).toBe('navbar-buttons');
  });

  describe('navbar-buttons', () => {
    it('has a navbar-buttons__home-div', () => {
      const homeButton = resultButtons.props.children[0];
      expect(homeButton.type).toBe('div');
      expect(homeButton.props.className).toBe('navbar-buttons__home-div');
    });
    it('has a navbar-buttons__title-div', () => {
      const titleDiv = resultButtons.props.children[1];
      expect(titleDiv.type).toBe('div');
      expect(titleDiv.props.className).toBe('navbar-buttons__title-div');
    });
    it('renders navbar-buttons__title-btn if there is props.title', () => {
      shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} title='titleman'/>);
      const result = shallowRenderer.getRenderOutput();
      const titleButton = findInTree(
        result, 'button', { className: 'navbar-buttons__title-btn' }
      );
      expect(titleButton.props).toBeDefined();
      const buttonText = React.Children.only(result.props.children);
      expect(buttonText).toBe('titleman');
    });
    it('does not render navbar-buttons__title-btn if props.title is undefined', () => {
      const titleButton = findInTree(
        resultButtons, 'button', { className: 'navbar-buttons__title-btn' }
      );
      expect(titleButton).toEqual([]);
    });

    it('has one AuthBlock component when not authenticated', () => {
      expect(resultButtons).toHaveChild(AuthBlock);
    });

    it('has one ProfileButton component when authenticated', () => {
      const PROPS_FROM_REDUX = { isAuthenticated: true };
      shallowRenderer.render(<Navbar {...PROPS_FROM_REDUX} />);
      const result = shallowRenderer.getRenderOutput();
      const resultButtons = React.Children.only(result.props.children);
      expect(resultButtons).toHaveChild(ProfileButton);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'isAuthenticated', 'title' ];
    R.forEach(
      prop => expect(R.has(prop)(Navbar.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(Navbar.propTypes).length).toEqual(expectedPropTypes.length);
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
