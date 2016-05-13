/*eslint-env jest,jasmine */
import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./BaseChangePageComponent.jsx');
import {
  BaseChangePageComponent, baseMapStateToProps, baseMapDispatchToProps, baseConnect,
} from './BaseChangePageComponent.jsx';

describe('BaseChangePageComponent react component', () => {
  it('extends React.Component', () => {
    expect(new BaseChangePageComponent).toEqual(jasmine.any(React.Component));
  });
  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changePage' ];
    R.forEach(
      prop => expect(R.has(prop)(BaseChangePageComponent.propTypes)).toBe(true),
      expectedPropTypes
    );
  });

});

describe('BaseChangePageComponent module', () => {
  it('exports baseMapStateToProps', () => {
    expect(baseMapStateToProps).toBeDefined();
  });
  it('exports baseMapDispatchToProps', () => {
    expect(baseMapDispatchToProps).toBeDefined();
  });
  it('exports baseConnect', () => {
    expect(baseConnect).toBeDefined();
  });
});
