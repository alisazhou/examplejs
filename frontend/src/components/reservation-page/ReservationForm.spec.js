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

  it('has three input fields wrapped in label', () => {
    const fieldLabels = result.props.children;
    expect(fieldLabels.length).toEqual(3);
    R.forEach(label => expect(label.type).toBe('label'), fieldLabels);
    const findInput = node =>
      R.find(R.propEq('type', 'input'))(node.props.children);
    R.forEach(label => expect(findInput(label)).toBeDefined(), fieldLabels);
  });

});
