import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';

jest.unmock('./ReservationForm.jsx');
import WrappedForm, { ReservationForm } from './ReservationForm.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import * as actions from '../../actions/orderActions.js';


const PROPS_FROM_REDUX = {
  customerAdd: 'add0', customerName: 'name0', customerTel: 'tel0',
  updateOrder: () => {},
};

describe('ReservationForm react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <ReservationForm {...PROPS_FROM_REDUX}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has three input fields wrapped in label', () => {
    const fieldLabels = result.props.children;
    expect(fieldLabels.length).toEqual(3);
    R.forEach(label => expect(label.type).toBe('label'), fieldLabels);
    R.forEach(label => expect(label).toHaveChild('input'), fieldLabels);
  });

});


describe('ReservationForm smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedForm).not.toBe(ReservationForm);
    expect(WrappedForm.WrappedComponent).toBe(ReservationForm);
    expect(WrappedForm.displayName).toBe('Connect(ReservationForm)');
  });
  
  it('receives props from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedForm store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.customerAdd).toBeDefined();
    expect(result.props.customerName).toBeDefined();
    expect(result.props.customerTel).toBeDefined();
    expect(result.props.updateOrder).toBeDefined();
  });

  it('calls dispatch with correct callback', () => {
    spyOn(store, 'dispatch');
    spyOn(actions, 'updateOrderActionCreator').and.returnValue('update order');
    const rendered = TestUtils.renderIntoDocument(
      <WrappedForm store={store} />
    );
    const fields = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input');
    R.forEach(input => TestUtils.Simulate.change(input), fields);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith('update order');
  });
});
