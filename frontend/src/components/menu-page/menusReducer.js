const initialState = [
  {
    id: '0',
    name: 'Demo Menu 0',
    chef: 'cuckoo lis',
    description: 'description 0',
    image: 'image src 0',
    tagWords: [ 'tag 0', 'tag 1' ],
  },
  {
    id: '1',
    name: 'Demo Menu 1',
    chef: 'coco puffs',
    description: 'description 1',
    image: 'image src 1',
    tagWords: [ 'tag 1', 'tag 2' ],
  },
];

const menusReducer = (state = initialState, action) => {
  if (action) {
    return state;
  }
  return state;
};

export default menusReducer;
