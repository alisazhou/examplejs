import { INTRO } from '../sticky-layout/StickyLayout.jsx';
// in the sub-reducer, we get passed state.currentPage as the state
const initialState = INTRO;

const currentStateReducer = (state = initialState, action) => {
  if (action.type === 'GO_TO_PAGE') {
    return action.toPage;
  }
  return state;
};

export default currentStateReducer;
