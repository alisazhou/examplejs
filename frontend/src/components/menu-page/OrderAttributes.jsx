import React from 'react';
import R from 'ramda';
import { formValueSelector, isValid, touch } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SearchDate from '../search-bar/SearchDate.jsx';
import SearchSize from '../search-bar/SearchSize.jsx';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


class OrderAttributes extends React.Component {
  render () {
    const onNextClick = () => {
      const { dateTime, menuId, partySize } = this.props;
      const updates = { dateTime, partySize, menuId };
      this.props.touchAll();
      this.props.updateOrder(updates);
      if (this.props.formsValid) {
        browserHistory.push('/reservation/');
      }
    };

    return (
      <div>
        <SearchDate displayError={true} />
        <SearchSize displayError={true} />
        <button onClick={onNextClick}>Order</button>
      </div>
    );
  }
}

OrderAttributes.propTypes = {
  dateTime: React.PropTypes.string,
  formsValid: React.PropTypes.bool.isRequired,
  menuId: React.PropTypes.string,
  partySize: React.PropTypes.string,
  touchAll: React.PropTypes.func.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const dateTime = formValueSelector('searchDate')(state, 'searchDate');
  const partySize = formValueSelector('searchSize')(state, 'searchSize');
  const formsValid = isValid('searchDate')(state) && isValid('searchSize')(state);
  return {dateTime, formsValid, partySize};
};
const mapDispatchToProps = dispatch => ({
  touchAll: () => {
    // first arg is form name, second arg is field name
    dispatch(touch('searchDate', 'searchDate'));
    dispatch(touch('searchSize', 'searchSize'));
  },
  updateOrder: R.compose(dispatch, updateOrderActionCreator),
});

const ReduxConnectedAttributes = connect(
  mapStateToProps, mapDispatchToProps
)(OrderAttributes);

export default ReduxConnectedAttributes;
export { OrderAttributes };
