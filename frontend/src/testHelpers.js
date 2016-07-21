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


const findChildren = (rendered, childType, childProps) => {
  const correctTypeFilter = R.filter(
    child => child.type === childType
  );
  const correctPropsFilter = R.filter(
    child => R.all(
      ([ key, value ]) => R.equals(child.props[key], value),
      R.toPairs(childProps)
    )
  );

  return R.compose(correctTypeFilter, correctPropsFilter)(rendered.props.children);
};
export { findChildren };
