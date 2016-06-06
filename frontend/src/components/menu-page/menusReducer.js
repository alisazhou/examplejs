const initialState = [
  { id: 0, name: 'Demo Menu 0', chef: 'cuckoo lis' },
  { id: 1, name: 'Demo Menu 1', chef: 'coco puffs' },
];

const menusReducer = (state = initialState, action) => {
  if (action) {
    return state;
  }
  return state;
};

export default menusReducer;
