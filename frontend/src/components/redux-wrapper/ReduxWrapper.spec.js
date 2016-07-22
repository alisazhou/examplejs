import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';
import '../../testHelpers.js';
import { findChildren } from '../../testHelpers.js';

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

  describe('Router wrapper', () => {
    const router = result.props.children;
    it('is of type Router', () => {
      expect(router.type).toBe(Router);
    });

    describe('baseRoute component', () => {
      const baseRoute = router.props.children;
      it('is a Route', () => {
        expect(baseRoute.type).toBe(Route);
      });

      it('has an IndexRoute child component', () => {
        expect(baseRoute).toHaveChild(IndexRoute);
      });

      it('has three Route child components', () => {
        const routes = findChildren(baseRoute, Route);
        expect(routes.length).toEqual(3);
      });
    });
  });

});
