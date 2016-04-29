// in the sub-reducer, we get passed state.sellers as the state
const initialState = [
  { name: 'vincent' },
  { name: 'derek' },
  { name: 'conrad' },
];

const currentStateReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_SELLERS_REQUEST':
      // set flag that fetching is in process
  case 'FETCH_SELLERS_SUCCESS':
      // unset flag that fetching is in process
      // change the redux store by returning sellers as the new state
  case 'FETCH_SELLERS_FAILURE':
      // unset flag that fetching is in process
      // display an error msg to user
  default:
    break;
  }
  return state;
};

export default currentStateReducer;
