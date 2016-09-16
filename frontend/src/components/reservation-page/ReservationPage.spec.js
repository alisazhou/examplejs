import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./ReservationPage.jsx');
import WrappedPage, { ReservationPage } from './ReservationPage.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import PaypalButton from './PaypalButton.jsx';
import ReservationForm from './ReservationForm.jsx';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_REDUX = { menuId: 'menuId0', orderValid: false };
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

  it('has a Back LinkButton to MenuPage', () => {
    const expProps = {
      linkTo: `/menus/${PROPS_FROM_REDUX.menuId}/`,
      content: 'Back',
    };
    const backBtn = findInTree(result, LinkButton, expProps);
    expect(backBtn.length).toEqual(1);
  });

  describe('conditional PaypalButton', () => {
    it('shows no PaypalButton if order is not valid', () => {
      const paypal = findInTree(result, PaypalButton);
      expect(paypal.length).toBe(0);
    });

    it('shows PaypalButton if order is valid', () => {
      const PROPS_FROM_REDUX_VALID = {
        ...PROPS_FROM_REDUX, orderValid: true,
      };
      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <ReservationPage
          {...PROPS_FROM_REDUX_VALID}
        />
      );
      const result1 = shallowRenderer1.getRenderOutput();
      const paypal = findInTree(result1, PaypalButton);
      expect(paypal.length).toBe(1);
    });
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menuId', 'orderValid' ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationPage.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(ReservationPage.propTypes).length).toEqual(expectedPropTypes.length);
  });
});


describe('ReservationPage smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(ReservationPage);
    expect(WrappedPage.WrappedComponent).toBe(ReservationPage);
    expect(WrappedPage.displayName).toBe('Connect(ReservationPage)');
  });

  it('receives props from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WrappedPage store={store} />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.menuId).toBeDefined();
    expect(result.props.orderValid).toBeDefined();
  });
});
