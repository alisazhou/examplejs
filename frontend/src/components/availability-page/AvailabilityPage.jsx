import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';

import NextButton from '../next-button/NextButton.jsx';
import { CHOICE } from '../sticky-layout/pageMapping.js';
import Seller from '../seller/Seller.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';

class AvailabilityPage extends React.Component {
  render () {
    return (
      <div>
        <ProgressBar/>
        <p>Choose your peeps:</p>
        {R.map(
          seller => <Seller {...seller}/>,
          this.props.sellers
        )}
        <NextButton toPage={CHOICE}/>
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

