import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./MenuList.jsx');
import MenuList from './MenuList.jsx';
import MenuListItem from './MenuListItem.jsx';


const PROPS_FROM_PARENT = {
  menus: [
    {id: 'id0', name: 'name0', chef: 'chef0'},
    {id: 'id1', name: 'name1', chef: 'chef1'},
  ],
};
describe('MenuList dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuList {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('maps over menus to create MenuListItem child components', () => {
    const findMenuListItem = result.props.children.filter(
      child => child.type === MenuListItem
    );
    expect(findMenuListItem.length).toEqual(2);
  });

  it('does not render a sorry message if menus available', () => {
    const foundChildren = findChildren(result, 'h4', { children: 'Sorry, we dont have any results for your search criterion'});
    expect(foundChildren.length).toEqual(0);
  });

  it('renders a sorry message if no menus available', () => {
    shallowRenderer.render(<MenuList menus={[]} />);
    const sadResult = shallowRenderer.getRenderOutput();
    const foundChildren = findChildren(sadResult, 'h4', { children: 'Sorry, we dont have any results for your search criterion'});
    expect(foundChildren.length).toEqual(1);
  });


  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menus' ];
    R.forEach(
      prop => expect(R.has(prop)(MenuList.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(MenuList.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
