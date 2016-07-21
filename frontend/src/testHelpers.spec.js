import { findChild } from './testHelpers.js';



describe('findChild', () => {
  const childy = { type: 'type1', props: {x: 1}};
  const childyWithObject = { type: 'type2', props: {x: {y: 2}}};
  const rendered = {props: {children: [ childy, childyWithObject ]}};

  it('should filter out childs that dont fit type', () => {
    expect(findChild(
      rendered,
      'type3'
    )).toEqual([]);
  });
  it('should filter out childs that dont fit property', () => {
    expect(findChild(
      rendered,
      'type1', {x: 2}
    )).toEqual([]);
  });
  it('should return childs that fit type when no props passed in', () => {
    expect(findChild(
      rendered,
      'type1'
    )).toEqual([ childy ]);
  });
  it('should return childs that fit type and props', () => {
    expect(findChild(
      rendered,
      'type1', {x: 1}
    )).toEqual([ childy ]);
  });
  it('should work/deep compare objects etc', () => {
    expect(findChild(
      rendered,
      'type2', {x: {y: 2}}
    )).toEqual([ childyWithObject ]);
  });
});
