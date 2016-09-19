import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./MenuPage.jsx');
import WrappedPage, { MenuPage } from './MenuPage.jsx';
jest.unmock('../../reducers/menusReducerInitialState.js');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import MenuDescription from './MenuDescription.jsx';
import MenuNamePrice from './MenuNamePrice.jsx';
import Navbar from '../navbar/Navbar.jsx';
import OrderAttributes from './OrderAttributes.jsx';


const PROPS_FROM_ROUTER = {
  params: { menuId: '0' },
};
const PROPS_FROM_REDUX = {
  menu: {
    id: 'abc',
    name: 'sexy menu',
    price: '200',
    chef: 'chef name',
    description: 'menu description',
    image: 'image link',
  },
};
describe('MenuPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuPage {...PROPS_FROM_ROUTER} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Navbar child component', () => {
    expect(result).toHaveChild(Navbar);
  });

  it('has a menu div child', () => {
    expect(result).toHaveChild('div');
  });

  describe('Menu div child', () => {
    const divs = findChildren(result, 'div', { className: 'menudescription-div' });
    it('should have the correct className', () => {
      expect(divs.length).toEqual(1);
    });

    const innerDiv = React.Children.only(divs[0].props.children);
    it('should have one child div with border css stuff', () => {
      expect(innerDiv.props.className).toEqual('menudescription-div__div');
    });

    it('has an img child', () => {
      const img = findChildren(innerDiv, 'img')[0];
      expect(img).toBeDefined();
      expect(img.props.src).toBe('image link');
    });

    it('has a MenuNamePrice child', () => {
      expect(
        findChildren(
          innerDiv,
          MenuNamePrice,
          { menu: PROPS_FROM_REDUX.menu }
        ).length
      ).toEqual(1);
    });

    it('has an OrderAttributes child', () => {
      expect(
        findChildren(
          innerDiv,
          OrderAttributes,
          { menuId: PROPS_FROM_REDUX.menu.id }
        ).length
      ).toEqual(1);
    });

    it('has a MenuDescription child', () => {
      expect(
        findChildren(
          innerDiv,
          MenuDescription,
          { menu: PROPS_FROM_REDUX.menu }
        ).length
      ).toEqual(1);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menu', 'params' ];
    R.forEach(
      prop => expect(R.has(prop)(MenuPage.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(MenuPage.propTypes).length).toEqual(expectedPropTypes.length);
  });
});

describe('MenuPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(MenuPage);
    expect(WrappedPage.WrappedComponent).toBe(MenuPage);
    expect(WrappedPage.displayName).toBe('Connect(MenuPage)');
  });

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <WrappedPage store={store} {...PROPS_FROM_ROUTER} />
  );
  const result = shallowRenderer.getRenderOutput();
  it('receives menu from redux store', () => {
    expect(result.props.menu).toBeDefined();
  });
});
