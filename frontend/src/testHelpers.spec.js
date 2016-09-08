import { findChildren, findInTree } from './testHelpers.js';

describe('findChildren', () => {
  const childy = { type: 'type1', props: {x: 1}};
  const childyWithObject = { type: 'type2', props: {x: {y: 2}}};
  const rendered = {props: {children: [ childy, childyWithObject ]}};

  it('should filter out childs that dont fit type', () => {
    expect(findChildren(
      rendered, 'type3'
    )).toEqual([]);
  });
  it('should filter out childs that dont fit property', () => {
    expect(findChildren(
      rendered, 'type1', {x: 2}
    )).toEqual([]);
  });
  it('should not puke if child does not have target property', () => {
    expect(findChildren(
      rendered, 'type1', {randomProperty: 2}
    )).toEqual([]);
  });
  it('should not puke if props.children is not an array', () => {
    // because react decides to return props.children as a non-list if only one result
    expect(findChildren(
      {props: {children: childy}}, 'type1'
    )).toEqual([ childy ]);
  });
  it('should return childs that fit type when no props passed in', () => {
    expect(findChildren(
      rendered, 'type1'
    )).toEqual([ childy ]);
  });
  it('should return childs that fit type and props', () => {
    expect(findChildren(
      rendered, 'type1', {x: 1}
    )).toEqual([ childy ]);
  });
  it('should work for objects (do deep compare etc)', () => {
    expect(findChildren(
      rendered, 'type2', {x: {y: 2}}
    )).toEqual([ childyWithObject ]);
  });
});

describe('findInTree', () => {
  const childy = { type: 'type1', props: {x: 1}};
  const childyWithObject = { type: 'type2', props: {x: {y: 2}}};
  const thirdChild = {type: 'type3', props: {}};
  const childWithinChild = { type: 'hi', props: {children: [ thirdChild ]}};
  const rendered = {props: {children: [ childy, childyWithObject, childWithinChild ]}};

  describe('should work the same as findChildren', () => {
    it('should filter out childs that dont fit type', () => {
      expect(findInTree(
        rendered, 'wrongtype'
      )).toEqual([]);
    });
    it('should filter out childs that dont fit property', () => {
      expect(findInTree(
        rendered, 'type1', {x: 2}
      )).toEqual([]);
    });
    it('should not puke if child does not have target property', () => {
      expect(findInTree(
        rendered, 'type1', {randomProperty: 2}
      )).toEqual([]);
    });
    it('should use correct ordering of filters so it does not puke if some child does not have .props at all', () => {
      const childWithoutProps = {};
      expect(findInTree(
        {props: {children: [ childy, childWithoutProps ]}}, 'type1', { shouldNeverGetHere: 2 }
      )).toEqual([]);
    });
    it('should not puke if props.children is not an array', () => {
      // because react decides to return props.children as a non-list if only one result
      expect(findInTree(
        {props: {children: childy}}, 'type1'
      )).toEqual([ childy ]);
    });

    it('should return childs that fit type when no props passed in', () => {
      expect(findInTree(
        rendered, 'type1'
      )).toEqual([ childy ]);
    });
    it('should return childs that fit type and props', () => {
      expect(findInTree(
        rendered, 'type1', {x: 1}
      )).toEqual([ childy ]);
    });
    it('should work for objects (do deep compare etc)', () => {
      expect(findInTree(
        rendered, 'type2', {x: {y: 2}}
      )).toEqual([ childyWithObject ]);
    });
  });
  it('should find nested children', () => {
    expect(findInTree(
      rendered, 'type3'
    )).toEqual([ thirdChild ]);
  });
  it('should be able to find the component/parent itself', () => {
    expect(findInTree(
      thirdChild, 'type3'
    )).toEqual([ thirdChild ]);
  });
});
