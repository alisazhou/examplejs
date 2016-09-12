import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./MenuPageNextButton.jsx');
import WrappedButton, { MenuPageNextButton } from './MenuPageNextButton.jsx';
import * as helpers from '../formHelpers.js';
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const mockMarkInvalid = jest.fn();
const mockUpdate = jest.fn();
const PROPS_FROM_PARENT = { menuId: 'menu0' };
const PROPS_FROM_REDUX = {
  fieldsStatus: {
    fieldAValidated: true,
    fieldBValidated: false,
    fieldCValidated: undefined,
  },
  markInvalid: mockMarkInvalid,
  updateOrderMenu: mockUpdate,
};
describe('MenuPageNextButton dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuPageNextButton {...PROPS_FROM_PARENT} {...PROPS_FROM_REDUX} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a Link', () => {
    expect(result.type).toBe(Link);
  });

  it('routes to /reservation', () => {
    expect(result.props.to).toBe('/reservation/');
  });

  describe('button child', () => {
    const nextBtn = result.props.children;

    it('is a button that says Next', () => {
      expect(nextBtn.type).toBe('button');
      expect(nextBtn.props.children).toBe('Next');
    });

    it('has the correct callback', () => {
      const mockEvent = { preventDefault () {}};
      expect(mockUpdate).not.toBeCalled();
      expect(mockMarkInvalid).not.toBeCalled();
      spyOn(helpers, 'validateAndFindUntouched')
        .and.returnValue([ 'undefinedField' ]);
      nextBtn.props.onClick(mockEvent);
      expect(mockUpdate).toBeCalledWith('menu0');
      expect(helpers.validateAndFindUntouched)
        .toHaveBeenCalledWith(mockEvent, PROPS_FROM_REDUX.fieldsStatus);
      expect(mockMarkInvalid).toBeCalledWith('undefinedField');
    });
  });
});


describe('MenuPageNextButton smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedButton).not.toBe(MenuPageNextButton);
    expect(WrappedButton.WrappedComponent).toBe(MenuPageNextButton);
    expect(WrappedButton.displayName).toBe('Connect(MenuPageNextButton)');
  });

  it('receives props from redux', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedButton store={store} {...PROPS_FROM_PARENT} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.fieldsStatus).toBeDefined();
    expect(result.props.markInvalid).toBeDefined();
    expect(result.props.updateOrderMenu).toBeDefined();
  });
});
