const initialState = [
  {
    id: '0',
    name: 'Demo Menu 0',
    chef: 'cuckoo lis',
    description: 'description 0',
    image: 'image src 0',
    tagWords: [ 'American', 'French' ],
  },
  {
    id: '1',
    name: 'Demo Menu 1',
    chef: 'coco puffs',
    description: 'description 1',
    image: 'image src 1',
    tagWords: [ 'Chinese', 'French' ],
  },
];

const menusReducer = (state = initialState, action) => {
  if (action) {
    return state;
  }
  return state;
};

export default menusReducer;
