import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { BaseChangePageComponent, baseMapDispatchToProps } from '../sticky-layout/BaseChangePageComponent.jsx';
import Seller from '../seller/Seller.jsx';

class AvailabilityPage extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <p>Choose your peeps:</p>
        {R.map(
          seller => <Seller {...seller}/>,
          this.props.sellers
        )}
      </div>
    );
  }
}

AvailabilityPage.propTypes = R.merge(
  BaseChangePageComponent.propTypes,
  {sellers: React.PropTypes.array.isRequired}
);

const mapStateToProps = state => {
  return { sellers: state.sellers };

};
export default connect(mapStateToProps, baseMapDispatchToProps)(AvailabilityPage);
export { AvailabilityPage };

