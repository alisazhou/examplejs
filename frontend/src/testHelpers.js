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
  // because react decides to return props.children as a non-list if only one result
  // doing children = [ rendered.props.children ] just fucks everything up somehow
  const children = [].concat(rendered.props.children);
  return matchFromList(children, childType, childProps);
};

const flattenTree = topNode => {
  if (topNode === undefined || topNode === null) { return []; }
  if (topNode.props === undefined) { return [].concat(topNode); }
  if (topNode.props.children === undefined) { return [].concat(topNode); }
  return R.chain(flattenTree, [].concat(topNode.props.children)).concat(topNode);
};

const findInTree = (rendered, childType, childProps) => {
  // React TestUtils.scryRenderedDOMComponentsWithTag requires a DOM
  const listOfNodes = flattenTree(rendered);
  return matchFromList(listOfNodes, childType, childProps);
};
export { findChildren, findInTree };
