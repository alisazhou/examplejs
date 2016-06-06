/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

jest.unmock('./ReduxWrapper.jsx');
import WrappedComponent, { store } from './ReduxWrapper.jsx';


describe('A wrapped component', () => {
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

  it('has one Router child component', () => {
    const router = result.props.children;
    expect(router.type).toBe(Router);
  });

  it('has Route grandchild components', () => {
    const router = result.props.children;
    const findRoute = router.props.children.filter(
      child => child.type === Route
    );
    expect(findRoute.length).not.toEqual(0);
  });
});
