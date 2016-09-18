import React from 'react';
import R from 'ramda';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import partySizeOptions from './orderAttributesConstants.js';
import { renderInput, renderSelect } from '../formHelpers.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


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
    const { handleSubmit } = this.props;
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
        <Field component={renderSelect}
          label='How many guests?'
          name='partySize'
          options={partySizeOptions}
        />
        <Field component={renderInput}
          label="When's the party?"
          name='dateTime'
          type='date'
        />
        <button type='submit'>Next</button>
      </form>
    );
  }
}

OrderAttributes.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  initialValues: React.PropTypes.shape({
    dateTime: React.PropTypes.string,
  }),
  menuId: React.PropTypes.string.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const selector = formValueSelector('searchBar');
  const dateTime = selector(state, 'searchDate');
  return { initialValues: { dateTime }};
};
const mapDispatchToProps = dispatch => ({
  updateOrder: R.compose(dispatch, updateOrderActionCreator),
});

const FormConnectedAttributes = reduxForm({
  form: 'orderAttributes',
  destroyOnUnmount: false,
  validate,
})(OrderAttributes);

const ReduxConnectedAttributes = connect(
  mapStateToProps, mapDispatchToProps
)(FormConnectedAttributes);

export default ReduxConnectedAttributes;
export { FormConnectedAttributes, OrderAttributes };
