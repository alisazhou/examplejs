import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./ReservationForm.jsx');
import WrappedForm, { ConnectedForm, ReservationForm } from './ReservationForm.jsx';
import PaypalButton from './PaypalButton.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_REDUX_FORM = {
  fields: {
    customerName: { error: undefined, touched: true, value: 'name0' },
    customerTel: { error: undefined, touched: true, value: 'tel0' },
    customerAddress: { error: undefined, touched: true, value: 'address0' },
  },
  handleSubmit: () => {},
  valid: true,
};
const mockUpdate = jest.fn();
const PROPS_FROM_REDUX = {
  updateOrder: mockUpdate,
};

describe('ReservationForm react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <ReservationForm {...PROPS_FROM_REDUX_FORM} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();
  const formNode = findInTree(result, 'form')[0];

  it('has a form with three labels, each label has an input field', () => {
    expect(formNode).toBeDefined();
    const labelNodes = findInTree(formNode, 'label');
    expect(labelNodes.length).toEqual(3);
    R.forEach(label => expect(label).toHaveChild('input'), labelNodes);
  });

  describe('conditional error messages', () => {
    it('shows no error when touched and no error', () => {
      const errors = findInTree(formNode, 'div');
      expect(errors.length).toBe(0);
    });

    it('shows no errors if untouched', () => {
      const fieldsUntouched = {
        customerName: { error: 'error 0', touched: false, value: 'name0' },
        customerTel: { error: 'error 1', touched: false, value: 'tel0' },
        customerAddress: { error: 'error 2', touched: false, value: 'address0' },
      };
      const PROPS_FROM_REDUX_FORM_UNTOUCHED = {
        ...PROPS_FROM_REDUX_FORM, fields: fieldsUntouched,
      };
      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <ReservationForm
          {...PROPS_FROM_REDUX_FORM_UNTOUCHED}
          {...PROPS_FROM_REDUX}
        />
      );
      const result1 = shallowRenderer1.getRenderOutput();
      const errors = findInTree(findInTree(result1, 'form')[0], 'div');
      expect(errors.length).toBe(0);
    });

    it('shows errors if touched and has errors', () => {
      const fieldsTouched = {
        customerName: { error: 'error 0', touched: true, value: 'name0' },
        customerTel: { error: 'error 1', touched: true, value: 'tel0' },
        customerAddress: { error: 'error 2', touched: true, value: 'address0' },
      };
      const PROPS_FROM_REDUX_FORM_TOUCHED = {
        ...PROPS_FROM_REDUX_FORM, fields: fieldsTouched,
      };
      const shallowRenderer2 = TestUtils.createRenderer();
      shallowRenderer2.render(
        <ReservationForm
          {...PROPS_FROM_REDUX_FORM_TOUCHED}
          {...PROPS_FROM_REDUX}
        />
      );
      const result2 = shallowRenderer2.getRenderOutput();
      const errors = findInTree(findInTree(result2, 'form')[0], 'div');
      expect(errors.length).toBe(3);
    });
  });

  describe('conditional PaypalButton', () => {
    it('has a PaypalButton child if form is valid', () => {
      const paypal = findInTree(result, PaypalButton);
      expect(paypal.length).toBe(1);
    });

    it('shows no PaypalButton if form is not valid', () => {
      const PROPS_FROM_REDUX_FORM_INVALID = {
        ...PROPS_FROM_REDUX_FORM, valid: false,
      };
      const shallowRenderer3 = TestUtils.createRenderer();
      shallowRenderer3.render(
        <ReservationForm
          {...PROPS_FROM_REDUX_FORM_INVALID}
          {...PROPS_FROM_REDUX}
        />
      );
      const result3 = shallowRenderer3.getRenderOutput();
      const paypal = findInTree(result3, PaypalButton);
      expect(paypal.length).toBe(0);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'fields',
      'handleSubmit',
      'updateOrder',
      'valid',
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
    expect(result.props.updateOrder).toBeDefined();
  });

});


describe('ReservationForm redux form-connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(WrappedForm.name).toBe('ConnectedForm');
  });
});
