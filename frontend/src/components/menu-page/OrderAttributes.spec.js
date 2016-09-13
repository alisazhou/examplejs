import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import FormAttributes, { ConnectedAttributes, OrderAttributes } from './OrderAttributes.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import ValidationError from '../validation-error/ValidationError.jsx';


const mockUpdateAndValidate = jest.fn();
const PROPS_FROM_REDUX_FORM = {
  fields: {
    partySize: { value: '', error: 'partySize error' },
    dateTime: { value: '', error: 'dateTime error' },
  },
};
const PROPS_FROM_REDUX = {
  dateTimeInvalid: true,
  partySizeInvalid: true,
  updateAndValidate: mockUpdateAndValidate,
};
describe('OrderAttributes dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <OrderAttributes {...PROPS_FROM_REDUX_FORM} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();
  const firstLabel = result.props.children[0];
  const select = R.find(R.propEq('type', 'select'))(firstLabel.props.children);
  const secondLabel = result.props.children[1];
  const input = R.find(R.propEq('type', 'input'))(secondLabel.props.children);

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('prevents default on submit', () => {
    expect(result.props.onSubmit).toBeDefined();
    const mockEvent = jasmine.createSpyObj('mockEvent', [ 'preventDefault' ]);
    result.props.onSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('first field has a ValidationError child component', () => {
    expect(firstLabel).toHaveChild(ValidationError);
  });

  it('first field has a select child component with 6 options', () => {
    expect(select).toBeDefined();
    const options = select.props.children.filter(child =>
      child.type === 'option'
    );
    expect(options.length).toEqual(6);
  });

  it('second field has a ValidationError child component', () => {
    expect(secondLabel).toHaveChild(ValidationError);
  });

  it('has an input child', () => {
    expect(input).toBeDefined();
  });

  it('has the correct callback', () => {
    const partySize = PROPS_FROM_REDUX_FORM.fields.partySize;
    expect(mockUpdateAndValidate).not.toBeCalled();
    select.props.onBlur();
    expect(mockUpdateAndValidate.mock.calls.length).toEqual(1);
    expect(mockUpdateAndValidate.mock.calls[0][0]).toEqual(partySize);
    const dateTime = PROPS_FROM_REDUX_FORM.fields.dateTime;
    input.props.onBlur();
    expect(mockUpdateAndValidate.mock.calls.length).toEqual(2);
    expect(mockUpdateAndValidate.mock.calls[1][0]).toEqual(dateTime);
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'dateTimeInvalid',
      'fields',
      'partySizeInvalid',
      'updateAndValidate',
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
      <ConnectedAttributes store={store} {...PROPS_FROM_REDUX_FORM} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.dateTimeInvalid).toBeDefined();
    expect(result.props.partySizeInvalid).toBeDefined();
    expect(result.props.updateAndValidate).toBeDefined();
  });
});


describe('OrderAttributes redux-from-wrapped component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormAttributes.name).toBe('ReduxForm');
  });
});
