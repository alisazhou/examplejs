/*eslint-env jest,jasmine */
import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./BaseChangePageComponent.jsx');
const baseModule = require('./BaseChangePageComponent.jsx');
const BaseChangePageComponent = baseModule.BaseChangePageComponent;

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
    expect(baseModule.baseMapStateToProps).toBeDefined();
  });
  it('exports baseMapDispatchToProps', () => {
    expect(baseModule.baseMapDispatchToProps).toBeDefined();
  });
  it('exports baseConnect', () => {
    expect(baseModule.baseConnect).toBeDefined();
  });
});
