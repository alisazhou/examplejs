/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./PageWrapper.jsx');
const wrapPage = require('./PageWrapper.jsx').default;

describe('A wrapped page', () => {
  class MockComponent extends React.Component {
    render () { return null; }
  }
  const WrappedPage = wrapPage(MockComponent);
  const shallowRenderer = TestUtils.createRenderer();
  it('renders to a div with the correct css class depending on visible property', () => {
    shallowRenderer.render(<WrappedPage visible={true}/>);
    let result = shallowRenderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.className).toEqual('');

    shallowRenderer.render(<WrappedPage visible={false}/>);
    result = shallowRenderer.getRenderOutput();
    expect(result.props.className).toEqual('hidden');
  });
  it('has a default visible property', () => {
    const renderedWithoutDefault = TestUtils.renderIntoDocument(<WrappedPage visible={false}/>);
    expect(renderedWithoutDefault.props.visible).toBe(false);
    const renderedWithDefault = TestUtils.renderIntoDocument(<WrappedPage/>);
    expect(renderedWithDefault.props.visible).toBe(true);
  });
  it('can show that it has been wrapped', () => {
    expect(WrappedPage.wrappedByPageWrapper).toBe(true);
  });
  it('passes through all properties to wrappee', () => {
    shallowRenderer.render(<WrappedPage arbitraryProp='hilo'/>);
    const result = shallowRenderer.getRenderOutput();
    const wrappee = React.Children.only(result.props.children);
    expect(wrappee.props.arbitraryProp).toBe('hilo');
  });
});
