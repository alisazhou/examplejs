import React from 'react';
import TestUtils from 'react-addons-test-utils';
jest.mock('react-router');
import { browserHistory } from 'react-router';
import R from 'ramda';
import { findChildren } from '../../testHelpers.js';

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
const PROPS_FROM_REDUX_INVALID = {
  menu: {
    id: 'test id',
    category: 'tent category',
    chef: 'test chef name',
    name: 'test menu name',
    description: 'test description',
    image: 'test image src',
    tagWords: [ 'test tag 0', 'test tag 1' ],
  },
  pageValid: false,
  updateOrderMenu: mockUpdateOrder,
};
const mockUpdateOrder2 = jasmine.createSpy('mock update order 2');
const PROPS_FROM_REDUX_VALID = {...PROPS_FROM_REDUX_INVALID,
  pageValid: true,
  updateOrderMenu: mockUpdateOrder2,
};
describe('MenuPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuPage {...PROPS_FROM_ROUTER} {...PROPS_FROM_REDUX_INVALID} />
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

  describe('Next button', () => {
    const invalidNextBtn = R.find(R.propEq('type', 'button'))(result.props.children);
    const shallowRenderer2 = TestUtils.createRenderer();
    shallowRenderer2.render(
      <MenuPage {...PROPS_FROM_ROUTER} {...PROPS_FROM_REDUX_VALID} />
    );
    const validResult = shallowRenderer2.getRenderOutput();
    const validNextBtn = R.find(
      R.propEq('type', 'button')
    )(validResult.props.children);

    it('exists and says Next', () => {
      expect(invalidNextBtn).toBeDefined();
      expect(invalidNextBtn.props.children).toBe('Next');
    });
    it('has correct callback when page is invalid', () => {
      const onInvalidNextClick = invalidNextBtn.props.onClick;
      expect(onInvalidNextClick).toBeDefined();
      expect(mockUpdateOrder.calls.count()).toEqual(0);
      spyOn(browserHistory, 'push');
      onInvalidNextClick();
      expect(mockUpdateOrder.calls.count()).toEqual(1);
      expect(mockUpdateOrder.calls.argsFor(0)).toEqual([ PROPS_FROM_ROUTER.params.menuId ]);
      expect(browserHistory.push).not.toHaveBeenCalled();
    });

    it('has correct callback when page is valid', () => {
      const onValidNextClick = validNextBtn.props.onClick;
      expect(onValidNextClick).toBeDefined();
      expect(mockUpdateOrder2.calls.count()).toEqual(0);
      spyOn(browserHistory, 'push');
      onValidNextClick();
      expect(mockUpdateOrder2.calls.count()).toEqual(1);
      expect(mockUpdateOrder2.calls.argsFor(0)).toEqual([ PROPS_FROM_ROUTER.params.menuId ]);
      expect(browserHistory.push).toHaveBeenCalledWith('/reservation');
    });
  });

  it('has a Back LinkButton to IntroPage', () => {
    const expProps = {
      linkTo: '/',
      content: 'Back',
    };
    const backLinkBtn = findChildren(result, LinkButton, expProps);
    expect(backLinkBtn.length).toEqual(1);
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
    expect(result.props.updateOrderMenu).toBeDefined();
    expect(result.props.pageValid).toBeDefined();
    // technically maybe also expect result.props.updateOrder === dispatch(updateOrderActionCreator)
  });
});
