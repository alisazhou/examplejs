import React from 'react';
import { reduxForm } from 'redux-form';

import partySizeOptions from './orderAttributesConstants.js';


const fields = [ 'partySize', 'dateTime' ];

class OrderAttributes extends React.Component {
  render () {
    const { fields: { partySize, dateTime }} = this.props;
    return (
      <form className='menu_page--attributes'>
        <label>How many guests?
          <select
            {...partySize}
            value={partySize.value||''}>
          {partySizeOptions.map(size =>
            <option key={size.value} value={size.value}> {size.label} </option>
          )}
          </select>
        </label>
        <label>When's the party?
          <input
            placeholder='Fri 8pm'
            {...dateTime}/>
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
};

export default reduxForm({
  form: 'orderAttributes',
  fields,
  destroyOnUnmount: false,
})(OrderAttributes);

export { fields, OrderAttributes };
