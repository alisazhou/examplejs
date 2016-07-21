import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findChild } from '../../testHelpers.js';

jest.unmock('./MenuPage.jsx');
import WrappedPage, { MenuPage } from './MenuPage.jsx';
jest.unmock('../../reducers/menusReducerInitialState.js');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import MenuDescription from './MenuDescription.jsx';
import OrderAttributes from './OrderAttributes.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
// import * as actions from '../../actions/orderActions.js';


const PROPS_FROM_ROUTER = {
  params: { menuId: '0' },
};
const PROPS_FROM_REDUX = {
  menu: {
    id: 'test id',
    category: 'tent category',
    chef: 'test chef name',
    name: 'test menu name',
    description: 'test description',
    image: 'test image src',
    tagWords: [ 'test tag 0', 'test tag 1' ],
  },
  updateOrder: () => {},
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

  it('displays menu name', () => {
    const header = R.find(R.propEq('type', 'h1'))(result.props.children);
    expect(header.props.children).toBe('test menu name');
  });

  it('has a MenuDescription child component', () => {
    expect(result).toHaveChild(MenuDescription);
  });

  it('has an OrderAttributes child component', () => {
    const attrs = R.find(R.propEq('type', OrderAttributes))(result.props.children);
    expect(attrs).toBeDefined();
  });

  it('has a LinkButton child', () => {
    expect(result).toHaveChild(LinkButton);
  });
  it('has a LinkButton child with the correct properties', () => {
    // rewrite testhelper toHaveChild to also check properties
    const expectedProps = {
      linkTo: '/reservation',
      content: 'Next',
      btnProps: {onClick: PROPS_FROM_REDUX.updateOrder},
    };
    const LinkButtons = findChild(
      result, LinkButton, expectedProps
    );
    expect(LinkButtons.length).toEqual(1);
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
  it('receives menu name from redux store', () => {
    expect(result.props.menu).toBeDefined();
  });

  it('receives correct dispatch function from redux store', () => {
    expect(result.props.updateOrder).toBeDefined();
    // refactor: take out menuId stuff in dispatch, instead do it in render
    // expect dispatch function === dispatch(updateOrderActionCreator)
    // then btnProps in test above will also need to be chgd to pass in props
  });
});
