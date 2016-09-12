import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./PaypalButton.jsx');
jest.unmock('./ReservationForm.jsx'); // for fields constants
import WrappedButton, { mapStateToProps, PaypalButton } from './PaypalButton.jsx';
import * as helpers from '../formHelpers.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const mockMarkInvalid = jest.fn();
const PROPS_FROM_REDUX = {
  fieldsStatus: { fieldValidated: true },
  markInvalid: mockMarkInvalid,
};
describe('PaypalButton dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<PaypalButton {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('main button child component has correct callback', () => {
    const paypal = findChildren(result, 'input', {name: 'submit'})[0];
    expect(paypal).toBeDefined();
    expect(paypal.props.onClick).toBeDefined();
    expect(mockMarkInvalid).not.toBeCalled();
    spyOn(helpers, 'validateAndFindUntouched')
      .and.returnValue([ 'untouchedField' ]);
    const event = 'event';
    paypal.props.onClick(event);
    expect(helpers.validateAndFindUntouched).toHaveBeenCalledWith(
      'event', PROPS_FROM_REDUX.fieldsStatus
    );
    expect(mockMarkInvalid).toBeCalledWith('untouchedField');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'fieldsStatus', 'markInvalid' ];
    R.forEach(
      prop => expect(R.has(prop)(PaypalButton.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(PaypalButton.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('PaypalButton smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedButton).not.toBe(PaypalButton);
    expect(WrappedButton.WrappedComponent).toBe(PaypalButton);
    expect(WrappedButton.displayName).toBe('Connect(PaypalButton)');
  });

  it('receives props from redux', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedButton store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.fieldsStatus).toBeDefined();
    expect(result.props.markInvalid).toBeDefined();
  });
});


describe('mapStateToProps selector', () => {
  it('selects the status for fields if it exists', () => {
    const currState = {
      order: {
        customerAddressValidated: true,
        customerNameValidated: false,
        customerTelValidated: true,
      },
      irrelevantState: {},
    };
    const expState = { fieldsStatus: {
      customerAddressValidated: true,
      customerNameValidated: false,
      customerTelValidated: true,
    }};
    const actualState = mapStateToProps(currState);
    expect(actualState).toEqual(expState);
  });

  it('marks props that do not exist as undefined', () => {
    const currState = { order: {}, irrelevantState: {} };
    const expState = { fieldsStatus: {
      customerNameValidated: undefined,
      customerTelValidated: undefined,
      customerAddressValidated: undefined,
    }};
    const actualState = mapStateToProps(currState);
    expect(actualState).toEqual(expState);
    // perversely, the following exp passes!
    // expect(actualState).toEqual({ fieldsStatus: {}});
    // hence, check for keys
    expect(R.keys(actualState.fieldsStatus))
      .toEqual(R.keys(expState.fieldsStatus));
  });
});
