import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import setupRedux from '../redux-wrapper/ReduxWrapper.jsx';
import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

class IntroPage extends React.Component {
  clickThroughTo (targetPage) {
    return e => {
      e.preventDefault();  // don't append # at end of url
      this.props.changePage(targetPage);
    };
  }
  render () {
    return <div>
      <p>Welcome</p>
      <button onClick={this.clickThroughTo('book')}>Book Now</button>
    </div>;
  }
}

IntroPage.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => {return {};};
const mapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

export default setupRedux(connect(mapStateToProps, mapDispatchToProps)(IntroPage));
export { IntroPage };
