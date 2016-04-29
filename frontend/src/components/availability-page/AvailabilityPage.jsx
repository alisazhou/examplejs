import React from 'react';
import { connect } from 'react-redux';
import { BaseChangePageComponent, baseMapDispatchToProps } from '../sticky-layout/BaseChangePageComponent.jsx';

class AvailabilityPage extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <p>Choose your peeps:</p>
      </div>
    );
  }
}

AvailabilityPage.propTypes = R.merge(
  BaseChangePageComponent.propTypes,
  {people: React.PropTypes.array.isRequired}
);

const mapStateToProps = state => {
  return { people: state.people };

};
export default connect(mapStateToProps, baseMapDispatchToProps)(AvailabilityPage);
export { AvailabilityPage };

