import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { Field } from 'redux-form';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./SearchBar.jsx');
import FormConnectedBar, { StoreConnectedBar, SearchBar } from './SearchBar.jsx';
import { renderInput, renderSelect } from '../formHelpers.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_STORE = {
  cuisines: [ { id: 0, name: '0', key: 0 }, { id: 1, name: '1', key: 1 } ],
};
describe('SearchBar presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <SearchBar {...PROPS_FROM_STORE}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('has a form child component', () => {
    expect(findInTree(result, 'form').length).toBe(1);
  });

  describe('within the form', () => {
    const form = findInTree(result, 'form')[0];
    const fields = findInTree(form, Field);
    it('has two Field child components', () => {
      expect(fields.length).toBe(2);
    });

    describe('first Field child', () => {
      const first = fields[0];
      it('renders to input field', () => {
        expect(first.props.component).toBe(renderInput);
      });
      it('has the correct className', () => {
        expect(first.props.className).toEqual('searchbar-form__search-field');
      });
    });

    describe('second Field child', () => {
      const second = fields[1];
      it('renders to select field', () => {
        expect(second.props.component).toBe(renderSelect);
      });
      it('has the correct className', () => {
        expect(second.props.className).toEqual('searchbar-form__search-field');
      });
      it('receives options props', () => {
        expect(second.props.options).toBe(PROPS_FROM_STORE.cuisines);
      });
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'cuisines' ];
    R.forEach(
      prop => expect(R.has(prop)(SearchBar.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(SearchBar.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('SearchBar smart component', () => {
  it('is wrapped by a connect', () => {
    expect(StoreConnectedBar).not.toBe(SearchBar);
    expect(StoreConnectedBar.WrappedComponent).toBe(SearchBar);
    expect(StoreConnectedBar.displayName).toBe('Connect(SearchBar)');
  });

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <StoreConnectedBar store={store} {...PROPS_FROM_STORE} />
  );
  const result = shallowRenderer.getRenderOutput();
  it('receives cuisines from redux store', () => {
    expect(result.props.cuisines).toBeDefined();
  });
});


describe('OrderAttributes redux-from-wrapped component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormConnectedBar.name).toBe('ReduxForm');
  });
});
