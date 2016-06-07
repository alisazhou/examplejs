/* eslint-env jasmine, jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuPage.jsx');
import WrappedPage, { MenuPage } from './MenuPage.jsx';
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_ROUTER = {
  params: { menuId: '0' },
};
const PROPS_FROM_STORE = {
  menu: {
    id: '0', chef: 'eat my food', name: 'i keel you',
  },
};
describe('MenuPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuPage {...PROPS_FROM_ROUTER} {...PROPS_FROM_STORE} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  xit('displays menu name dynamically based on id', () => {
    expect(result.props.children).toContain(1234);
  });
});

describe('MenuPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(MenuPage);
    expect(WrappedPage.WrappedComponent).toBe(MenuPage);
    expect(WrappedPage.displayName).toBe('Connect(MenuPage)');
  });

  it('receives menu name from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedPage store={store} {...PROPS_FROM_ROUTER} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.menu).toBeDefined();
  });

});
