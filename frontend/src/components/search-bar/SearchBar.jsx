import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import R from 'ramda';

import { renderInput, renderSelect } from '../formHelpers.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';
import SearchDate from '../order-attributes/SearchDate.jsx';
import SearchSize from '../order-attributes/SearchSize.jsx';


class SearchBar extends React.Component {
  render() {
    return (
      <div className='searchbar__background'>
        <div className='searchbar-form__search-field-div'>
          <SearchDate
            className='searchbar-form__search-field'
            displayError={false}
          />
        </div>
        <div className='searchbar-form__search-field-div'>
          <SearchSize
            className='searchbar-form__search-field'
            displayError={false}
          />
        </div>
        <form className='searchbar-form'>
          <div className='searchbar-form__search-field-div'>
            <Field component={renderInput}
              className='searchbar-form__search-field'
              name='searchText'
              placeholder='I feel like having...'
              type='search'
            />
          </div>
          <div className='searchbar-form__search-field-div'>
            <Field component={renderSelect}
              className='searchbar-form__search-field'
              name='searchCuisine'
              options={this.props.cuisines}
            />
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  cuisines: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateOrderDate: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cuisines: state.cuisines,
});

const mapDispatchToProps = dispatch => ({
  updateOrderDate: R.compose(dispatch, updateOrderActionCreator),
});

const StoreConnectedBar = connect(
  mapStateToProps, mapDispatchToProps
)(SearchBar);

export default reduxForm({
  form: 'searchBar',
  destroyOnUnmount: false,
})(StoreConnectedBar);

export { StoreConnectedBar, SearchBar };
