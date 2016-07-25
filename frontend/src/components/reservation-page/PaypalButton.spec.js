import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findChildren } from '../../testHelpers.js';

jest.unmock('./PaypalButton.jsx');
jest.unmock('./ReservationForm.jsx'); // for fields constants
import WrappedButton, { mapStateToProps, PaypalButton } from './PaypalButton.jsx';
import * as helpers from '../formHelpers.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_REDUX = {
  fieldsStatus: { fieldValidated: true },
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
    spyOn(helpers, 'onNextClick');
    const event = 'event';
    paypal.props.onClick(event);
    expect(helpers.onNextClick).toHaveBeenCalledWith(
      'event', {fieldValidated: true}, 3
    );
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

  it('ignores prop that does not exist', () => {
    const currState = { order: {}, irrelevantState: {} };
    const expState = { fieldsStatus: {}};
    const actualState = mapStateToProps(currState);
    expect(actualState).toEqual(expState);
  });
});
