jest.unmock('./introPageSelector.js');
import { combineFilters, byText, byCuisine } from './introPageSelector.js';


const allMenus = [
  {
    id: 'id0',
    name: 'name0',
    category: 'category0',
    chef: 'chef0',
    description: 'description0',
    image: 'image0',
  },
  {
    id: 'id1',
    name: 'name1',
    category: 'category1',
    chef: 'chef1',
    description: 'description1',
    image: 'image1',
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
      category: 'category0',
      chef: 'chef0',
      description: 'description0',
      image: 'image0',
    } ];
    const filteredMenus = byText('name0')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });

  it('returns menus with matching descriptions', () => {
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      category: 'category1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
    } ];
    const filteredMenus = byText('description1')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });
});


describe('filter by searchCuisine', () => {

  it('returns all menus if searchCuisine is all', () => {
    const filteredMenus = byCuisine('All Cuisines')(allMenus);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('filters by menu category', () => {
    const expMenus = [ {
      id: 'id1',
      name: 'name1',
      category: 'category1',
      chef: 'chef1',
      description: 'description1',
      image: 'image1',
    } ];
    const filteredMenus = byCuisine('category1')(allMenus);
    expect(filteredMenus).toEqual(expMenus);
  });
});

describe('combined filters', () => {
  it('returns all menus if text and cuisine are undefined', () => {
    const filteredMenus = combineFilters(allMenus, undefined, undefined);
    expect(filteredMenus).toEqual(allMenus);
  });

  it('filters by text and cuisine', () => {
    const searchText = '0';
    const searchCuisine = '1';
    const filteredMenus = combineFilters(allMenus, searchText, searchCuisine);
    expect(Object.keys(filteredMenus).length).toEqual(0);
  });
});
