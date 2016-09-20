import React from 'react';
import { findInTree } from '../testHelpers.js';

jest.unmock('./formHelpers.js');
import { renderInput, renderSelect } from './formHelpers.js';



describe('renderInput stateless component', () => {
  const INPUT_TEST_FIELD = {
    className: 'field className',
    displayError: true,
    input: 'redux form provided utilities',
    label: 'field label',
    placeholder: 'field placeholder',
    type: 'field html type',
    meta: { touched: true, error: 'error 0' },
  };
  const result = renderInput(INPUT_TEST_FIELD);
  const labelNode = findInTree(result, 'label')[0];

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a label child', () => {
    expect(labelNode).toBeDefined();
  });

  describe('input node inside label', () => {
    const inputNode = findInTree(labelNode, 'input')[0];

    it('exists', () => {
      expect(inputNode).toBeDefined();
    });

    it('has the correct props', () => {
      expect(inputNode.props.className).toBe('field className');
      expect(inputNode.props.placeholder).toBe('field placeholder');
      expect(inputNode.props.type).toBe('field html type');
    });
  });

  describe('conditional error messages', () => {
    it('shows error message only if all true', () => {
      const divs = findInTree(result, 'div');
      expect(divs.length).toBe(2);  // most outer div
    });

    it('shows no errors when displayError is false', () => {
      const TEST_FIELD_NOT_DISPLAY = {
        ...INPUT_TEST_FIELD, displayError: false,
      };
      const resultNotDisplay = renderInput(TEST_FIELD_NOT_DISPLAY);
      const divs = findInTree(resultNotDisplay, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });

    it('shows no errors when untouched', () => {
      const TEST_FIELD_UNTOUCHED = {
        ...INPUT_TEST_FIELD, meta: { touched: false },
      };
      const resultUntouched = renderInput(TEST_FIELD_UNTOUCHED);
      const divs = findInTree(resultUntouched, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });

    it('shows no errors when error is undefined', () => {
      const TEST_FIELD_NO_ERROR = {
        ...INPUT_TEST_FIELD, meta: { error: undefined },
      };
      const resultNoError = renderInput(TEST_FIELD_NO_ERROR);
      const divs = findInTree(resultNoError, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });
  });
});


describe('renderSelect stateless component', () => {
  const SELECT_TEST_FIELD = {
    className: 'field className',
    displayError: true,
    label: 'field label',
    options: [ { id: 'id 0', name: 'name 0' }, { id: 'id 1', name: 'name 1' } ],
    select: 'redux form provided utilities',
    meta: { touched: true, error: 'error 1' },
  };
  const result = renderSelect(SELECT_TEST_FIELD);
  const labelNode = findInTree(result, 'label')[0];

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a label child', () => {
    expect(labelNode).toBeDefined();
  });

  describe('select node inside label', () => {
    const selectNode = findInTree(labelNode, 'select')[0];

    it('exists', () => {
      expect(selectNode).toBeDefined();
    });

    it('has the correct props', () => {
      expect(selectNode.props.className).toBe('field className');
    });

    it('has two option nodes with right props', () => {
      const optionNodes = findInTree(selectNode, 'option');
      expect(optionNodes.length).toBe(2);
      const opt0 = findInTree(
        selectNode,
        'option',
        { value: 'name 0', children: 'name 0' }
      );
      expect(opt0.length).toBe(1);
      const opt1 = findInTree(
        selectNode,
        'option',
        { value: 'name 1', children: 'name 1' }
      );
      expect(opt1.length).toBe(1);
    });
  });

  describe('conditional error messages', () => {
    it('shows error message only if all true', () => {
      const divs = findInTree(result, 'div');
      expect(divs.length).toBe(2);  // most outer div
    });

    it('shows no errors when displayError is false', () => {
      const TEST_FIELD_NOT_DISPLAY = {
        ...SELECT_TEST_FIELD, displayError: false,
      };
      const resultNotDisplay = renderSelect(TEST_FIELD_NOT_DISPLAY);
      const divs = findInTree(resultNotDisplay, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });

    it('shows no errors when untouched', () => {
      const TEST_FIELD_UNTOUCHED = {
        ...SELECT_TEST_FIELD, meta: { touched: false },
      };
      const resultUntouched = renderSelect(TEST_FIELD_UNTOUCHED);
      const divs = findInTree(resultUntouched, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });

    it('shows no errors when error is undefined', () => {
      const TEST_FIELD_NO_ERROR = {
        ...SELECT_TEST_FIELD, meta: { error: undefined },
      };
      const resultNoError = renderSelect(TEST_FIELD_NO_ERROR);
      const divs = findInTree(resultNoError, 'div');
      expect(divs.length).toBe(1);  // most outer div
    });
  });
});
