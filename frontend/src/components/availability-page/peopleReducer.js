// in the sub-reducer, we get passed state.people as the state
const initialState = [
  { name: 'vincent' },
  { name: 'derek' },
  { name: 'conrad' },
];

const currentStateReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_PEOPLE_REQUEST':
      // set flag that fetching is in process
  case 'FETCH_PEOPLE_SUCCESS':
      // unset flag that fetching is in process
      // change the redux store by returning people as the new state
  case 'FETCH_PEOPLE_FAILURE':
      // unset flag that fetching is in process
      // display an error msg to user
  default:
    break;
  }
  return state;
};

export default currentStateReducer;
