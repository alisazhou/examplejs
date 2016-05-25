/*eslint-env jest,jasmine */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.unmock('../sticky-layout/currentPageReducer.js');
jest.unmock('../seller/sellersReducer.js');
jest.unmock('../seller/currentSellerIdReducer.js');
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';

jest.unmock('./ReservationForm.jsx');
import ReservationForm from './ReservationForm.jsx';


describe('ReservationForm react component', () => {
  const mockSubmit = jest.fn();
  const renderForm = TestUtils.renderIntoDocument(<ReservationForm onSubmit={mockSubmit} store={store} />);
  const form = ReactDOM.findDOMNode(renderForm);
  
  it('renders to a form', () => {
    expect(form.tagName).toBe('FORM');
  });

  xit('handles validate', () => {
    // Should be part of integration test?
  });

  it('calls submit', () => {
    TestUtils.Simulate.submit(form);
    expect(mockSubmit).toBeCalled();
  });

});
