/* eslint-env jest */
jest.unmock('./introPageSelector.js');
import { filterBySearchText, filterBySearchCuisine } from './introPageSelector.js';


const allMenus = [
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
];

describe('filter menus by searchText', () => {
  it('returns all menus if form is undefined', () => {
    const filteredMenus = filterBySearchText(allMenus, undefined);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('returns all menus if searchText is empty', () => {
    const form = {
      searchBar: { searchText: { value: '' }},
    };
    const filteredMenus = filterBySearchText(allMenus, form);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('returns menus with matching names', () => {
    const form = {
      searchBar: { searchText: { value: 'name0' }},
    };
    const expMenus = [ {
      id: 'id0',
      name: 'name0',
      chef: 'chef0',
      description: 'description0',
      image: 'image0',
      tagWords: [ 'tag0' ],
    } ];
    const filteredMenus = filterBySearchText(allMenus, form);
    expect(filteredMenus).toEqual(expMenus);
  });

  it('returns menus with matching descriptions', () => {
    const form = {
      searchBar: { searchText: { value: 'description1' }},
    };
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
      tagWords: [ 'tag1' ],
    } ];
    const filteredMenus = filterBySearchText(allMenus, form);
    expect(filteredMenus).toEqual(expMenus);
  });
});


describe('filter by searchCuisine', () => {

  it('returns all menus if form is undefined', () => {
    const filteredMenus = filterBySearchCuisine(allMenus, undefined);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('returns all menus if searchCuisine is all', () => {
    const form = {
      searchBar: { searchCuisine: { value: 'all' }},
    };
    const filteredMenus = filterBySearchCuisine(allMenus, form);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('filters by menu tagWords', () => {
    const form = {
      searchBar: { searchCuisine: { value: 'tag1' }},
    };
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
      tagWords: [ 'tag1' ],
    } ];
    const filteredMenus = filterBySearchCuisine(allMenus, form);
    expect(filteredMenus).toEqual(expMenus);
  });
});
