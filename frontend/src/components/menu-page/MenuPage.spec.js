import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./MenuPage.jsx');
import WrappedPage, { MenuPage } from './MenuPage.jsx';
jest.unmock('../../reducers/menusReducerInitialState.js');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
import MenuDescription from './MenuDescription.jsx';
import MenuPageNextButton from './MenuPageNextButton.jsx';
import Navbar from '../navbar/Navbar.jsx';
import OrderAttributes from './OrderAttributes.jsx';


const PROPS_FROM_ROUTER = {
  params: { menuId: '0' },
};
const PROPS_FROM_REDUX = {
  menu: { id: '0', name: 'test menu name' },
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
    const navbar = R.find(R.propEq('type', Navbar))(result.props.children);
    expect(navbar).toBeDefined();
  });

  it('has a MenuDescription child component', () => {
    expect(result).toHaveChild(MenuDescription);
  });

  it('has an OrderAttributes child component', () => {
    expect(result).toHaveChild(OrderAttributes);
  });

  it('has a Back LinkButton to IntroPage', () => {
    const expProps = {
      linkTo: '/',
      content: 'Back',
    };
    const backLinkBtn = findChildren(result, LinkButton, expProps);
    expect(backLinkBtn.length).toEqual(1);
  });

  it('has a MenuPageNextButton child component', () => {
    expect(result).toHaveChild(MenuPageNextButton);
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
