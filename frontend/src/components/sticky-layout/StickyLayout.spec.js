/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./StickyLayout.jsx');
const stickyLayoutModule = require('./StickyLayout.jsx');
const StickyLayout = stickyLayoutModule.StickyLayout;
let pageMapping = stickyLayoutModule.pageMapping;
jest.dontMock('../footer/Footer.jsx');
const Footer = require('../footer/Footer.jsx').default;

describe('StickyLayout react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  // add to pageMapping so that React.createElement does not complain about not receiving an element/component
  pageMapping.randomPagey = 'heading';
  shallowRenderer.render(<StickyLayout currentPage='randomPagey'/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div with two children', () => {
    expect(result.type).toBe('div');
    expect(React.Children.count(result.props.children)).toEqual(2);
  });

  describe('the first child', () => {
    const firstChild = result.props.children[0];
    it('is a div with correct css classes', () => {
      expect(firstChild.type).toBe('div');
      expect(firstChild.props.className).toEqual('sticky-layout--body');
    });
    it('has a child that corresponds to pageMapping', () => {
      let childOfChild = React.Children.only(firstChild.props.children);
      expect(childOfChild.type).toBe('heading');

      pageMapping.random2 = 'body';
      // chg the prop to get it to re-render
      shallowRenderer.render(<StickyLayout currentPage='random2'/>);
      childOfChild = React.Children.only(shallowRenderer.getRenderOutput().props.children[0].props.children);
      expect(childOfChild.type).toBe('body');
    });
  });

  describe('the second child', () => {
    const secondChild = result.props.children[1];
    it('is a div with correct css classes', () => {
      expect(secondChild.type).toBe('div');
      expect(secondChild.props.className).toEqual('sticky-layout--footer');
    });
    it('contains a single Footer with the necessary props', () => {
      const footer = React.Children.only(secondChild.props.children);
      expect(footer.type).toEqual(Footer);
    });
  });

  it('has the correct propTypes for validation', () => {
    const expectedPropTypes = [ 'currentPage' ];
    R.forEach(
      prop => expect(R.has(prop)(StickyLayout.propTypes)).toBe(true),
      expectedPropTypes
    );
  });

  it('is wrapped by a redux smart container', () => {
    expect(stickyLayoutModule.default).not.toBe(StickyLayout);
    expect(stickyLayoutModule.default.WrappedComponent).toBe(StickyLayout);
  });
});

describe('StickyLayout redux container', () => {
  describe('reducer', () => {});
  describe('additional state props', () => {});
  describe('additional dispatch props', () => {});
});
