import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./IntroPage.jsx');
import WrappedPage, { IntroPage } from './IntroPage.jsx';
jest.unmock('./introPageSelector.js');
import * as selectors from './introPageSelector.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import MenuList from '../menu-list/MenuList.jsx';
import Navbar from '../navbar/Navbar.jsx';
import SearchBar from '../search-bar/SearchBar.jsx';


const PROPS_FROM_REDUX = { menus: [] };
describe('IntroPage component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a MenuList child component', () => {
    const menuList = R.find(R.propEq('type', MenuList))(result.props.children);
    expect(menuList).toBeDefined();
  });

  it('has a Navbar child component', () => {
    const navbar = R.find(R.propEq('type', Navbar))(result.props.children);
    expect(navbar).toBeDefined();
  });

  it('has a SearchBar child component', () => {
    const searchBar = R.find(R.propEq('type', SearchBar))(result.props.children);
    expect(searchBar).toBeDefined();
  });
});


describe('IntroPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(IntroPage);
    expect(WrappedPage.WrappedComponent).toBe(IntroPage);
    expect(WrappedPage.displayName).toBe('Connect(IntroPage)');
  });

  it('receives menus from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedPage store={store}/>
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.menus).toBeDefined();
  });

  it('calls combineFilters', () => {
    spyOn(selectors, 'combineFilters');
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedPage store={store} />
    );
    expect(selectors.combineFilters).toHaveBeenCalled();
  });
});
