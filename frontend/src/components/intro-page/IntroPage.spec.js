/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import R from 'ramda';

jest.unmock('./IntroPage.jsx');
import IntroPage from './IntroPage.jsx';
import MenuList from '../menu-list/MenuList.jsx';


describe('IntroPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Link component to reservation page', () => {
    const bookNowLink = R.find(R.propEq('type', Link))(result.props.children);
    expect(bookNowLink.props.to).toEqual('/reservation');
  });

  it('has a MenuList child component', () => {
    const menuList = R.find(R.propEq('type', MenuList))(result.props.children);
    expect(menuList).toBeDefined();
  });
});
