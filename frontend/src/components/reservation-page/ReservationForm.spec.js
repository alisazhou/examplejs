import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./ReservationForm.jsx');
import WrappedForm, { ConnectedForm, ReservationForm } from './ReservationForm.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import ValidationError from '../validation-error/ValidationError.jsx';


const PROPS_FROM_REDUX_FORM = {
  fields: {
    customerName: { value: 'name0' },
    customerTel: { value: 'tel0' },
    customerAddress: { value: 'address0' },
  },
};
const mockUpdateAndValidate = jest.fn();
const PROPS_FROM_REDUX = {
  customerAddressInvalid: true,
  customerNameInvalid: true,
  customerTelInvalid: true,
  updateAndValidate: mockUpdateAndValidate,
};

describe('ReservationForm react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <ReservationForm {...PROPS_FROM_REDUX_FORM} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();
  const labelNodes = findChildren(result, 'label');

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('each label has an input field and a ValidationError child component', () => {
    expect(labelNodes.length).toEqual(3);
    R.forEach(label => expect(label).toHaveChild('input'), labelNodes);
    R.forEach(label => expect(label).toHaveChild(ValidationError), labelNodes);
  });

  describe('onBlur callbacks', () => {
    const cusInfoFields = R.map(
      label => R.find(R.propEq('type', 'input'))(label.props.children),
      labelNodes
    );

    it('each input has onBlur', () => {
      R.forEach(
        input => expect(input.props.onBlur).toBeDefined(),
        cusInfoFields
      );
    });

    it('has the correct callbacks', () => {
      expect(mockUpdateAndValidate).not.toBeCalled();
      R.forEach(
        field => field.props.onBlur(),
        cusInfoFields
      );
      const { customerName, customerTel, customerAddress } =
        PROPS_FROM_REDUX_FORM.fields;
      expect(mockUpdateAndValidate.mock.calls).toEqual(
        [ [ customerName ], [ customerTel ], [ customerAddress ] ]
      );
    });

  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'customerAddressInvalid',
      'customerNameInvalid',
      'customerTelInvalid',
      'fields',
      'updateAndValidate',
    ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationForm.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(ReservationForm.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('ReservationForm redux-connected component', () => {
  it('is wrapped by a connect', () => {
    expect(ConnectedForm).not.toBe(ReservationForm);
    expect(ConnectedForm.WrappedComponent).toBe(ReservationForm);
    expect(ConnectedForm.displayName).toBe('Connect(ReservationForm)');
  });

  it('receives props from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <ConnectedForm store={store} {...PROPS_FROM_REDUX_FORM} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.updateAndValidate).toBeDefined();
  });

});


describe('ReservationForm redux form-connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(WrappedForm.name).toBe('ConnectedForm');
  });
});
