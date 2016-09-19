import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Field } from 'redux-form';
import R from 'ramda';
import '../../testHelpers.js';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./ReservationForm.jsx');
import WrappedForm, {
  ConnectedForm,
  mapDispatchToProps,
  ReservationForm,
} from './ReservationForm.jsx';
import { renderInput } from '../formHelpers.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_REDUX_FORM = {
  handleSubmit: () => {},
};
const mockUpdateAndMarkValid = jest.fn();
const mockMarkInvalid = jest.fn();
const PROPS_FROM_REDUX = {
  markInvalid: mockMarkInvalid,
  updateAndMarkValid: mockUpdateAndMarkValid,
};

describe('ReservationForm react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <ReservationForm {...PROPS_FROM_REDUX_FORM} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  describe('within the form', () => {
    const fields = findInTree(result, Field);

    it('has three input fields', () => {
      expect(fields.length).toEqual(3);
      R.all(field => field.props.component === renderInput)(fields);
    });

    it('calls markInvalid onFocus', () => {
      expect(mockMarkInvalid).not.toBeCalled();
      R.map(field => field.props.onFocus(), fields);
      expect(mockMarkInvalid.mock.calls.length).toEqual(3);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [
      'handleSubmit',
      'markInvalid',
      'updateAndMarkValid',
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
    expect(result.props.markInvalid).toBeDefined();
    expect(result.props.updateAndMarkValid).toBeDefined();
  });
});


describe('ReservationForm redux form-connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(WrappedForm.name).toBe('ReduxForm');
  });
});


describe('mapDispatchToProps', () => {
  it('markInvalid dispatches update order action', () => {
    spyOn(store, 'dispatch');
    const { markInvalid } = mapDispatchToProps(store.dispatch);
    const action = updateOrderActionCreator({orderValid: false});
    expect(store.dispatch).not.toHaveBeenCalled();
    markInvalid();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('updateAndMarkValid dispatches update order action', () => {
    spyOn(store, 'dispatch');
    const { updateAndMarkValid } = mapDispatchToProps(store.dispatch);
    const data = { formField: 'formField 0' };
    const action = updateOrderActionCreator({...data, orderValid: true});
    expect(store.dispatch).not.toHaveBeenCalled();
    updateAndMarkValid(data);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
