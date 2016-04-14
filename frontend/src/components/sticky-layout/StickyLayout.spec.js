/*eslint-env jest */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./StickyLayout.jsx');
const StickyLayout = require('./StickyLayout.jsx').default;
jest.dontMock('../intro-page/IntroPage.jsx');
const IntroPage = require('../intro-page/IntroPage.jsx').default;
jest.dontMock('./StickyFooter.jsx');
const StickyFooter = require('./StickyFooter.jsx').default;

describe('StickyLayout react component', () => {
  describe('shallow rendering tests', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<StickyLayout/>);
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
      it('contains a visible IntroPage', () => {
        const childOfChild = React.Children.only(firstChild.props.children);
        expect(childOfChild.type).toEqual(IntroPage);
        expect(childOfChild.props.visible).toEqual(true);
        // expect(onlyChild).toEqual(<StickyBody/>);
      });
    });

    describe('the second child', () => {
      it('is a StickyFooter', () => {
        const secondChild = result.props.children[1];
        expect(secondChild.type).toEqual(StickyFooter);
      });
    });
  });

  describe('deep rendering tests', () => {
    const renderedStickyLayout = TestUtils.renderIntoDocument(<StickyLayout/>);
    it('is initialized with currentPage at introPage', () => {
      expect(renderedStickyLayout.state.currentPage).toEqual('intro');
    });
  });
});
