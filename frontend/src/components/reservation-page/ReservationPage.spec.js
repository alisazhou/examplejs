import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';
import { findChildren } from '../../testHelpers.js';

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

  describe('two LinkButton child nodes', () => {
    it('has a Back LinkButton to MenuPage', () => {
      const expProps = {
        linkTo: '/menus/menuId0',
        content: 'Back',
      };
      const backBtn = findChildren(result, LinkButton, expProps);
      expect(backBtn.length).toEqual(1);
    });
    it('has a Nexi LinkButton to PaymentPage', () => {
      const expProps = {
        linkTo: '/payment',
        content: 'Next',
      };
      const nextBtn = findChildren(result, LinkButton, expProps);
      expect(nextBtn.length).toEqual(1);
    });
  });
});


describe('ReservationPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(ReservationPage);
    expect(WrappedPage.WrappedComponent).toBe(ReservationPage);
    expect(WrappedPage.displayName).toBe('Connect(ReservationPage)');
  });
});
