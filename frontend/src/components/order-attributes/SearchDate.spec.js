import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Field } from 'redux-form';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./SearchDate.jsx');
import FormConnectedDate, { SearchDate } from './SearchDate.jsx';
import { renderInput } from '../formHelpers.js';


const PROPS_FROM_PARENT = { displayError: false };
describe('SearchDate dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SearchDate {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();
  const field = findInTree(result, Field)[0];

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has a Field child component for date picker', () => {
    expect(field).toBeDefined();
    expect(field.props.component).toBe(renderInput);
    expect(field.props.type).toBe('date');
  });
});


describe('SearchDate redux-furm connected component', () => {
  it('is wrapped by a redux form', () => {
    expect(FormConnectedDate.name).toBe('ReduxForm');
  });
});
