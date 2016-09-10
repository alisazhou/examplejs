import React from 'react';
import R from 'ramda';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import partySizeOptions from './orderAttributesConstants.js';
import { updateAndValidate } from '../../actions/orderActions.js';
import ValidationError from '../validation-error/ValidationError.jsx';


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
    const { fields: { partySize, dateTime }} = this.props;
    return (
      <form className='menu_page--attributes' onSubmit={e => e.preventDefault()}>
        <label>How many guests?
          <ValidationError
            invalid={ this.props.partySizeInvalid }
            error={ partySize.error }
          />
          <select
            { ...partySize }
            value={ partySize.value || '' }
            onBlur={ () => this.props.updateAndValidate(partySize) }>
            { partySizeOptions.map(
                size => <option key={size.value} value={size.label}>{size.label}</option>
              )
            }
          </select>
        </label>
        <label>When's the party?
          <ValidationError
            invalid={this.props.dateTimeInvalid}
            error={dateTime.error} />
          <input
            placeholder='Fri 8pm'
            {...dateTime}
            onBlur={() => this.props.updateAndValidate(dateTime)}
          />
        </label>
      </form>
    );
  }
}

OrderAttributes.propTypes = {
  dateTimeInvalid: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.shape({
    partySize: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    dateTime: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  partySizeInvalid: React.PropTypes.bool.isRequired,
  updateAndValidate: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  partySizeInvalid: state.order.partySizeValidated === false,
  dateTimeInvalid: state.order.dateTimeValidated === false,
});
const mapDispatchToProps = dispatch => ({
  updateAndValidate: R.compose(dispatch, updateAndValidate),
});

const ConnectedAttributes = connect(
  mapStateToProps, mapDispatchToProps
)(OrderAttributes);

export default reduxForm({
  form: 'orderAttributes',
  fields,
  destroyOnUnmount: false,
  initialValues: {dateTime: '', partySize: ''},
  validate,
})(ConnectedAttributes);

export { ConnectedAttributes, fields, OrderAttributes };
