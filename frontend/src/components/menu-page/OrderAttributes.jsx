import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import partySizeOptions from './orderAttributesConstants.js';
import { updateAndValidate } from '../../actions/orderActions.js';


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
      <form className='menu_page--attributes'>
        <label>How many guests?
          <select
            {...partySize}
            value={partySize.value||''}
            onBlur={() => this.props.updateAndValidate(partySize)}
          >
          {partySizeOptions.map(size =>
            <option key={size.value} value={size.label}>{size.label}</option>
          )}
          </select>
        </label>
        <label>When's the party?
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
  fields: React.PropTypes.shape({
    partySize: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    dateTime: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateAndValidate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateAndValidate: field => dispatch(updateAndValidate(field)),
});

const ConnectedAttributes = connect(null, mapDispatchToProps)(OrderAttributes);

export default reduxForm({
  form: 'orderAttributes',
  fields,
  destroyOnUnmount: false,
  initialValues: {dateTime: '', partySize: ''},
  validate,
})(ConnectedAttributes);

export { ConnectedAttributes, fields, OrderAttributes };
