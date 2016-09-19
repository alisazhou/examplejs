import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./NotFound.jsx');
import NotFound from './NotFound.jsx';
import Navbar from '../navbar/Navbar.jsx';


describe('NotFound dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<NotFound />);
  const result = shallowRenderer.getRenderOutput();

  it('renders for a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Navbar child component', () => {
    const navbar = findInTree(result, Navbar)[0];
    expect(navbar).toBeDefined();
  });

  it('has error message', () => {
    const msg = findInTree(result, 'p')[0];
    expect(msg).toBeDefined();
    expect(msg.props.children).toBe('Nothing to see here...');
  });
});
