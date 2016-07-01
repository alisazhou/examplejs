import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./ReservationForm.jsx');
import { ReservationForm } from './ReservationForm.jsx';


const mockHandleSubmit = jasmine.createSpy('mockHandleSubmit');
const PROPS_FROM_REDUX_FORM = {
  fields: { name: 'name', tel: 123, address: 'asdf', time: '123' },
  handleSubmit: mockHandleSubmit,
};

describe('ReservationForm react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <ReservationForm {...PROPS_FROM_REDUX_FORM}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  xit('handles validate', () => {
    // Should be part of integration test?
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'fields', 'handleSubmit' ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationForm.propTypes)).toBe(true),
      expectedPropTypes
    );
  });

  describe('child button', () => {
    const button = R.last(result.props.children);
    it('has an onClick props with the correct callback', () => {
      expect(button.props.onClick).toBe(mockHandleSubmit);
    });
  });

});
