import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findInTree } from '../../testHelpers.js';
import { browserHistory } from 'react-router';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import ReduxConnectedAttributes, { OrderAttributes } from './OrderAttributes.jsx';
import SearchDate from '../search-bar/SearchDate.jsx';
import SearchSize from '../search-bar/SearchSize.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const mockUpdateOrder = jest.fn();
const mockTouch = jest.fn();
const PROPS_FROM_PARENT = { menuId: 'test id' };
const PROPS_FROM_REDUX = {
  dateTime: 'test date',
  formsValid: false,
  partySize: 'test size',
  touchAll: mockTouch,
  updateOrder: mockUpdateOrder,
};
describe('OrderAttributes dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <OrderAttributes {...PROPS_FROM_PARENT} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a SearchDate child with correct props', () => {
    const searchDate = findInTree(result, SearchDate)[0];
    expect(searchDate).toBeDefined();
    expect(searchDate.props.className).toBe('order-form__field');
    expect(searchDate.props.displayError).toBe(true);
  });

  it('has a SearchSize child with correct props', () => {
    const searchSize = findInTree(result, SearchSize)[0];
    expect(searchSize).toBeDefined();
    expect(searchSize.props.className).toBe('order-form__field');
    expect(searchSize.props.displayError).toBe(true);
  });

  describe('order button', () => {
    const btn = findInTree(result, 'button')[0];

    it('exists', () => {
      expect(btn).toBeDefined();
      expect(btn.props.children).toBe('Order');
      expect(btn.props.className).toBe('order-form__button');
    });

    it('has the correct callback on button click', () => {
      spyOn(browserHistory, 'push');

      expect(browserHistory.push).not.toHaveBeenCalled();
      expect(mockTouch).not.toBeCalled();
      expect(mockUpdateOrder).not.toBeCalled();

      btn.props.onClick();

      expect(mockTouch).toBeCalled();
      expect(mockUpdateOrder.mock.calls[0]).toEqual([
        { dateTime: 'test date', partySize: 'test size', menuId: 'test id' },
      ]);
      expect(browserHistory.push).not.toHaveBeenCalled();
    });

    it('routes to reservation page if forms are valid', () => {
      spyOn(browserHistory, 'push');
      const PROPS_FROM_REDUX_VALID = {...PROPS_FROM_REDUX, formsValid: true };
      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <OrderAttributes {...PROPS_FROM_PARENT} {...PROPS_FROM_REDUX_VALID} />
      );
      const result1 = shallowRenderer1.getRenderOutput();
      const btn = findInTree(result1, 'button')[0];

      expect(browserHistory.push).not.toHaveBeenCalled();

      btn.props.onClick();

      expect(browserHistory.push).toHaveBeenCalledWith('/reservation/');
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'dateTime',
      'formsValid',
      'menuId',
      'partySize',
      'touchAll',
      'updateOrder',
    ];
    R.forEach(
      prop => expect(R.has(prop)(OrderAttributes.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(OrderAttributes.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('OrderAttributes redux connect-wrapped component', () => {
  it('is wrapped by a connect', () => {
    expect(ReduxConnectedAttributes).not.toBe(OrderAttributes);
    expect(ReduxConnectedAttributes.WrappedComponent).toBe(OrderAttributes);
    expect(ReduxConnectedAttributes.displayName).toBe('Connect(OrderAttributes)');
  });

  it('receives props from redux', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <ReduxConnectedAttributes store={store} {...PROPS_FROM_PARENT} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.formsValid).toBeDefined();
    expect(result.props.touchAll).toBeDefined();
    expect(result.props.updateOrder).toBeDefined();
  });
});
