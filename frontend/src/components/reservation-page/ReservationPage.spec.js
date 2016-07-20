import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';

jest.unmock('./ReservationPage.jsx');
import WrappedPage, { ReservationPage } from './ReservationPage.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import ReservationForm from './ReservationForm.jsx';


const PROPS_FROM_REDUX = { menuId: 'menuId0' };
describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage {...PROPS_FROM_REDUX} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has a MenuSummary component', () => {
    expect(result).toHaveChild(MenuSummary);
  });
  it('has a ReservationForm component', () => {
    expect(result).toHaveChild(ReservationForm);
  });
  it('has two LinkButton child nodes', () => {
    const linkBtns = result.props.children.filter(
      child => child.type === LinkButton
    );
    expect(linkBtns.length).toEqual(2);
    expect(linkBtns[0].props.content).toBe('Back');
    expect(linkBtns[0].props.linkTo).toBe('/menus/menuId0');
    expect(linkBtns[1].props.content).toBe('Next');
    expect(linkBtns[1].props.linkTo).toBe('/payment');
  });
});


describe('ReservationPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(ReservationPage);
    expect(WrappedPage.WrappedComponent).toBe(ReservationPage);
    expect(WrappedPage.displayName).toBe('Connect(ReservationPage)');
  });
});
