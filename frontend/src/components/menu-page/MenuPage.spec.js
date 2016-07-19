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
const mockUpdateOrder = jasmine.createSpy('mock update order');
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
  updateOrder: mockUpdateOrder,
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

  it('has two LinkButton child nodes', () => {
    const linkBtns = result.props.children.filter(
      child => child.type === LinkButton
    );
    expect(linkBtns.length).toEqual(2);
    expect(linkBtns[0].props.content).toBe('Back');
    expect(linkBtns[0].props.linkTo).toBe('/');
    expect(linkBtns[1].props.content).toBe('Next');
    expect(linkBtns[1].props.linkTo).toBe('/reservation');
  });
  const expectedProps = {
    linkTo: '/reservation',
    content: 'Next',
  };
  const LinkButtons = findChild(
    result, LinkButton, expectedProps
  );
  it('has a LinkButton child with the correct static properties', () => {
    expect(LinkButtons.length).toEqual(1);
  });
  it('has a LinkButton with the correct btnProps callbacks', () => {
    const buttonProps = LinkButtons[0].props.btnProps;
    expect(buttonProps.onClick).toBeDefined();

    expect(mockUpdateOrder.calls.count()).toEqual(0);
    buttonProps.onClick();
    expect(mockUpdateOrder.calls.count()).toEqual(1);
    expect(mockUpdateOrder.calls.argsFor(0)).toEqual([ PROPS_FROM_ROUTER.params.menuId ]);
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
    // technically maybe also expect result.props.updateOrder === dispatch(updateOrderActionCreator)
  });
});
