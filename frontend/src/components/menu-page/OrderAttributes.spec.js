import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import { OrderAttributes } from './OrderAttributes.jsx';


const PROPS_FROM_REDUX_FORM = {
  fields: {
    partySize: { value: '' },
    dateTime: { value: '' },
  },
};
describe('OrderAttributes dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<OrderAttributes {...PROPS_FROM_REDUX_FORM}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has a select child component with 5 options', () => {
    const firstLabel = result.props.children[0];
    const select = R.find(R.propEq('type', 'select'))(firstLabel.props.children);
    expect(select).toBeDefined();
    const options = select.props.children.filter(child =>
      child.type === 'option'
    );
    expect(options.length).toEqual(5);
  });
  
  it('has an input child', () => {
    const secondLabel = result.props.children[1];
    const input = R.find(R.propEq('type', 'input'))(secondLabel.props.children);
    expect(input).toBeDefined();
  });
});
