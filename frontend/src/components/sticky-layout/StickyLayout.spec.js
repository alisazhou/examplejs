/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./StickyLayout.jsx');
import WrappedLayout, { StickyLayout, pageMapping } from './StickyLayout.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent');
import Footer from '../footer/Footer.jsx';

describe('StickyLayout react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  // add to pageMapping so that React.createElement does not complain about not receiving an element/component
  pageMapping.set('randomPagey', 'heading');
  shallowRenderer.render(<StickyLayout currentPage='randomPagey'/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div with two children', () => {
    expect(result.type).toBe('div');
    expect(React.Children.count(result.props.children)).toEqual(2);
  });

  describe('the first child', () => {
    const firstChild = result.props.children[0];
    it('is a div', () => {
      expect(firstChild.type).toBe('div');
    });
    it('has the correct css classes', () => {
      expect(firstChild.props.className).toEqual('sticky-layout--body');
    });
    it('has a single child', () => {
      React.Children.only(firstChild.props.children);
    });
    it('has a child with wrappee type corresponds to pageMap', () => {
      let childOfChild = React.Children.only(firstChild.props.children);
      expect(childOfChild.type).toBe('heading');

      // chg the prop and re-render
      pageMapping.set('random2', 'body');
      // need a new renderer (otherwise it appends to old render)
      const shallowRenderer = TestUtils.createRenderer();
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

  it('is wrapped by a redux connect', () => {
    expect(WrappedLayout).not.toBe(StickyLayout);
    expect(WrappedLayout.WrappedComponent).toBe(StickyLayout);
    expect(WrappedLayout.displayName).toBe('Connect(StickyLayout)');
  });
});
