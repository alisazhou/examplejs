import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { Link } from 'react-router';

import { findInTree } from '../../testHelpers.js';

jest.unmock('./MenuListItem.jsx');
import MenuListItem from './MenuListItem.jsx';


const PROPS_FROM_PARENT = {
  menu: {
    id: 'id', name: 'name', image: 'url/to/image', price: '20',
  },
};
describe('MenuListItem dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuListItem {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div with the correct className', () => {
    expect(result.type).toBe('div');
    expect(result.props.className).toEqual('menu-list__item-div');
  });

  const borderDiv = React.Children.only(result.props.children);
  it('has a border div within the div', () => {
    expect(borderDiv.type).toBe('div');
    expect(borderDiv.props.className).toEqual('menu-list__item-border');

  });

  const linkElement = React.Children.only(borderDiv.props.children);
  describe('link element within the border div', () => {
    it('is a link', () => {
      expect(linkElement.type).toBe(Link);
    });
    it('has the proper props', () => {
      expect(linkElement.props.id).toEqual(`menu_${PROPS_FROM_PARENT.menu.id}`);
      expect(linkElement.props.to).toEqual(`/menus/${PROPS_FROM_PARENT.menu.id}/`);
    });
    it('has an img child', () => {
      expect(linkElement).toHaveChild('img');
    });
    it('has a name and price div child', () => {
      expect(linkElement).toHaveChild('div');
    });
    it('should have a menu name', () => {
      const menuName = findInTree(
        linkElement,
        'h4',
        { children: PROPS_FROM_PARENT.menu.name }
      );
      expect(menuName.length).toEqual(1);
    });
    it('should have a menu price', () => {
      const menuPrice = findInTree(
        linkElement,
        'h4',
        { children: `$${PROPS_FROM_PARENT.menu.price}` }
      );
      expect(menuPrice.length).toEqual(1);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menu' ];
    R.forEach(
      prop => expect(R.has(prop)(MenuListItem.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(MenuListItem.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
