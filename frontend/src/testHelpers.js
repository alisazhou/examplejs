/*eslint-env jest,jasmine */

import React from 'react';
import R from 'ramda';

const toHaveChildMatcher = () => ({
  compare: (shallowResult, childType) => {
    const childrenOfType = R.filter(
      child => child.type === childType,
      shallowResult.props.children
    );
    return {
      pass: childrenOfType.length === 1,
      message: `Expected to have one child but found ${childrenOfType.length}`,
    };
  },
});
beforeEach(() => {
  jasmine.addMatchers({
    toHaveChild: toHaveChildMatcher,
  });
});

