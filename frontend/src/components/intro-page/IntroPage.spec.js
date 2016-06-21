/*eslint-env jest,jasmine */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import R from 'ramda';

jest.unmock('./IntroPage.jsx');
import WrappedPage, { IntroPage, mapStateToProps } from './IntroPage.jsx';
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import MenuList from '../menu-list/MenuList.jsx';
import SearchBar from '../search-bar/SearchBar.jsx';


const PROPS_FROM_REDUX = {
  menus: [ {
    id: 'id0',
    name: 'name0',
    chef: 'chef0',
    description: 'description0',
    image: 'image0',
    tagWords: [ 'tag0' ],
  } ],
};
describe('IntroPage component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Link component to reservation page', () => {
    const bookNowLink = R.find(R.propEq('type', Link))(result.props.children);
    expect(bookNowLink.props.to).toEqual('/reservation');
  });

  it('has a MenuList child component', () => {
    const menuList = R.find(R.propEq('type', MenuList))(result.props.children);
    expect(menuList).toBeDefined();
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
      <WrappedPage store={store} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.menus).toBeDefined();
  });
});


describe('mapStateToProps selector', () => {
  const fullState = {
    irrelevant: {},
    menus: [
      {
        id: 'id0',
        name: 'name0',
        chef: 'chef0',
        description: 'description0',
        image: 'image0',
        tagWords: [ 'tag0' ],
      },
      {
        id: 'id1',
        name: 'name1',
        chef: 'chef1',
        description: 'description1',
        image: 'image1',
        tagWords: [ 'tag1' ],
      },
    ],
  };
  const selectMenusUnfiltered = {
    menus: [
      {
        id: 'id0',
        name: 'name0',
        chef: 'chef0',
        description: 'description0',
        image: 'image0',
        tagWords: [ 'tag0' ],
      },
      {
        id: 'id1',
        name: 'name1',
        chef: 'chef1',
        description: 'description1',
        image: 'image1',
        tagWords: [ 'tag1' ],
      },
    ],
  };

  it('selects all menus from state if form is undefined', () => {
    const actualSelectedState = mapStateToProps(fullState);
    expect(actualSelectedState).toEqual(selectMenusUnfiltered);
  });

  it('selects all menus from state with default values of form', () => {
    const defaultState = Object.assign({}, fullState, {
      form: {
        searchBar: {
          searchCuisine: { value: 'all' },
          searchText: { value: '' },
        },
      },
    });
    const actualSelectedState = mapStateToProps(defaultState);
    expect(actualSelectedState).toEqual(selectMenusUnfiltered);
  });

  describe('filters menus based on searchText and searchCuisine', () => {
    const selectMenusFiltered = {
      menus: [ {
        id: 'id0',
        name: 'name0',
        chef: 'chef0',
        description: 'description0',
        image: 'image0',
        tagWords: [ 'tag0' ],
      } ],
    };

    it('filters menus based on name if given in searchText', () => {
      const stateWithName = Object.assign({}, fullState, {
        form: {
          searchBar: {
            searchCuisine: { value: 'all' },
            searchText: { value: 'name0' },
          },
        },
      });
      const actualSelectedState = mapStateToProps(stateWithName);
      expect(actualSelectedState).toEqual(selectMenusFiltered);
    });

    it('filters menus based on description if given in form', () => {
      const stateWithDescription = Object.assign({}, fullState, {
        form: {
          searchBar: {
            searchCuisine: { value: 'all' },
            searchText: { value: 'description0' },
          },
        },
      });
      const actualSelectedState = mapStateToProps(stateWithDescription);
      expect(actualSelectedState).toEqual(selectMenusFiltered);
    });

    it('filters menus based on option chosen in searchCuisine', () => {
      const stateWithCuisine = Object.assign({}, fullState, {
        form: {
          searchBar: {
            searchCuisine: { value: 'tag0' },
            searchText: { value: '' },
          },
        },
      });
      const actualSelectedState = mapStateToProps(stateWithCuisine);
      expect(actualSelectedState).toEqual(selectMenusFiltered);
    });
  });

});
