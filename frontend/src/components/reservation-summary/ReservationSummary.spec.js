/* eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ReservationSummary.jsx');
import WrappedSummary, { ReservationSummary } from './ReservationSummary.jsx';

jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


describe('ReservationSummary react component', () => {
  it('renders to a div', () => {
    const propsFromRedux = {
      formData: { time: {}, address: {} },
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...propsFromRedux} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.type).toBe('div');
  });

  it('renders a prompt message if props undefined', () => {
    const propsFromRedux = {
      formData: { time: {}, address: {}},
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...propsFromRedux} />);
    const result = shallowRenderer.getRenderOutput();
    const pTag = result.props.children.props.children;
    expect(pTag).toBe('Please specify time and address.');
  });

  it('renders time and address if provided', ()=> {
    const propsFromRedux = {
      formData: {
        time: {value: 'testTime'}, address: {value: 'testAddress'},
      },
    };
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ReservationSummary {...propsFromRedux} />);
    const result = shallowRenderer.getRenderOutput();
    const pTag = result.props.children.props.children;
    expect(pTag).toContain('testTime');
    expect(pTag).toContain('testAddress');
  });

});


describe('ReservationSummary smart component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<WrappedSummary store={store} />);

  it('is wrapped by a connect', () => {
    expect(WrappedSummary).not.toBe(ReservationSummary);
    expect(WrappedSummary.WrappedComponent).toBe(ReservationSummary);
    expect(WrappedSummary.displayName).toBe('Connect(ReservationSummary)');
  });

});
