/* eslint-env jasmine, jest */
jest.unmock('./introPageSelector.js');
import { combineFilters, byText, byCuisine } from './introPageSelector.js';


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
  it('returns all menus if text is empty', () => {
    const filteredMenus = byText('')(allMenus);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('returns menus with matching names', () => {
    const expMenus = [ {
      id: 'id0',
      name: 'name0',
      chef: 'chef0',
      description: 'description0',
      image: 'image0',
      tagWords: [ 'tag0' ],
    } ];
    const filteredMenus = byText('name0')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });

  it('returns menus with matching descriptions', () => {
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
      tagWords: [ 'tag1' ],
    } ];
    const filteredMenus = byText('description1')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });
});


describe('filter by searchCuisine', () => {

  it('returns all menus if searchCuisine is all', () => {
    const filteredMenus = byCuisine('all')(allMenus);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('filters by menu tagWords', () => {
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
      tagWords: [ 'tag1' ],
    } ];
    const filteredMenus = byCuisine('tag1')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });
});

describe('combined filters', () => {
  it('returns all menus if form is undefined', () => {
    const filteredMenus = combineFilters(allMenus, undefined);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('returns all menus if searchBar is undefined', () => {
    const form = { searchBar: undefined };
    const filteredMenus = combineFilters(allMenus, form);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('filters by text and cuisine', () => {
    const form = {
      searchBar: {
        searchText: { value: '0' }, searchCuisine: { value: '1' },
      },
    };
    const filteredMenus = combineFilters(allMenus, form);
    expect(Object.keys(filteredMenus).length).toEqual(0);
  });
});
