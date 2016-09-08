import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import R from 'ramda';

import { fields } from './OrderAttributes.jsx';
import { updateOrderActionCreator } from '../../actions/orderActions.js';
import { validateAndFindUntouched } from '../formHelpers.js';
import { validateOrderActionCreator } from '../../actions/orderActions.js';


class MenuPageNextButton extends React.Component {
  render () {
    const onMenuNextClick = e => {
      this.props.updateOrderMenu(this.props.menuId);
      const untouched = validateAndFindUntouched(e, this.props.fieldsStatus);
      R.map(fieldName => this.props.markInvalid(fieldName), untouched);
    };
    return (
      <Link to='/reservation'>
        <button onClick={e => onMenuNextClick(e)}>
          Next
        </button>
      </Link>
    );
  }
}

MenuPageNextButton.propTypes = {
  fieldsStatus: React.PropTypes.shape({
    dateTimeValidated: React.PropTypes.bool,
    partySizeValidated: React.PropTypes.bool,
  }).isRequired,
  markInvalid: React.PropTypes.func.isRequired,
  menuId: React.PropTypes.string.isRequired,
  updateOrderMenu: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fieldsStatus: R.pickAll(
    R.map(field => `${field}Validated`, fields),
    state.order
  ),
});

const mapDispatchToProps = dispatch => ({
  markInvalid: fieldName => dispatch(validateOrderActionCreator(fieldName, false)),
  updateOrderMenu: menuId => dispatch(updateOrderActionCreator({menuId})),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MenuPageNextButton);
export { MenuPageNextButton };
