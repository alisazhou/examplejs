import { findChildren } from './testHelpers.js';



describe('findChildren', () => {
  const childy = { type: 'type1', props: {x: 1}};
  const childyWithObject = { type: 'type2', props: {x: {y: 2}}};
  const rendered = {props: {children: [ childy, childyWithObject ]}};

  it('should filter out childs that dont fit type', () => {
    expect(findChildren(
      rendered,
      'type3'
    )).toEqual([]);
  });
  it('should filter out childs that dont fit property', () => {
    expect(findChildren(
      rendered,
      'type1', {x: 2}
    )).toEqual([]);
  });
  it('should return childs that fit type when no props passed in', () => {
    expect(findChildren(
      rendered,
      'type1'
    )).toEqual([ childy ]);
  });
  it('should return childs that fit type and props', () => {
    expect(findChildren(
      rendered,
      'type1', {x: 1}
    )).toEqual([ childy ]);
  });
  it('should work/deep compare objects etc', () => {
    expect(findChildren(
      rendered,
      'type2', {x: {y: 2}}
    )).toEqual([ childyWithObject ]);
  });
});
