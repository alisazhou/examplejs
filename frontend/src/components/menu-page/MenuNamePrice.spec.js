import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./MenuNamePrice.jsx');
import MenuNamePrice from './MenuNamePrice.jsx';


const PROPS_FROM_PARENT = {
  menu: {
    id: 'abc',
    name: 'sexy menu',
    price: '200',
    chef: 'chef name',
    description: 'menu description',
    image: 'image link',
  },
};
describe('MenuNamePrice component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuNamePrice {...PROPS_FROM_PARENT} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
    expect(result.props.className).toEqual('menudescription-text__div');
  });

  it('shows the menu name on the left', () => {
    const menuName = result.props.children[0];
    expect(menuName.props.children).toEqual(PROPS_FROM_PARENT.menu.name);
    expect(menuName.props.className).toEqual('menudescription-text__left');
  });

  it('shows the menu price on the right', () => {
    const menuName = result.props.children[1];
    expect(menuName.props.children).toEqual(PROPS_FROM_PARENT.menu.price);
    expect(menuName.props.className).toEqual('menudescription-text__right');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menu' ];
    R.forEach(
      prop => expect(R.has(prop)(MenuNamePrice.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(MenuNamePrice.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
