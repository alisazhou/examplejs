import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

class ReservationPage extends React.Component {
  clickThroughTo (targetPage) {
    return e => {
      e.preventDefault();  // don't append # at end of url
      this.props.changePage(targetPage);
    };
  }
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        Address: <input name='address'/>
        <input type='button' value='next' onClick={ this.clickThroughTo('choice') }/>
      </div>
    );
  }
}
ReservationPage.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};


const mapStateToProps = () => {return {};};
const mapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);
export { ReservationPage };
