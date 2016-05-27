/* eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';

jest.unmock('./ReservationSummary.jsx');
import WrappedSummary, { ReservationSummary } from './ReservationSummary.jsx';

jest.unmock('../seller/currentSellerIdReducer.js');
jest.unmock('../seller/sellersReducer.js');
jest.unmock('../sticky-layout/currentPageReducer.js');
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


describe('ReservationSummary react component', () => {
  it('renders to a div', () => {
    const props_from_redux = {
      form_data: { time: null, address: null }
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...props_from_redux} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.type).toBe('div');
  });

  it('renders a prompt message if props undefined', () => {
    const props_from_redux = {
      form_data: { time: null, address: null }
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...props_from_redux} />);
    const result = shallowRenderer.getRenderOutput();
    const p_tag = result.props.children.props.children
    expect(p_tag).toBe('Please specify time and address.');
  });

  it('renders time and address if provided', ()=> {
    const props_from_redux = {
      form_data: {
        time: {value: 'test_time'}, address: {value: 'test_address'}
      }
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...props_from_redux} />);
    const result = shallowRenderer.getRenderOutput();
    const p_tag = result.props.children.props.children
    expect(p_tag).toContain('test_time');
    expect(p_tag).toContain('test_address');
  });

});


describe('ReservationSummary smart component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<WrappedSummary store={store} />);
  const result = shallowRenderer.getRenderOutput();

  it('is wrapped by a connect', () => {
    expect(WrappedSummary).not.toBe(ReservationSummary);
    expect(WrappedSummary.WrappedComponent).toBe(ReservationSummary);
    expect(WrappedSummary.displayName).toBe('Connect(ReservationSummary)');
  });

});
