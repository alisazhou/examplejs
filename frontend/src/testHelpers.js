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

const findInTree = (rendered, childType, childProps) => {
  // React TestUtils.scryRenderedDOMComponentsWithTag requires a DOM
  const children = rendered.props.children;
  if (children === undefined) { return []; }

  const directChildren = findChildren(rendered, childType, childProps);
  const findInTreeClosure = R.partialRight(findInTree, [ childType, childProps ]);
  const deeperChildren = R.chain(findInTreeClosure, children);

  return directChildren.concat(deeperChildren);
};
export { findChildren, findInTree };
