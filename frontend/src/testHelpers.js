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

const matchFromList = (listOfNodes, childType, childProps) => {
  const correctTypeFilter = R.filter(
    child => child.type === childType
  );
  const correctPropsFilter = R.filter(
    child => R.all(
      ([ key, value ]) => R.equals(child.props[key], value),
      R.toPairs(childProps)
    )
  );
  return R.compose(correctTypeFilter, correctPropsFilter)(listOfNodes);
};

const findChildren = (rendered, childType, childProps) => {
  return matchFromList(rendered.props.children, childType, childProps);
};

const flattenTree = topNode => {
  if (topNode === undefined) { return []; }
  if (topNode.props === undefined) { return [ topNode ]; }
  if (topNode.props.children === undefined) { return [ topNode ]; }
  return [ topNode ].concat(
    R.chain(flattenTree, topNode.props.children)
  );
};

const findInTree = (rendered, childType, childProps) => {
  // React TestUtils.scryRenderedDOMComponentsWithTag requires a DOM
  const listOfNodes = flattenTree(rendered);
  return matchFromList(listOfNodes, childType, childProps);
};
export { findChildren, findInTree };
