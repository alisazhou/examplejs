import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { selectSellerActionCreator } from './currentSellerActions.js';

class Seller extends React.Component {
  render () {
    return (
      <div
        className={ this.props.currentSellerId === this.props.id ? 'seller--selected' : '' }
        onClick={ () => this.props.selectSeller(this.props.id) }>
        {this.props.name}
      </div>
    );
  }
}

Seller.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectSeller: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
  currentSellerId: (props, propName, componentName) => {
    if (props[propName] === null) {
      return;
    }
    return React.PropTypes.number.isRequired(props, propName, componentName);
  },
};

const mapStateToProps = state => (
  { currentSellerId: state.currentSeller }
);
const mapDispatchToProps = dispatch => ({
  selectSeller: R.pipe(selectSellerActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seller);
export { Seller };
