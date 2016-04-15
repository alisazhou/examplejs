/*eslint-env jest */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./StickyLayout.jsx');
const StickyLayout = require('./StickyLayout.jsx').default;
jest.dontMock('../intro-page/IntroPage.jsx');
const IntroPage = require('../intro-page/IntroPage.jsx').default;
jest.dontMock('../contact-page/ContactPage.jsx');
const ContactPage = require('../contact-page/ContactPage.jsx').default;
jest.dontMock('../footer/Footer.jsx');
const Footer = require('../footer/Footer.jsx').default;

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
        const introPage = firstChild.props.children[0];
        expect(introPage.type).toEqual(IntroPage);
        expect(introPage.props.visible).toEqual(true);
      });
      it('contains an invisible ContactPage', () => {
        const contactPage = firstChild.props.children[1];
        expect(contactPage.type).toEqual(ContactPage);
        expect(contactPage.props.visible).toEqual(false);
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
        expect(footer.props.changeToContactPage).toBeDefined();
        expect(footer.props.changeToIntroPage).toBeDefined();
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
