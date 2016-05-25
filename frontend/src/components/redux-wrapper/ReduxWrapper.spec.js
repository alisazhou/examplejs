/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';

jest.unmock('../sticky-layout/currentPageReducer.js');
jest.unmock('../seller/currentSellerIdReducer.js');
jest.unmock('../seller/sellersReducer.js');
jest.unmock('./ReduxWrapper.jsx');
import wrapComponent, { store } from './ReduxWrapper.jsx';


describe('A wrapped component', () => {
  class MockComponent extends React.Component {
    render () { return null; }
  }
  const WrappedComponent = wrapComponent(MockComponent);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<WrappedComponent/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a redux provider', () => {
    expect(result.type).toBe(Provider);
  });
  it('renders provider with correct store prop', () => {
    expect(result.props.store).toBeDefined();
    expect(result.props.store).toBe(store);
  });
  it('can show that it has been wrapped', () => {
    expect(WrappedComponent.hasReduxStoreCreated).toBe(true);
  });
  it('passes through all properties to wrappee', () => {
    shallowRenderer.render(<WrappedComponent arbitraryProp='hilo'/>);
    const result = shallowRenderer.getRenderOutput();
    const wrappee = React.Children.only(result.props.children);
    expect(wrappee.props.arbitraryProp).toBe('hilo');
  });
});
