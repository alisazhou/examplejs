import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';

import NextButton from '../next-button/NextButton.jsx';
import { CONFIRM } from '../sticky-layout/pageMapping.js';
import Seller from '../seller/Seller.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import ReservationSummary from '../reservation-summary/ReservationSummary.jsx';

class AvailabilityPage extends React.Component {
  render () {
    return (
      <div>
        <ProgressBar/>
        <ReservationSummary />
        <p>Choose your peeps:</p>
        {R.map(
          seller => <Seller key={seller.id} {...seller} />,
          this.props.sellers
        )}
        <NextButton toPage={CONFIRM}/>
      </div>
    );
  }
}

AvailabilityPage.propTypes = {
  sellers: React.PropTypes.array.isRequired,
};

const mapStateToProps = state => ({ sellers: state.sellers });

export default connect(mapStateToProps, null)(AvailabilityPage);
export { AvailabilityPage };

