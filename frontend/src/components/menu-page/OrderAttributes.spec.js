import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./OrderAttributes.jsx');
jest.unmock('./orderAttributesConstants.js');
import WrappedAttributes, { OrderAttributes } from './OrderAttributes.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';
import * as actions from '../../actions/orderActions.js';


const PROPS_FROM_REDUX_FORM = {
  dateTime: '',
  partySize: '',
  updateOrder: () => {},
};
describe('OrderAttributes dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<OrderAttributes {...PROPS_FROM_REDUX_FORM}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has a select child component with 6 options', () => {
    const firstLabel = result.props.children[0];
    const select = R.find(R.propEq('type', 'select'))(firstLabel.props.children);
    expect(select).toBeDefined();
    const options = select.props.children.filter(child =>
      child.type === 'option'
    );
    expect(options.length).toEqual(6);
  });

  it('has an input child', () => {
    const secondLabel = result.props.children[1];
    const input = R.find(R.propEq('type', 'input'))(secondLabel.props.children);
    expect(input).toBeDefined();
  });
});


describe('OrderAttributes smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedAttributes).not.toBe(OrderAttributes);
    expect(WrappedAttributes.WrappedComponent).toBe(OrderAttributes);
    expect(WrappedAttributes.displayName).toBe('Connect(OrderAttributes)');
  });

  it('receives props from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedAttributes store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.dateTime).toBeDefined();
    expect(result.props.partySize).toBeDefined();
    expect(result.props.updateOrder).toBeDefined();
  });

  it('calls dispatch with correct callback', () => {
    spyOn(store, 'dispatch');
    spyOn(actions, 'updateOrderActionCreator').and.returnValue('update order');
    const rendered = TestUtils.renderIntoDocument(
      <WrappedAttributes store={store} />
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(rendered, 'select');
    const input = TestUtils.findRenderedDOMComponentWithTag(rendered, 'input');
    TestUtils.Simulate.change(select);
    TestUtils.Simulate.change(input);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith('update order');
  });
});
