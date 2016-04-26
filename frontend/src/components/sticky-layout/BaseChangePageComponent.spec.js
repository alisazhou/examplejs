/*eslint-env jest,jasmine */
import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./BaseChangePageComponent.jsx');
const baseModule = require('./BaseChangePageComponent.jsx');
const BaseChangePageComponent = baseModule.BaseChangePageComponent;
// const baseConnect = baseModule.baseConnect;

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
describe('baseConnect', () => {
  it('has default mapStateToProps', () => {
    // baseConnect();
  });
  it('has default mapDispatchToProps', () => {
  });
});
