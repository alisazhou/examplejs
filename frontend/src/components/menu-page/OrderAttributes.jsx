import React from 'react';
import R from 'ramda';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import partySizeOptions from './orderAttributesConstants.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


const fields = [ 'partySize', 'dateTime' ];

const validate = values => {
  let errors = {};
  if (!values.partySize || values.partySize === 'Number of guests') {
    errors.partySize = 'Please select the number of guests.';
  }
  if (!values.dateTime) {
    errors.dateTime = 'Please specify a time.';
  }
  return errors;
};

class OrderAttributes extends React.Component {
  render () {
    const { fields: { partySize, dateTime }, handleSubmit } = this.props;

    const onMenuNextClick = data => {
      const updates = {...data, menuId: this.props.menuId};
      this.props.updateOrder(updates);
      browserHistory.push('/reservation/');
    };

    return (
      <form
        className='menu_page--attributes'
        onSubmit={handleSubmit(onMenuNextClick)}
      >
        <label>How many guests?
          <select
            { ...partySize }
            value={ partySize.value || '' }
          >
            { partySizeOptions.map(
                size => <option key={size.value} value={size.label}>{size.label}</option>
              )
            }
          </select>
        </label>
        { partySize.touched && partySize.error && <div>{partySize.error}</div> }

        <label>When's the party?
          <input type='date' {...dateTime} />
        </label>
        { dateTime.touched && dateTime.error && <div>{dateTime.error}</div> }

        <button type='submit'>Next</button>
      </form>
    );
  }
}

OrderAttributes.propTypes = {
  fields: React.PropTypes.shape({
    partySize: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    dateTime: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  menuId: React.PropTypes.string.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateOrder: R.compose(dispatch, updateOrderActionCreator),
});

const ConnectedAttributes = connect(
  null, mapDispatchToProps
)(OrderAttributes);

export default reduxForm({
  form: 'orderAttributes',
  fields,
  destroyOnUnmount: false,
  initialValues: {dateTime: '', partySize: ''},
  validate,
})(ConnectedAttributes);

export { ConnectedAttributes, fields, OrderAttributes };
