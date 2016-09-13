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
    partySize: { value: '', error: 'partySize error' },
    dateTime: { value: '', error: 'dateTime error' },
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

  xdescribe('conditional validation error messages', () => {});

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
