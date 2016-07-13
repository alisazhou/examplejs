import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import R from 'ramda';
import '../../testHelpers.js';

jest.unmock('./MenuPage.jsx');
import WrappedPage, { MenuPage } from './MenuPage.jsx';
jest.unmock('../../reducers/menusReducerInitialState.js');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import MenuDescription from './MenuDescription.jsx';
import OrderAttributes from './OrderAttributes.jsx';


const PROPS_FROM_ROUTER = {
  params: { menuId: '0' },
};
const PROPS_FROM_STORE = {
  menu: {
    id: 'test id',
    category: 'tent category',
    chef: 'test chef name',
    name: 'test menu name',
    description: 'test description',
    image: 'test image src',
    tagWords: [ 'test tag 0', 'test tag 1' ],
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

  it('displays menu name dynamically based on id', () => {
    const header = R.find(R.propEq('type', 'h1'))(result.props.children);
    expect(header.props.children).toBe('test menu name');
  });

  it('has a MenuDescription child component', () => {
    expect(result).toHaveChild(MenuDescription);
  });

  it('has an OrderAttributes child component', () => {
    const attrs = R.find(R.propEq('type', OrderAttributes))(result.props.children);
    expect(attrs).toBeDefined();
  });

  it('has a Link child to reservation page', () => {
    const link = R.find(R.propEq('type', Link))(result.props.children);
    expect(link.props.to).toEqual('/reservation');
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
