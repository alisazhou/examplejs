import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Field } from 'redux-form';
import R from 'ramda';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import ReduxConnectedAttributes, {
  FormConnectedAttributes,
  OrderAttributes,
} from './OrderAttributes.jsx';
import partySizeOptions from './orderAttributesConstants.js';
import { renderInput, renderSelect } from '../formHelpers.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const mockUpdateOrder = jest.fn();
const mockSubmit = jest.fn();
const PROPS_FROM_PARENT = { menuId: 'test id' };
const PROPS_FROM_REDUX_FORM = { handleSubmit: mockSubmit };
const PROPS_FROM_REDUX = {
  initialValues: { dateTime: '2016-09-19' },
  updateOrder: mockUpdateOrder,
};
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

  describe('within the form', () => {
    const fields = findInTree(result, Field);

    it('has two fields', () => {
      expect(fields.length).toBe(2);
    });

    it('first field is a select with 6 options', () => {
      const first = fields[0];
      expect(first.props.component).toBe(renderSelect);
      expect(first.props.options).toBe(partySizeOptions);
    });

    it('second field is a date picker', () => {
      const second = fields[1];
      expect(second.props.component).toBe(renderInput);
      expect(second.props.type).toBe('date');
    });
  });

  xit('has the correct callback', () => {
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'handleSubmit',
      'initialValues',
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


describe('OrderAttributes redux-from-wrapped component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormConnectedAttributes.name).toBe('ReduxForm');
  });
});


describe('OrderAttributes redux connect-wrapped component', () => {
  it('is wrapped by a connect', () => {
    expect(ReduxConnectedAttributes).not.toBe(FormConnectedAttributes);
    expect(ReduxConnectedAttributes.WrappedComponent).toBe(
      FormConnectedAttributes
    );
    expect(ReduxConnectedAttributes.displayName).toBe('Connect(ReduxForm)');
  });

  it('receives props from redux', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <ReduxConnectedAttributes
        store={store}
        {...PROPS_FROM_PARENT}
        {...PROPS_FROM_REDUX_FORM}
      />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.initialValues).toBeDefined();
    expect(result.props.updateOrder).toBeDefined();
  });
});
