/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./StickyLayout.jsx');
import StickyLayout from './StickyLayout.jsx';
import Footer from '../footer/Footer.jsx';

describe('StickyLayout react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<StickyLayout />);
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
    const expectedPropTypes = [ 'children' ];
    R.forEach(
      prop => expect(R.has(prop)(StickyLayout.propTypes)).toBe(true),
      expectedPropTypes
    );
  });
});
