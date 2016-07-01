import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./MenuListItem.jsx');
import MenuListItem from './MenuListItem.jsx';


const PROPS_FROM_PARENT = {
  menu: {
    id: 'id', name: 'name', chef: 'chef',
  },
};
describe('MenuListItem dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuListItem {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a li', () => {
    expect(result.type).toBe('li');
  });

  describe('within the li', () => {
    const childOfLi = result.props.children;
    it('is a Link', () => {
      expect(childOfLi.type).toBe(Link);
    });

    it('shows menu name', () => {
      expect(childOfLi.props.children).toBe('name');
    });

    it('assigns the node an id attr', () => {
      expect(childOfLi.props.id).toBe('menu_id');
    });

    it('links to url based on menu id', () => {
      expect(childOfLi.props.to).toBe('/menus/id');
    });
  
  });

});
