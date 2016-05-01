import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

class Seller extends React.Component {
  render () {
    return (
      <div onClick={ this.props.selectSeller(this.props.id) }>
        {this.props.name}
      </div>
    );
  }
}

Seller.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectSeller: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

export default connect(null, mapDispatchToProps)(Seller);
export { Seller };
