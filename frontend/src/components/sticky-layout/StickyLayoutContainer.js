import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StickyLayout from './StickyLayout.jsx';


// wrapped/stateless component has props whose value might differ depending on state
// should return { propName: getPropValueGivenState }
const initialState = {};
function mapStateToProps (state = initialState) {
  return {
    prop1: state.randomFlag === true,
  };
}

// give underlying presentational component some extra props 
// which are callbacks that could chg state (by dispatching an action)
// a dict of {prop: callBack}
// callback is a closure that uses dispatch passed in
// or just pass in the callback instead of a dict to make the component props the same name
// the callback also known as action creator in redux lingo
const arbitraryCallback = () => {};
function mapDispatchToProps (dispatch) {
  return bindActionCreators({arbitraryCallback}, dispatch);
}

// wrap around presentational component (use composition!)
export default connect(mapStateToProps, mapDispatchToProps)(StickyLayout);
