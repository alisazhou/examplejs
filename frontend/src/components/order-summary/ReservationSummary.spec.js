import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./ReservationSummary.jsx');
import WrappedSummary, { ReservationSummary } from './ReservationSummary.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_REDUX = {
  customerAdd: 'add0', customerName: 'name0', customerTel: 'tel0',
};
describe('ReservationSummary react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationSummary {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('renders reservation info', ()=> {
    const resInfo = result.props.children;
    expect(resInfo[0].props.children).toBe('Name: name0');
    expect(resInfo[1].props.children).toBe('Address: add0');
    expect(resInfo[2].props.children).toBe('Phone: tel0');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'customerAdd', 'customerName', 'customerTel' ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationSummary.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(ReservationSummary.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('ReservationSummary smart component', () => {

  it('is wrapped by a connect', () => {
    expect(WrappedSummary).not.toBe(ReservationSummary);
    expect(WrappedSummary.WrappedComponent).toBe(ReservationSummary);
    expect(WrappedSummary.displayName).toBe('Connect(ReservationSummary)');
  });

  it('receives props from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedSummary store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.customerAdd).toBeDefined();
    expect(result.props.customerName).toBeDefined();
    expect(result.props.customerTel).toBeDefined();
  });

});
