import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import FormAttributes, { ConnectedAttributes, OrderAttributes } from './OrderAttributes.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const mockUpdateOrder = jest.fn();
const mockSubmit = jest.fn();
const PROPS_FROM_PARENT = { menuId: 'test id' };
const PROPS_FROM_REDUX_FORM = {
  fields: {
    partySize: { error: undefined, touched: true, value: '' },
    dateTime: { error: undefined, touched: true, value: '' },
  },
  handleSubmit: mockSubmit,
};
const PROPS_FROM_REDUX = { updateOrder: mockUpdateOrder };
describe('OrderAttributes dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <OrderAttributes
      {...PROPS_FROM_PARENT}
      {...PROPS_FROM_REDUX_FORM}
      {...PROPS_FROM_REDUX}
    />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('first field has a select child component with 6 options', () => {
    const select = findInTree(result, 'select')[0];
    expect(select).toBeDefined();
    const options = select.props.children.filter(child =>
      child.type === 'option'
    );
    expect(options.length).toEqual(6);
  });

  it('has an input child', () => {
    const input = findInTree(result, 'input')[0];
    expect(input).toBeDefined();
  });

  describe('conditional validation error messages', () => {
    it('shows no error if touched with no error', () => {
      const divs = findInTree(result, 'div');
      expect(divs.length).toBe(0);
    });

    it('shows no error if not touched', () =>{
      const fieldsUntouched = {
        partySize: { error: undefined, touched: false, value: '' },
        dateTime: { error: 'error 0', touched: false, value: '' },
      };
      const PROPS_FROM_REDUX_FORM_UNTOUCHED = {
        ...PROPS_FROM_REDUX_FORM, fields: fieldsUntouched,
      };
      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <OrderAttributes
          {...PROPS_FROM_PARENT}
          {...PROPS_FROM_REDUX_FORM_UNTOUCHED}
          {...PROPS_FROM_REDUX}
        />
      );
      const result1 = shallowRenderer1.getRenderOutput();
      const divs = findInTree(result1, 'div');
      expect(divs.length).toBe(0);
    });

    it('shows errors if touched and has error', () =>{
      const fieldsTouched = {
        partySize: { error: 'error 1', touched: true, value: '' },
        dateTime: { error: 'error 2', touched: true, value: '' },
      };
      const PROPS_FROM_REDUX_FORM_TOUCHED = {
        ...PROPS_FROM_REDUX_FORM, fields: fieldsTouched,
      };
      const shallowRenderer2 = TestUtils.createRenderer();
      shallowRenderer2.render(
        <OrderAttributes
          {...PROPS_FROM_PARENT}
          {...PROPS_FROM_REDUX_FORM_TOUCHED}
          {...PROPS_FROM_REDUX}
        />
      );
      const result2 = shallowRenderer2.getRenderOutput();
      const divs = findInTree(result2, 'div');
      expect(divs.length).toBe(2);
    });
  });

  xit('has the correct callback', () => {
    //todo: this is not working!!!
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'fields',
      'handleSubmit',
      'menuId',
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
    expect(ConnectedAttributes).not.toBe(OrderAttributes);
    expect(ConnectedAttributes.WrappedComponent).toBe(OrderAttributes);
    expect(ConnectedAttributes.displayName).toBe('Connect(OrderAttributes)');
  });

  it('receives props from redux', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <ConnectedAttributes
        store={store}
        {...PROPS_FROM_PARENT}
        {...PROPS_FROM_REDUX_FORM}
      />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.updateOrder).toBeDefined();
  });
});


describe('OrderAttributes redux-from-wrapped component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormAttributes.name).toBe('ConnectedForm');
  });
});
