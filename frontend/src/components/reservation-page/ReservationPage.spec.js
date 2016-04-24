/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./ReservationPage.jsx');
const ReservationPage = require('./ReservationPage.jsx').default;

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changePage' ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationPage.propTypes)).toBe(true),
      expectedPropTypes
    );
  });
});
