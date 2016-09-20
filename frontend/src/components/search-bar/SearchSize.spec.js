import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Field } from 'redux-form';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./SearchSize.jsx');
import FormConnectedSize, { SearchSize } from './SearchSize.jsx';
import partySizeOptions from '../menu-page/orderAttributesConstants.js';
import { renderSelect } from '../formHelpers.js';


const PROPS_FROM_PARENT = { displayError: false };
describe('SearchSize dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SearchSize {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();
  const field = findInTree(result, Field)[0];

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has a Field child component for date picker', () => {
    expect(field).toBeDefined();
    expect(field.props.component).toBe(renderSelect);
    expect(field.props.options).toBe(partySizeOptions);
  });
});


describe('SearchSize redux-furm connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormConnectedSize.name).toBe('ReduxForm');
  });
});
