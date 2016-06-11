/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

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

  it('renders to a ul', () => {
    expect(result.type).toBe('ul');
  });

  it('has two MenuListItem child components', () => {
    const findMenuListItem = result.props.children.filter(
      child => child.type === MenuListItem
    );
    expect(findMenuListItem.length).toEqual(2);
  });

});
